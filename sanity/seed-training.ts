import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'
import { TRAINING_PAGE_DEFAULTS as D } from '../lib/trainingPageDefaults'

// Seeds the trainingPage singleton (/training) with the page's default copy.
// Safe by default: skips if the document already exists, so Studio edits are kept.
// Pass --force to overwrite it with the defaults.
//
//   npm run seed:training
//   npm run seed:training -- --force

// ── Client ────────────────────────────────────────────────────────────────────

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// ── Document ──────────────────────────────────────────────────────────────────

const doc = {
  _id: 'trainingPage',
  _type: 'trainingPage',
  metaTitle: D.metaTitle,
  metaDescription: D.metaDescription,
  heroEyebrow: D.heroEyebrow,
  heroHeadline: D.heroHeadline,
  heroSub: D.heroSub,
  heroPrimaryCtaLabel: D.heroPrimaryCtaLabel,
  heroSecondaryCtaLabel: D.heroSecondaryCtaLabel,
  gapHeading: D.gapHeading,
  gapBody: D.gapBody,
  gapPullLine: D.gapPullLine,
  coverHeading: D.coverHeading,
  coverTiles: D.coverTiles.map((t, i) => ({ _key: `tile-${i + 1}`, _type: 'coverTile', ...t })),
  approachHeading: D.approachHeading,
  approachCards: D.approachCards.map((c, i) => ({ _key: `card-${i + 1}`, _type: 'approachCard', ...c })),
  formatsHeading: D.formatsHeading,
  formatsLines: D.formatsLines,
  formatsDelivery: D.formatsDelivery,
  ctaHeading: D.ctaHeading,
  ctaSub: D.ctaSub,
  ctaButtonLabel: D.ctaButtonLabel,
}

async function main() {
  const force = process.argv.includes('--force')

  console.log('🌱 WeThink Bharat — trainingPage seed')
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check your .env.local file.')
    process.exit(1)
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌  SANITY_API_WRITE_TOKEN is not set. Check your .env.local file.')
    process.exit(1)
  }

  try {
    if (force) {
      await client.createOrReplace(doc)
      console.log('  ✓  trainingPage  trainingPage (replaced)')
    } else {
      const existing = await client.getDocument('trainingPage')
      if (existing) {
        console.log('  –  trainingPage already exists — left unchanged. Use --force to overwrite.')
      } else {
        await client.create(doc)
        console.log('  ✓  trainingPage  trainingPage (created)')
      }
    }
    console.log('\n✅  Done.')
  } catch (err) {
    console.error('\n❌  Seed failed:', err)
    process.exit(1)
  }
}

main()
