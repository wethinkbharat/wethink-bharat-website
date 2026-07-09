import type { NextRequest } from 'next/server'
import { createClient } from '@sanity/client'
import { schoolEnquirySchema } from '@/lib/schemas'

// Simple in-memory rate limiting (per IP, 5 submissions per 15 min)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 15 * 60 * 1000
  const limit = 5
  const record = rateLimitMap.get(ip)
  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window })
    return true
  }
  if (record.count >= limit) return false
  record.count++
  return true
}

function getSanityClient() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error('Missing SANITY_API_WRITE_TOKEN')
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  })
}

async function sendEmail(payload: Record<string, unknown>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.RESEND_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.warn('[WeThink] Resend not configured — skipping email notification')
    return
  }
  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)
  const p = payload as {
    schoolName: string; contactPerson: string; designation: string
    email: string; contactNumber: string; city: string; state: string
    board: string; grades: string[]; studentRange: string; timeline?: string
    programs?: string[]; message: string
  }
  await resend.emails.send({
    from,
    to: to.split(',').map((s) => s.trim()),
    replyTo: p.email,
    subject: `School Enquiry: ${p.schoolName}`,
    text: [
      `School: ${p.schoolName}`,
      `Contact: ${p.contactPerson} (${p.designation})`,
      `Email: ${p.email}`,
      `Phone: ${p.contactNumber}`,
      `Location: ${p.city}, ${p.state}`,
      `Board: ${p.board}`,
      `Grades: ${p.grades?.join(', ')}`,
      `Student Range: ${p.studentRange}`,
      `Timeline: ${p.timeline ?? 'Not specified'}`,
      `Programs: ${p.programs?.join(', ') ?? 'Not specified'}`,
      ``,
      `Message:`,
      p.message,
    ].join('\n'),
  })
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Server-side validation
  const result = schoolEnquirySchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: 'Validation failed', issues: result.error.issues }, { status: 422 })
  }

  const data = result.data

  // Honeypot check — silently reject bots
  if (data._hp) {
    return Response.json({ ok: true })
  }

  // Save to Sanity
  try {
    const sanity = getSanityClient()
    await sanity.create({
      _type: 'enquiry',
      type: 'school' as const,
      submittedAt: new Date().toISOString(),
      schoolName: data.schoolName.slice(0, 200),
      contactPerson: data.contactPerson.slice(0, 200),
      designation: data.designation,
      email: data.email,
      contactNumber: data.contactNumber.slice(0, 20),
      city: data.city.slice(0, 100),
      state: data.state.slice(0, 100),
      board: data.board,
      grades: data.grades,
      studentRange: data.studentRange,
      timeline: data.timeline ?? null,
      programs: data.programs ?? [],
      message: data.message.slice(0, 2000),
    })
  } catch (err) {
    console.error('[WeThink] Failed to save enquiry to Sanity:', err)
    return Response.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }

  // Send email notification
  await sendEmail({ ...data })

  return Response.json({ ok: true })
}
