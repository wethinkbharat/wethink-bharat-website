import { defineType, defineField } from 'sanity'

export const applyCta = defineType({
  name: 'applyCta',
  title: 'Apply CTA Section',
  type: 'document',
  // Singleton — document id 'applyCta'.
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Apply CTA Section' }
    },
  },
})
