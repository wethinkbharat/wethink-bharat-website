import { defineType, defineField } from 'sanity'

export const advisoryMember = defineType({
  name: 'advisoryMember',
  title: 'Advisory Member',
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
      description: 'Display order number.',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleOrg',
      title: 'Role / Organisation',
      type: 'string',
      description: 'e.g. "CEO, Acme Corp" or "Professor, IIT Delhi"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
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
          },
        },
      ],
    }),

    // ── Visual — headshot OR initial ──────────────────────────────────────
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      description: 'Profile photo. If provided, the Initial field below is ignored.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'initial',
      title: 'Initial (fallback)',
      type: 'string',
      description:
        'Single letter shown in the avatar placeholder when no headshot is available.',
      validation: (Rule) => Rule.max(1),
    }),

    // ── Status ───────────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Member', value: 'member' },
          { title: 'Announcing Soon', value: 'announcing' },
        ],
        layout: 'radio',
      },
      initialValue: 'member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category Label',
      type: 'string',
      description:
        'Used when status is "announcing" — e.g. "Industry Expert" or "Educator".',
      hidden: ({ document }) => document?.status !== 'announcing',
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
    select: {
      title: 'name',
      subtitle: 'roleOrg',
      media: 'headshot',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: title ?? 'Unnamed Member',
        subtitle: status === 'announcing' ? `[Announcing] ${subtitle ?? ''}` : (subtitle ?? ''),
        media,
      }
    },
  },
})
