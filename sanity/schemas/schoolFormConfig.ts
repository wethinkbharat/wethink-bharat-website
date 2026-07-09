import { defineType, defineField, defineArrayMember } from 'sanity'

export const schoolFormConfig = defineType({
  name: 'schoolFormConfig',
  title: 'School Form Config',
  type: 'document',
  // Singleton — document id 'schoolFormConfig'.
  fields: [
    // ── Field Labels ──────────────────────────────────────────────────────
    defineField({ name: 'labelSchoolName', title: 'Label: School Name', type: 'string', initialValue: 'School Name' }),
    defineField({ name: 'labelContactPerson', title: 'Label: Contact Person', type: 'string', initialValue: 'Contact Person' }),
    defineField({ name: 'labelDesignation', title: 'Label: Designation', type: 'string', initialValue: 'Designation' }),
    defineField({ name: 'labelEmail', title: 'Label: Email', type: 'string', initialValue: 'Email Address' }),
    defineField({ name: 'labelContactNumber', title: 'Label: Contact Number', type: 'string', initialValue: 'Contact Number' }),
    defineField({ name: 'labelCity', title: 'Label: City', type: 'string', initialValue: 'City' }),
    defineField({ name: 'labelState', title: 'Label: State', type: 'string', initialValue: 'State' }),
    defineField({ name: 'labelBoard', title: 'Label: Board', type: 'string', initialValue: 'Board' }),
    defineField({ name: 'labelGrades', title: 'Label: Grades', type: 'string', initialValue: 'Grades Offered' }),
    defineField({ name: 'labelStudentRange', title: 'Label: Student Range', type: 'string', initialValue: 'Number of Students' }),
    defineField({ name: 'labelTimeline', title: 'Label: Timeline', type: 'string', initialValue: 'Implementation Timeline' }),
    defineField({ name: 'labelPrograms', title: 'Label: Programs', type: 'string', initialValue: 'Interested Programs' }),
    defineField({ name: 'labelMessage', title: 'Label: Message', type: 'string', initialValue: 'Additional Message' }),

    // ── Dropdown / Multi-select Options ───────────────────────────────────
    defineField({
      name: 'designationOptions',
      title: 'Designation Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'Principal',
        'Vice Principal',
        'School Administrator',
        'Career Counsellor',
        'Other',
      ],
    }),
    defineField({
      name: 'boardOptions',
      title: 'Board Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['CBSE', 'ICSE', 'IB', 'Cambridge', 'State Board', 'Other'],
    }),
    defineField({
      name: 'gradesOptions',
      title: 'Grades Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    }),
    defineField({
      name: 'studentRangeOptions',
      title: 'Student Range Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['Under 300', '300–800', '800–1,500', '1,500–3,000', '3,000+'],
    }),
    defineField({
      name: 'timelineOptions',
      title: 'Timeline Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'Within 1 Month',
        '1–3 Months',
        'This Academic Session',
        'Next Academic Session',
        'Flexible',
      ],
    }),
    defineField({
      name: 'programOptions',
      title: 'Program Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'Entrepreneurship',
        'Media & Communication',
        'Design & Innovation',
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'School Form Config' }
    },
  },
})
