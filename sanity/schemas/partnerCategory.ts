import { defineType, defineField } from 'sanity'

export const partnerCategory = defineType({
  name: 'partnerCategory',
  title: 'Partner Category',
  type: 'document',
  // Four categories: Knowledge Partners, Industry Partners, Implementation Partners, Community Partners.
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
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
    select: { title: 'name' },
  },
})
