import { defineType, defineField } from 'sanity'

export const pathway = defineType({
  name: 'pathway',
  title: 'Pathway',
  type: 'document',
  // Three pathway cards (School → Student → Industry).
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'audienceLabel',
      title: 'Audience Label',
      type: 'string',
      description: 'Short label identifying the audience, e.g. "For Schools"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      description: 'Photo shown in the 300px-tall card image area (e.g. students, educators, school campus).',
      options: { hotspot: true },
    }),
  ],

  orderings: [
    {
      title: 'Order Rank',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],

  preview: {
    select: { title: 'title', subtitle: 'audienceLabel' },
  },
})
