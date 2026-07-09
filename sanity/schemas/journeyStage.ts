import { defineType, defineField } from 'sanity'

export const journeyStage = defineType({
  name: 'journeyStage',
  title: 'Journey Stage',
  type: 'document',
  // Five stages in a student's journey.
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'number',
      title: 'Stage Number',
      type: 'number',
      description: 'e.g. 1, 2, 3, 4, 5.',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'name',
      title: 'Stage Name',
      type: 'string',
      description: 'e.g. "Orientation"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationLabel',
      title: 'Duration Label',
      type: 'string',
      description: 'e.g. "Week 1–2"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Image',
      type: 'image',
      description: 'Custom icon shown in the 54×54 tile on the journey carousel.',
      options: { hotspot: false },
    }),
  ],

  orderings: [
    {
      title: 'Order Rank',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
    {
      title: 'Stage Number',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],

  preview: {
    select: { title: 'name', subtitle: 'number', duration: 'durationLabel' },
    prepare({ title, subtitle, duration }) {
      return {
        title: `${subtitle ? `Stage ${subtitle}: ` : ''}${title ?? 'Untitled Stage'}`,
        subtitle: duration ?? '',
      }
    },
  },
})
