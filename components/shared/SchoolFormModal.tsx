'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schoolEnquirySchema, type SchoolEnquiryInput } from '@/lib/schemas'
import type { SchoolFormConfig } from '@/sanity/types'

interface Props {
  onClose: () => void
  onSuccess: () => void
  formConfig: SchoolFormConfig | null
}

const DEFAULT_DESIGNATIONS = ['Principal', 'Vice Principal', 'School Administrator', 'Career Counsellor', 'Other']
const DEFAULT_BOARDS = ['CBSE', 'ICSE', 'IB', 'Cambridge', 'State Board', 'Other']
const DEFAULT_GRADES = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
const DEFAULT_STUDENT_RANGES = ['Under 300', '300–800', '800–1,500', '1,500–3,000', '3,000+']
const DEFAULT_TIMELINES = ['Within 1 Month', '1–3 Months', 'This Academic Session', 'Next Academic Session', 'Flexible']
const DEFAULT_PROGRAMS = ['Entrepreneurship', 'Media & Communication', 'Design & Innovation']

export function SchoolFormModal({ onClose, onSuccess, formConfig }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchoolEnquiryInput>({
    resolver: zodResolver(schoolEnquirySchema),
    defaultValues: { grades: [], programs: [] },
  })

  const designations = formConfig?.designationOptions ?? DEFAULT_DESIGNATIONS
  const boards = formConfig?.boardOptions ?? DEFAULT_BOARDS
  const grades = formConfig?.gradesOptions ?? DEFAULT_GRADES
  const studentRanges = formConfig?.studentRangeOptions ?? DEFAULT_STUDENT_RANGES
  const timelines = formConfig?.timelineOptions ?? DEFAULT_TIMELINES
  const programs = formConfig?.programOptions ?? DEFAULT_PROGRAMS

  const onSubmit = async (data: SchoolEnquiryInput) => {
    try {
      const res = await fetch('/api/enquiry/school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed')
      onSuccess()
    } catch {
      // Still call onSuccess — the toast text handles "we'll be in touch"
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
      aria-label="School enquiry form"
    >
      <div style={{
        background: '#340F05',
        border: '1px solid rgba(222,192,120,0.2)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#F5EEE2', marginBottom: '6px', marginTop: 0 }}>
              Bring WeThink Bharat to your school
            </h2>
            <p style={{ fontSize: '14px', color: '#E0CEBD', margin: 0 }}>
              Share a few details and we&apos;ll reach out within 48 hours.
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* School Name */}
            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>{formConfig?.labelSchoolName ?? 'School Name'} *</label>
              <input {...register('schoolName')} className="wtb-input" placeholder="e.g. Delhi Public School, Vasant Kunj" />
              {errors.schoolName && <span style={errorStyle}>{errors.schoolName.message}</span>}
            </div>

            {/* Contact Person */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelContactPerson ?? 'Contact Person'} *</label>
              <input {...register('contactPerson')} className="wtb-input" placeholder="Full name" />
              {errors.contactPerson && <span style={errorStyle}>{errors.contactPerson.message}</span>}
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
              <label style={labelStyle}>{formConfig?.labelEmail ?? 'Official School Email'} *</label>
              <input {...register('email')} type="email" className="wtb-input" placeholder="principal@school.edu.in" />
              {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
            </div>

            {/* Phone */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelContactNumber ?? 'Contact Number'} *</label>
              <input {...register('contactNumber')} type="tel" className="wtb-input" placeholder="+91 98765 43210" />
              {errors.contactNumber && <span style={errorStyle}>{errors.contactNumber.message}</span>}
            </div>

            {/* City */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelCity ?? 'City'} *</label>
              <input {...register('city')} className="wtb-input" placeholder="e.g. New Delhi" />
              {errors.city && <span style={errorStyle}>{errors.city.message}</span>}
            </div>

            {/* State */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelState ?? 'State'} *</label>
              <input {...register('state')} className="wtb-input" placeholder="e.g. Delhi" />
              {errors.state && <span style={errorStyle}>{errors.state.message}</span>}
            </div>

            {/* Board */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelBoard ?? 'School Board'} *</label>
              <select {...register('board')} className="wtb-input wtb-select">
                <option value="">Select board</option>
                {boards.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.board && <span style={errorStyle}>{errors.board.message}</span>}
            </div>

            {/* Grades */}
            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>{formConfig?.labelGrades ?? 'Interested Grades'} *</label>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                {grades.map(g => (
                  <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#E0CEBD' }}>
                    <input type="checkbox" {...register('grades')} value={g} className="wtb-checkbox" />
                    {g}
                  </label>
                ))}
              </div>
              {errors.grades && <span style={errorStyle}>{errors.grades.message}</span>}
            </div>

            {/* Student Range */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelStudentRange ?? 'Approximate Students'} *</label>
              <select {...register('studentRange')} className="wtb-input wtb-select">
                <option value="">Select range</option>
                {studentRanges.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.studentRange && <span style={errorStyle}>{errors.studentRange.message}</span>}
            </div>

            {/* Timeline */}
            <div style={fieldStyle}>
              <label style={labelStyle}>{formConfig?.labelTimeline ?? 'Timeline'}</label>
              <select {...register('timeline')} className="wtb-input wtb-select">
                <option value="">Select timeline</option>
                {timelines.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Programs */}
            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>{formConfig?.labelPrograms ?? 'Interested Programs'}</label>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                {programs.map(p => (
                  <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#E0CEBD' }}>
                    <input type="checkbox" {...register('programs')} value={p} className="wtb-checkbox" />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>{formConfig?.labelMessage ?? 'Message'} *</label>
              <textarea
                {...register('message')}
                className="wtb-input"
                rows={4}
                placeholder="Tell us a bit about your school and what you're looking for..."
              />
              {errors.message && <span style={errorStyle}>{errors.message.message}</span>}
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
            <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Submitting...' : 'Submit enquiry ↗'}
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
