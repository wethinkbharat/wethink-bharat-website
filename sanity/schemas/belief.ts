import { defineType, defineField } from 'sanity'

export const belief = defineType({
  name: 'belief',
  title: 'Belief Statement',
  type: 'document',
  // Ordered list — use orderRank for drag-to-reorder (compatible with @sanity/orderable-document-list).
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      description: 'Display number, e.g. 1, 2, 3.',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
    }),
  ],

  orderings: [
    {
      title: 'Order Rank',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
    {
      title: 'Number',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],

  preview: {
    select: { title: 'title', subtitle: 'number' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `#${subtitle}` }
    },
  },
})
