import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  // Singleton — document id 'hero'.
  fields: [
    defineField({
      name: 'seasonBanner',
      title: 'Season Banner',
      type: 'string',
      description: 'e.g. "Season 1 · school nominations open"',
      initialValue: 'Season 1 · school nominations open',
    }),

    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'array',
      description:
        'Rich-text headline. Wrap words in the "gold" annotation to render them in the accent colour.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Em', value: 'em' },
            ],
            annotations: [
              {
                name: 'gold',
                type: 'object',
                title: 'Gold / Accent',
                fields: [
                  {
                    name: '_type',
                    type: 'string',
                    initialValue: 'gold',
                    hidden: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'subcopy',
      title: 'Sub-copy',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
    }),

    defineField({
      name: 'domainsStrip',
      title: 'Domains Strip Text',
      type: 'string',
      description: 'e.g. "3 industry domains live now — Entrepreneurship, Media & Design"',
      initialValue: '3 industry domains live now — Entrepreneurship, Media & Design',
    }),

    defineField({
      name: 'scrollCueText',
      title: 'Scroll Cue Text',
      type: 'string',
      description: 'Small label beneath the scroll indicator.',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Full-bleed cinematic background image behind the home hero section.',
      options: { hotspot: true },
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Hero Section' }
    },
  },
})
