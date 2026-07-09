import { defineType, defineField } from 'sanity'

export const currentPartner = defineType({
  name: 'currentPartner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organisation Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Short descriptor, e.g. "EdTech" or "Corporate".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'partnerCategory' }],
      description: 'Which partner category does this organisation belong to?',
    }),
    defineField({
      name: 'showInHomeMarquee',
      title: 'Show in Home page marquee',
      type: 'boolean',
      description: 'Tick to include this logo in the scrolling marquee on the Home page.',
      initialValue: false,
    }),
    defineField({
      name: 'showInEcosystemGrid',
      title: 'Show in Ecosystem partner grid',
      type: 'boolean',
      description: 'Tick to include this partner in the cards grid on the Ecosystem page.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'logo',
    },
  },
})
