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
      description: 'Use || for gold.',
    }),
    defineField({
      name: 'subtext',
      title: 'Sub-text',
      type: 'text',
      rows: 3,
      description: 'Use || for gold.',
    }),
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'Use || for gold. E.g. "Not just Collaborators. ||Changemakers."',
    }),
    defineField({
      name: 'partnersHeading',
      title: 'Partners Section Heading',
      type: 'string',
      description: 'Use || for gold. E.g. "Who we ||work with"',
    }),
    defineField({
      name: 'partnersSubtext',
      title: 'Partners Section Subtext',
      type: 'text',
      rows: 2,
      description: 'Use || for gold.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Ecosystem Intro' }
    },
  },
})
