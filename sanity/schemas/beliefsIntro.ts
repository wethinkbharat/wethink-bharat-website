import { defineType, defineField } from 'sanity'

export const beliefsIntro = defineType({
  name: 'beliefsIntro',
  title: 'Beliefs — Intro',
  type: 'document',
  // Singleton — document id 'beliefsIntro'.
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
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Beliefs Intro' }
    },
  },
})
