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
  ],

  preview: {
    prepare() {
      return { title: 'Pathways Intro' }
    },
  },
})
