import { z } from 'zod'

export const schoolEnquirySchema = z.object({
  schoolName: z.string().min(2, 'School name is required').max(200),
  contactPerson: z.string().min(2, 'Contact person name is required').max(200),
  designation: z.string().min(1, 'Please select your designation'),
  email: z.string().email('Please enter a valid email address'),
  contactNumber: z.string().min(10, 'Please enter a valid contact number').max(20),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  board: z.string().min(1, 'Please select the school board'),
  grades: z.array(z.string()).min(1, 'Please select at least one grade'),
  studentRange: z.string().min(1, 'Please select approximate student count'),
  timeline: z.string().optional(),
  programs: z.array(z.string()).optional().default([]),
  message: z.string().min(10, 'Please provide a brief message').max(2000),
  // Honeypot — must be empty
  _hp: z.string().max(0, 'Bot detected').optional(),
})

export type SchoolEnquiryInput = z.infer<typeof schoolEnquirySchema>

export const partnerEnquirySchema = z.object({
  name: z.string().min(2, 'Name is required').max(200),
  orgName: z.string().min(2, 'Organisation name is required').max(200),
  designation: z.string().min(1, 'Please select your designation'),
  email: z.string().email('Please enter a valid email address'),
  orgType: z.string().min(1, 'Please select organisation type'),
  interestedIn: z.string().max(2000).optional(),
  // Honeypot — must be empty
  _hp: z.string().max(0, 'Bot detected').optional(),
})

export type PartnerEnquiryInput = z.infer<typeof partnerEnquirySchema>
