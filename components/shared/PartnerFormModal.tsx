'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { partnerEnquirySchema, type PartnerEnquiryInput } from '@/lib/schemas'
import type { PartnerFormConfig } from '@/sanity/types'

interface Props {
  onClose: () => void
  onSuccess: () => void
  formConfig: PartnerFormConfig | null
}

const DEFAULT_DESIGNATIONS = [
  'Principal', 'Vice Principal', 'School Administrator', 'Teacher',
  'Founder', 'Director', 'CSR Manager', 'HR Manager',
  'Professor', 'Student Representative', 'Other',
]
const DEFAULT_ORG_TYPES = [
  'School', 'University / College', 'Corporate', 'NGO', 'Startup',
  'Government Body', 'Educational Institution', 'Media', 'Individual Mentor', 'Other',
]

export function PartnerFormModal({ onClose, onSuccess, formConfig }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerEnquiryInput>({
    resolver: zodResolver(partnerEnquirySchema),
  })

  const designations = formConfig?.designationOptions ?? DEFAULT_DESIGNATIONS
  const orgTypes = formConfig?.orgTypeOptions ?? DEFAULT_ORG_TYPES

  const onSubmit = async (data: PartnerEnquiryInput) => {
    try {
      const res = await fetch('/api/enquiry/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed')
      onSuccess()
    } catch {
      onSuccess()
    }
  }

  const fieldStyle = { display: 'flex', flexDirection: 'column' as const, gap: '6px' }
  const labelStyle = { fontSize: '13px', fontWeight: 600 as const, color: '#DEC078', letterSpacing: '0.05em' }
  const errorStyle = { fontSize: '12px', color: '#f87171' }

  return (
    <div
      className="modal-backdrop"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Partner enquiry form"
    >
      <div style={{
        background: '#340F05',
        border: '1px solid rgba(222,192,120,0.2)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#F5EEE2', marginBottom: '6px', marginTop: 0 }}>
              Become a WeThink Bharat partner
            </h2>
            <p style={{ fontSize: '14px', color: '#E0CEBD', margin: 0 }}>
              Industry, experience, learning, or knowledge — tell us how you&apos;d like to partner.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(224,206,189,0.5)', fontSize: '24px', padding: '4px', lineHeight: 1 }}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        {/* Honeypot (hidden) */}
        <input {...register('_hp')} type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Full Name */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelContactPerson ?? 'Full Name'} *</label>
              <input {...register('name')} className="wtb-input" placeholder="Your name" />
              {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
            </div>

            {/* Organisation */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelOrgName ?? 'Organisation'} *</label>
              <input {...register('orgName')} className="wtb-input" placeholder="Organisation name" />
              {errors.orgName && <span style={errorStyle}>{errors.orgName.message}</span>}
            </div>

            {/* Designation */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelDesignation ?? 'Designation'} *</label>
              <select {...register('designation')} className="wtb-input wtb-select">
                <option value="">Select designation</option>
                {designations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.designation && <span style={errorStyle}>{errors.designation.message}</span>}
            </div>

            {/* Email */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelEmail ?? 'Email'} *</label>
              <input {...register('email')} type="email" className="wtb-input" placeholder="your@email.com" />
              {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
            </div>

            {/* Organisation Type */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelOrgType ?? 'Organisation Type'} *</label>
              <select {...register('orgType')} className="wtb-input wtb-select">
                <option value="">Select type</option>
                {orgTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.orgType && <span style={errorStyle}>{errors.orgType.message}</span>}
            </div>

            {/* Interested In */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelInterestedIn ?? 'How would you like to partner?'}</label>
              <textarea
                {...register('interestedIn')}
                className="wtb-input"
                rows={4}
                placeholder="Tell us about your interest — briefs, mentorship, sponsorship, etc."
              />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
            <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Submitting...' : 'Submit ↗'}
            </button>
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
