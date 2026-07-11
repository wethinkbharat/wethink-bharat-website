import { defineType, defineField } from 'sanity'

export const pathwaysIntro = defineType({
  name: 'pathwaysIntro',
  title: 'Pathways — Intro',
  type: 'document',
  // Singleton — document id 'pathwaysIntro'.
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
      description: 'Use || to mark where gold colour starts. E.g. "Capability across the whole ||ecosystem"',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Pathways Intro' }
    },
  },
})
