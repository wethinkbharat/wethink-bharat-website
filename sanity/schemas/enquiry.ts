import { defineType, defineField, defineArrayMember } from 'sanity'

export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry (Lead)',
  type: 'document',
  // Created programmatically via the API from form submissions.
  // The studio is read-only for this type — editors should not create manually.
  fields: [
    defineField({
      name: 'type',
      title: 'Enquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'School', value: 'school' },
          { title: 'Partner', value: 'partner' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),

    // ── Common fields ─────────────────────────────────────────────────────
    defineField({ name: 'contactPerson', title: 'Contact Person', type: 'string' }),
    defineField({ name: 'designation', title: 'Designation', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'contactNumber', title: 'Contact Number', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'state', title: 'State', type: 'string' }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
    }),

    // ── School-specific fields ────────────────────────────────────────────
    defineField({ name: 'schoolName', title: 'School Name', type: 'string' }),
    defineField({ name: 'board', title: 'Board', type: 'string' }),
    defineField({
      name: 'grades',
      title: 'Grades',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'studentRange', title: 'Student Range', type: 'string' }),
    defineField({ name: 'timeline', title: 'Implementation Timeline', type: 'string' }),
    defineField({
      name: 'programs',
      title: 'Interested Programs',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── Partner-specific fields ───────────────────────────────────────────
    defineField({ name: 'orgName', title: 'Organisation Name', type: 'string' }),
    defineField({ name: 'orgType', title: 'Organisation Type', type: 'string' }),
    defineField({
      name: 'interestedIn',
      title: 'Interested In',
      type: 'text',
      rows: 3,
    }),
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      type: 'type',
      contactPerson: 'contactPerson',
      schoolName: 'schoolName',
      orgName: 'orgName',
      submittedAt: 'submittedAt',
    },
    prepare({ type, contactPerson, schoolName, orgName, submittedAt }) {
      const org = schoolName || orgName || 'Unknown Org'
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('en-IN') : ''
      return {
        title: `[${type?.toUpperCase() ?? '?'}] ${org}`,
        subtitle: `${contactPerson ?? ''} · ${date}`,
      }
    },
  },
})
