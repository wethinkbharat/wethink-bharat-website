import { defineType, defineField, defineArrayMember } from 'sanity'

export const gapSection = defineType({
  name: 'gapSection',
  title: 'The Gap Section',
  type: 'document',
  // Singleton — document id 'gapSection'.
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Use || to mark where gold colour starts. E.g. "Educated unemployment begins with ||uninformed choices."',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Em', value: 'em' },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'Exactly 3 statistics displayed as counter chips.',
      validation: (Rule) => Rule.length(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "47", "14–18", "90%", any text' }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'e.g. "M+" or "%"',
            }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'The Gap Section' }
    },
  },
})
