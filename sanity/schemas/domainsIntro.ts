import { defineType, defineField } from 'sanity'

export const domainsIntro = defineType({
  name: 'domainsIntro',
  title: 'Domains — Intro',
  type: 'document',
  // Singleton — document id 'domainsIntro'.
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Background image shown behind the Domains page header.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
      description: 'Editorial image shown beside the intro copy on the Domains page (v6-feat-domains).',
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
      return { title: 'Domains Intro' }
    },
  },
})
