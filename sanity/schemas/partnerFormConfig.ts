import { defineType, defineField, defineArrayMember } from 'sanity'

export const partnerFormConfig = defineType({
  name: 'partnerFormConfig',
  title: 'Partner Form Config',
  type: 'document',
  // Singleton — document id 'partnerFormConfig'.
  fields: [
    // ── Field Labels ──────────────────────────────────────────────────────
    defineField({ name: 'labelOrgName', title: 'Label: Organisation Name', type: 'string', initialValue: 'Organisation Name' }),
    defineField({ name: 'labelContactPerson', title: 'Label: Contact Person', type: 'string', initialValue: 'Contact Person' }),
    defineField({ name: 'labelDesignation', title: 'Label: Designation', type: 'string', initialValue: 'Designation' }),
    defineField({ name: 'labelEmail', title: 'Label: Email', type: 'string', initialValue: 'Email Address' }),
    defineField({ name: 'labelContactNumber', title: 'Label: Contact Number', type: 'string', initialValue: 'Contact Number' }),
    defineField({ name: 'labelCity', title: 'Label: City', type: 'string', initialValue: 'City' }),
    defineField({ name: 'labelState', title: 'Label: State', type: 'string', initialValue: 'State' }),
    defineField({ name: 'labelOrgType', title: 'Label: Organisation Type', type: 'string', initialValue: 'Organisation Type' }),
    defineField({ name: 'labelInterestedIn', title: 'Label: Interested In', type: 'string', initialValue: 'Interested In' }),
    defineField({ name: 'labelMessage', title: 'Label: Message', type: 'string', initialValue: 'Additional Message' }),

    // ── Dropdown Options ──────────────────────────────────────────────────
    defineField({
      name: 'designationOptions',
      title: 'Designation Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'Principal',
        'Vice Principal',
        'School Administrator',
        'Teacher',
        'Founder',
        'Director',
        'CSR Manager',
        'HR Manager',
        'Professor',
        'Student Representative',
        'Other',
      ],
    }),
    defineField({
      name: 'orgTypeOptions',
      title: 'Organisation Type Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'School',
        'University / College',
        'Corporate',
        'NGO',
        'Startup',
        'Government Body',
        'Educational Institution',
        'Media',
        'Individual Mentor',
        'Other',
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Partner Form Config' }
    },
  },
})
