'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { SchoolEnquiryInput } from '@/lib/schemas'

const INSTITUTION_TYPES = ['School', 'Higher Ed'] as const
const FORMATS = ['Online', 'On campus'] as const

// Fields shown on the PD form. Mapped onto the school enquiry payload in onSubmit.
const trainingFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(200),
  role: z.string().trim().min(1, 'Please enter your role').max(200),
  institution: z.string().trim().min(2, 'Please enter your institution').max(200),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20),
  institutionType: z.enum(INSTITUTION_TYPES, { errorMap: () => ({ message: 'Please select institution type' }) }),
  format: z.enum(FORMATS, { errorMap: () => ({ message: 'Please select a preferred format' }) }),
  message: z.string().trim().max(1500, 'Please keep your message under 1500 characters').optional(),
  // Honeypot — must be empty
  _hp: z.string().max(0).optional(),
})

type TrainingFormInput = z.infer<typeof trainingFormSchema>

// The school enquiry schema requires these; the PD form doesn't collect them.
const NOT_SPECIFIED = 'Not specified'

function toSchoolEnquiry(data: TrainingFormInput): SchoolEnquiryInput {
  const message = [
    'Professional Development enquiry (/training)',
    `Institution type: ${data.institutionType}`,
    `Preferred format: ${data.format}`,
    '',
    data.message || 'No additional message.',
  ].join('\n')

  return {
    schoolName: data.institution,
    contactPerson: data.name,
    designation: data.role,
    email: data.email,
    contactNumber: data.phone,
    city: NOT_SPECIFIED,
    state: NOT_SPECIFIED,
    board: NOT_SPECIFIED,
    grades: [NOT_SPECIFIED],
    studentRange: NOT_SPECIFIED,
    programs: ['Professional Development'],
    message,
    _hp: data._hp,
  }
}

export function TrainingEnquiryForm({ submitLabel = 'Get in touch' }: { submitLabel?: string }) {
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrainingFormInput>({ resolver: zodResolver(trainingFormSchema) })

  const onSubmit = async (data: TrainingFormInput) => {
    setSubmitError(null)
    try {
      const res = await fetch('/api/enquiry/school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSchoolEnquiry(data)),
      })
      if (res.status === 429) {
        setSubmitError('Too many requests. Please try again in a little while.')
        return
      }
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
          <i className="ti ti-check" aria-hidden="true" />
        </span>
        <h3 className="m-0 text-2xl font-extrabold text-lace">Thank you, we&apos;ll be in touch.</h3>
        <p className="m-0 text-[15px] leading-relaxed text-almond">
          Our team will reach out to plan sessions around your faculty&apos;s goals.
        </p>
      </div>
    )
  }

  const errorClass = 'text-[12.5px] text-[#f87171]'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Professional development enquiry form">
      {/* Honeypot (hidden) */}
      <input {...register('_hp')} type="text" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="wtb-field">
          <label htmlFor="pd-name">Name <span className="req">*</span></label>
          <input id="pd-name" {...register('name')} className="wtb-input" autoComplete="name" placeholder="Full name" />
          {errors.name && <span className={errorClass}>{errors.name.message}</span>}
        </div>

        <div className="wtb-field">
          <label htmlFor="pd-role">Role <span className="req">*</span></label>
          <input id="pd-role" {...register('role')} className="wtb-input" autoComplete="organization-title" placeholder="e.g. Principal, Head of Academics" />
          {errors.role && <span className={errorClass}>{errors.role.message}</span>}
        </div>

        <div className="wtb-field sm:col-span-2">
          <label htmlFor="pd-institution">Institution <span className="req">*</span></label>
          <input id="pd-institution" {...register('institution')} className="wtb-input" autoComplete="organization" placeholder="Name of your school or institution" />
          {errors.institution && <span className={errorClass}>{errors.institution.message}</span>}
        </div>

        <div className="wtb-field">
          <label htmlFor="pd-email">Email <span className="req">*</span></label>
          <input id="pd-email" {...register('email')} type="email" className="wtb-input" autoComplete="email" placeholder="you@institution.edu.in" />
          {errors.email && <span className={errorClass}>{errors.email.message}</span>}
        </div>

        <div className="wtb-field">
          <label htmlFor="pd-phone">Phone <span className="req">*</span></label>
          <input id="pd-phone" {...register('phone')} type="tel" className="wtb-input" autoComplete="tel" placeholder="+91 98765 43210" />
          {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
        </div>

        <div className="wtb-field">
          <label htmlFor="pd-type">Institution type <span className="req">*</span></label>
          <select id="pd-type" {...register('institutionType')} className="wtb-input" required defaultValue="">
            <option value="" disabled>Select type</option>
            {INSTITUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.institutionType && <span className={errorClass}>{errors.institutionType.message}</span>}
        </div>

        <div className="wtb-field">
          <label htmlFor="pd-format">Preferred format <span className="req">*</span></label>
          <select id="pd-format" {...register('format')} className="wtb-input" required defaultValue="">
            <option value="" disabled>Select format</option>
            {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          {errors.format && <span className={errorClass}>{errors.format.message}</span>}
        </div>

        <div className="wtb-field sm:col-span-2">
          <label htmlFor="pd-message">Message</label>
          <textarea
            id="pd-message"
            {...register('message')}
            className="wtb-input"
            rows={4}
            placeholder="Your faculty size, subjects, and what you'd like your educators to develop."
          />
          {errors.message && <span className={errorClass}>{errors.message.message}</span>}
        </div>
      </div>

      {submitError && <p role="alert" className={`mt-5 mb-0 ${errorClass}`}>{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold mt-7 w-full justify-center disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? 'Sending...' : submitLabel}
      </button>
    </form>
  )
}
