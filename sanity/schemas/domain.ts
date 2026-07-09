import { defineType, defineField, defineArrayMember } from 'sanity'

export const domain = defineType({
  name: 'domain',
  title: 'Domain',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      description: 'Display number, e.g. 1, 2, 3.',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'name',
      title: 'Domain Name',
      type: 'string',
      description: 'e.g. "Entrepreneurship"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partnerName',
      title: 'Partner Name',
      type: 'string',
      description: 'Industry partner delivering this domain.',
    }),
    defineField({
      name: 'simulatorName',
      title: 'Simulator Name',
      type: 'string',
      description: 'Name of the simulator tool used in this domain.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Phase 2', value: 'phase2' },
        ],
        layout: 'radio',
      },
      initialValue: 'live',
      validation: (Rule) => Rule.required(),
    }),

    // ── Images ───────────────────────────────────────────────────────────
    defineField({
      name: 'teaserImage',
      title: 'Teaser Image (Home page card)',
      type: 'image',
      description: '4:3 card image used on the Home page domain teaser grid.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'detailImage',
      title: 'Detail Image (Domains page)',
      type: 'image',
      description: 'Image shown beside the four levels on the full Domains page.',
      options: { hotspot: true },
    }),

    // ── Levels ───────────────────────────────────────────────────────────
    defineField({
      name: 'levels',
      title: 'Levels',
      type: 'array',
      description: 'Exactly 4 progressive levels for this domain.',
      validation: (Rule) => Rule.length(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'level',
          fields: [
            defineField({ name: 'levelLabel', title: 'Level Label', type: 'string', description: 'e.g. "Level 1"' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'levelLabel' },
          },
        }),
      ],
    }),

    // ── Outcomes ─────────────────────────────────────────────────────────
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      description: 'Bullet list of what students walk away with.',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],

  orderings: [
    {
      title: 'Order Rank',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
    {
      title: 'Number',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],

  preview: {
    select: { title: 'name', subtitle: 'status', number: 'number' },
    prepare({ title, subtitle, number }) {
      return {
        title: `${number ? `${number}. ` : ''}${title ?? 'Untitled Domain'}`,
        subtitle: subtitle === 'live' ? 'Live' : 'Phase 2',
      }
    },
  },
})
