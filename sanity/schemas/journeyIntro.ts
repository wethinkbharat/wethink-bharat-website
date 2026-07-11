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
      name: 'heading',
      title: 'Page Hero Heading',
      type: 'string',
      description: 'Large H1 heading on the Journey page hero. Use || for gold. E.g. "Five stages. One ||transformation."',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Page Hero Subtext',
      type: 'text',
      rows: 2,
      description: 'Subtitle below the journey page hero heading. Use || for gold.',
    }),
    defineField({
      name: 'kicker',
      title: 'Section Heading',
      type: 'string',
      description: 'Heading above the 5-stage orbit diagram. Use || for gold. E.g. "From exposure to ||permanent proof"',
    }),
    defineField({
      name: 'sectionSubtext',
      title: 'Section Subtext',
      type: 'text',
      rows: 2,
      description: 'Smaller text beside the Section Heading above the orbit diagram. Use || for gold.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Journey Intro' }
    },
  },
})
