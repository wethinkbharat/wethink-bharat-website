import { defineType, defineField } from 'sanity'

export const ecosystemIntro = defineType({
  name: 'ecosystemIntro',
  title: 'Ecosystem — Intro',
  type: 'document',
  // Singleton — document id 'ecosystemIntro'.
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Background image shown behind the Ecosystem page header.',
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
    defineField({
      name: 'subtext',
      title: 'Sub-text',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Ecosystem Intro' }
    },
  },
})
