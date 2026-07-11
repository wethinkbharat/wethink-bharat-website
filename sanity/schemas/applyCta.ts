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
      description: 'Use || to mark where gold colour starts. E.g. "Your students are ready for a ||national stage."',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      description: 'Use || to mark where gold colour starts.',
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
