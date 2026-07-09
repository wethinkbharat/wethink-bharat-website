import { defineType, defineField } from 'sanity'

export const journeyIntro = defineType({
  name: 'journeyIntro',
  title: 'Journey — Intro',
  type: 'document',
  // Singleton — document id 'journeyIntro'.
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Background image shown behind the Journey page header.',
      options: { hotspot: true },
    }),
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
      return { title: 'Journey Intro' }
    },
  },
})
