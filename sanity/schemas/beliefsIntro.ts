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
      description: 'Use || to mark where gold colour starts.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Use || to mark where gold colour starts. E.g. "Six convictions that ||drive everything we build"',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'Use || to mark where gold colour starts.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Beliefs Intro' }
    },
  },
})
