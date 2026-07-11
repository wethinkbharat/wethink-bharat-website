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
      description: 'Use || for gold.',
    }),
    defineField({
      name: 'subtext',
      title: 'Page Hero Subtext',
      type: 'text',
      rows: 2,
      description: 'Subtitle below advisory page hero heading. Use || for gold.',
    }),
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'Use || for gold. E.g. "The people who keep the work ||honest."',
    }),
    defineField({
      name: 'sectionSubtext',
      title: 'Section Subtext',
      type: 'text',
      rows: 3,
      description: 'Use || for gold.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Advisory Intro' }
    },
  },
})
