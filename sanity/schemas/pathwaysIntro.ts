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
