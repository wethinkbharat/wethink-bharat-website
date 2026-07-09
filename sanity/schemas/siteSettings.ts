import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Treated as a singleton — only one document with id 'siteSettings' is created.
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Primary site logo (SVG or PNG recommended).',
      options: { hotspot: false },
    }),

    // ── Navigation ────────────────────────────────────────────────────────
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({
              name: 'anchor',
              title: 'Anchor / Path',
              type: 'string',
              description: 'e.g. #about or /apply',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'anchor' },
          },
        }),
      ],
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      description: 'Text shown on the main call-to-action button in the nav.',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
    }),

    // ── Footer ────────────────────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
    }),
    defineField({
      name: 'footerExploreLinks',
      title: 'Footer — Explore Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'link', title: 'Link / Anchor', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'link' } },
        }),
      ],
    }),
    defineField({
      name: 'footerConnectLinks',
      title: 'Footer — Connect Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerConnectLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'link', title: 'URL', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'link' } },
        }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'e.g. © 2025 WeThink Bharat. All rights reserved.',
    }),

    // ── Toasts / Notifications ────────────────────────────────────────────
    defineField({
      name: 'formNotConnectedToast',
      title: 'Form Not Connected Toast',
      type: 'string',
      description: 'Message shown when the form endpoint is not yet configured.',
    }),

    // ── SEO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO / OG Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
