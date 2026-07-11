import { defineType, defineField } from 'sanity'

export const visionSection = defineType({
  name: 'visionSection',
  title: 'Vision Section',
  type: 'document',
  // Singleton — document id 'visionSection'.
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Background image shown behind the Vision page header.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small label above the heading, e.g. "Our Vision"',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Page Hero Heading',
      type: 'string',
      description: 'Large heading shown at the top of the Vision page, e.g. "We are building India\'s first experiential learning ecosystem."',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Page Hero Subtext',
      type: 'text',
      rows: 2,
      description: 'Subtitle shown below the hero heading on the Vision page.',
    }),
    defineField({
      name: 'poeticQuote',
      title: 'Poetic Quote',
      type: 'text',
      rows: 3,
      description: 'Large opening quote in the Vision page interstitial. End it with "That has to change." to keep the gold accent.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description:
        'Two-tone support: wrap the coloured portion in square brackets in the UI, ' +
        'or split at the component level using a delimiter such as "|".',
    }),

    defineField({
      name: 'bodyBlocks',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Em', value: 'em' },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'directorImage',
      title: "Director's Photo",
      type: 'image',
      description: 'Portrait shown in the 76×76 circle beside the director quote.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'directorName',
      title: "Director's Name",
      type: 'string',
      description: 'e.g. "Dr. Neha Raghav"',
      initialValue: 'Dr. Neha Raghav',
    }),
    defineField({
      name: 'directorTitle',
      title: "Director's Designation",
      type: 'string',
      description: 'e.g. "Director, WeThink Bharat"',
      initialValue: 'Director, WeThink Bharat',
    }),
    defineField({
      name: 'directorQuote',
      title: "Director's Quote",
      type: 'string',
      description: 'Pull quote attributed to the director.',
    }),

    // ── Purpose / Vision / Mission ────────────────────────────────────────
    defineField({
      name: 'purpose',
      title: 'Purpose',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'text', type: 'text', title: 'Text', rows: 3 },
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'text', type: 'text', title: 'Text', rows: 3 },
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'text', type: 'text', title: 'Text', rows: 3 },
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Vision Section' }
    },
  },
})
