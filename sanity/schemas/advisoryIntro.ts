import { defineType, defineField } from 'sanity'

export const advisoryIntro = defineType({
  name: 'advisoryIntro',
  title: 'Advisory Board — Intro',
  type: 'document',
  // Singleton — document id 'advisoryIntro'.
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Background image shown behind the Advisory Board page header.',
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
      return { title: 'Advisory Intro' }
    },
  },
})
