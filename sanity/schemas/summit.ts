import { defineType, defineField, defineArrayMember } from 'sanity'

export const summit = defineType({
  name: 'summit',
  title: 'Summit Section',
  type: 'document',
  // Singleton — document id 'summit'.
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Background image shown behind the Summit page header.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'homepageTeaser',
      title: 'Homepage Teaser',
      type: 'text',
      rows: 3,
      description: 'Short paragraph shown in the Summit teaser card on the homepage.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
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
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'string',
    }),

    defineField({
      name: 'statChips',
      title: 'Stat Chips',
      type: 'array',
      description: 'Short stat strings displayed as pill chips, e.g. "300+ schools".',
      of: [defineArrayMember({ type: 'string' })],
    }),

    defineField({
      name: 'getInvolvedCards',
      title: 'Get Involved Cards',
      type: 'array',
      description: 'Exactly 3 cards.',
      validation: (Rule) => Rule.length(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'getInvolvedCard',
          fields: [
            defineField({ name: 'audience', title: 'Audience', type: 'string', description: 'e.g. "Schools"' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
            defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'audience' },
          },
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Summit Section' }
    },
  },
})
