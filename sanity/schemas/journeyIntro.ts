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
      description: 'Use || to mark where gold colour starts. E.g. "From exposure to ||permanent proof"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Use || to mark where gold colour starts. E.g. "Five stages. One ||transformation."',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Page Hero Subtext',
      type: 'text',
      rows: 2,
      description: 'Subtitle below the journey page hero heading. Use || for gold.',
    }),
    defineField({
      name: 'sectionSubtext',
      title: 'Section Subtext',
      type: 'text',
      rows: 2,
      description: 'Subtext beside the orbit section heading. Use || for gold.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Journey Intro' }
    },
  },
})
