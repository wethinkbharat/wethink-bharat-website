import { defineType, defineField, defineArrayMember } from 'sanity'

const GOLD_HINT =
  'Use || to mark where gold colour starts (a second || ends it). E.g. "Educators of tomorrow, ||developed today."'

export const trainingPage = defineType({
  name: 'trainingPage',
  title: 'Professional Development Page',
  type: 'document',
  // Singleton — document id 'trainingPage'. Content for /training.
  // Empty fields fall back to the defaults in lib/trainingPageDefaults.ts.
  groups: [
    { name: 'seo', title: 'SEO', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'gap', title: 'The Gap' },
    { name: 'cover', title: 'What Our Sessions Cover' },
    { name: 'approach', title: 'Our Approach' },
    { name: 'formats', title: 'Formats' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    // ── SEO ──────────────────────────────────────────────────────────────
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', group: 'seo' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),

    // ── Hero ─────────────────────────────────────────────────────────────
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', description: GOLD_HINT, group: 'hero' }),
    defineField({ name: 'heroSub', title: 'Sub-copy', type: 'text', rows: 3, group: 'hero' }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      description: 'Scrolls to the enquiry form.',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      description: 'Scrolls to the Our Approach section.',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description:
        'Full-bleed background image behind the hero, darkened on the left for text contrast. Set the hotspot on the subject; phones show a tall crop centred on it.',
      options: { hotspot: true },
      group: 'hero',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers. Leave empty if it is purely decorative.',
        }),
      ],
    }),

    // ── The Gap ──────────────────────────────────────────────────────────
    defineField({ name: 'gapHeading', title: 'Heading', type: 'string', description: GOLD_HINT, group: 'gap' }),
    defineField({ name: 'gapBody', title: 'Body', type: 'text', rows: 5, group: 'gap' }),
    defineField({ name: 'gapPullLine', title: 'Pull Line', type: 'string', group: 'gap' }),

    // ── What Our Sessions Cover ──────────────────────────────────────────
    defineField({ name: 'coverHeading', title: 'Section Heading', type: 'string', description: GOLD_HINT, group: 'cover' }),
    defineField({
      name: 'coverTiles',
      title: 'Tiles',
      type: 'array',
      group: 'cover',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'coverTile',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({
              name: 'icon',
              title: 'Tabler Icon Name',
              type: 'string',
              description:
                'Icon name from tabler.io/icons (webfont v2.44), without the "ti-" prefix. E.g. "bulb", "device-laptop", "shield-lock".',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        }),
      ],
    }),

    // ── Our Approach ─────────────────────────────────────────────────────
    defineField({ name: 'approachHeading', title: 'Heading', type: 'string', description: GOLD_HINT, group: 'approach' }),
    defineField({
      name: 'approachCards',
      title: 'Cards',
      type: 'array',
      description: 'Numbered automatically (01, 02, …) in the order listed.',
      group: 'approach',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'approachCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),

    // ── Formats ──────────────────────────────────────────────────────────
    defineField({ name: 'formatsHeading', title: 'Heading', type: 'string', group: 'formats' }),
    defineField({
      name: 'formatsLines',
      title: 'Format Lines',
      type: 'array',
      description: 'One programme format per line, e.g. "Focused workshops".',
      group: 'formats',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'formatsDelivery',
      title: 'Delivery Line',
      type: 'string',
      description:
        'Shown under the formats. Wrap words in || to brighten them, e.g. "Delivered ||online or on campus||, for …"',
      group: 'formats',
    }),

    // ── CTA ──────────────────────────────────────────────────────────────
    defineField({ name: 'ctaHeading', title: 'Heading', type: 'string', description: GOLD_HINT, group: 'cta' }),
    defineField({ name: 'ctaSub', title: 'Sub-copy', type: 'text', rows: 3, group: 'cta' }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'Form Button Label',
      type: 'string',
      description: 'Label on the enquiry form’s submit button. The form fields themselves are not editable here.',
      group: 'cta',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Professional Development Page' }
    },
  },
})
