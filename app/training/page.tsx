export const revalidate = 60

import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { TrainingEnquiryForm } from '@/components/training/TrainingEnquiryForm'
import { TRAINING_PAGE_DEFAULTS as D } from '@/lib/trainingPageDefaults'
import { getTrainingPage } from '@/sanity/queries'
import { urlFor } from '@/sanity/imageUrl'
import type { TrainingPage as TrainingPageDoc } from '@/sanity/types'

// Icons for the format lines, in order (not CMS-managed).
const FORMAT_ICONS = ['ti-bolt', 'ti-flame', 'ti-users-group']

/** CMS value if it has content, otherwise the default copy. */
function pick(value: string | undefined, fallback: string): string {
  return value?.trim() ? value : fallback
}

/** Normalise a Tabler icon name ("bulb", "ti-bulb", "ti ti-bulb") to a class; null if invalid. */
function iconClass(name: string | undefined): string | null {
  const n = name?.trim().toLowerCase().replace(/^ti[\s-]+(ti-)?/, '')
  return n && /^[a-z0-9-]+$/.test(n) ? `ti-${n}` : null
}

/** Split on || and wrap every other segment in the accent class. */
function accentSplit(text: string, accentClass = 'text-gold'): React.ReactNode {
  return text.split('||').map((part, i) =>
    i % 2 === 1 ? <span key={i} className={accentClass}>{part}</span> : part,
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTrainingPage().catch(() => null)
  return {
    title: pick(p?.metaTitle, D.metaTitle),
    description: pick(p?.metaDescription, D.metaDescription),
  }
}

type HeroImage = { desktopUrl: string; mobileUrl: string; position: string; alt: string }

function heroImage(img: TrainingPageDoc['heroImage']): HeroImage | null {
  if (!img?.asset) return null
  const { hotspot } = img
  return {
    desktopUrl: urlFor(img).width(2400).auto('format').url(),
    // Width + height makes the CDN crop around the hotspot: a tall frame for phones.
    mobileUrl: urlFor(img).width(900).height(1600).fit('crop').auto('format').url(),
    position: hotspot ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : 'center',
    alt: img.alt?.trim() ?? '',
  }
}

/** Same layering as the homepage hero (PageHeroBg in DesktopSite.tsx): base, image, two contrast gradients. */
function HeroImageBg({ image }: { image: HeroImage }) {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-mahogany-deep" />
      <picture>
        <source media="(max-width: 767px)" srcSet={image.mobileUrl} />
        <img
          src={image.desktopUrl}
          alt={image.alt}
          aria-hidden={image.alt ? undefined : true}
          fetchPriority="high"
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          style={{ objectPosition: image.position }}
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(105deg,rgba(36,10,3,.92)_0%,rgba(36,10,3,.65)_40%,rgba(36,10,3,.28)_74%,rgba(36,10,3,.1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(36,10,3,.95)_2%,rgba(36,10,3,0)_46%)]" />
      {/* Phones: text spans the full width, so darken the whole frame, not just the left. */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[rgba(36,10,3,.45)] md:hidden" />
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-3.5 text-[11.5px] font-bold uppercase tracking-[.22em] text-gold">{children}</p>
}

const h2Class = 'm-0 text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-lace'
const sectionClass = 'px-[clamp(20px,6vw,64px)] py-[clamp(64px,9vw,120px)]'

export default async function TrainingPage() {
  const p = await getTrainingPage().catch(() => null)
  const heroImg = heroImage(p?.heroImage)

  const cmsTiles = (p?.coverTiles ?? []).filter((t) => t.title?.trim())
  const tiles = cmsTiles.length
    ? cmsTiles.map((t) => ({ key: t._key, title: t.title!, description: t.description ?? '', icon: iconClass(t.icon) }))
    : D.coverTiles.map((t) => ({ key: t.title, title: t.title, description: t.description, icon: iconClass(t.icon) }))

  const cmsCards = (p?.approachCards ?? []).filter((c) => c.title?.trim())
  const cards = cmsCards.length
    ? cmsCards.map((c) => ({ key: c._key, title: c.title!, description: c.description ?? '' }))
    : D.approachCards.map((c) => ({ key: c.title, title: c.title, description: c.description }))

  const cmsFormats = (p?.formatsLines ?? []).filter((l) => l?.trim())
  const formats = cmsFormats.length ? cmsFormats : D.formatsLines

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[88svh] flex-col overflow-hidden bg-[linear-gradient(150deg,#340F05_0%,#240A03_100%)]">
        {heroImg ? (
          <HeroImageBg image={heroImg} />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-20%] bg-[radial-gradient(ellipse_80%_60%_at_65%_40%,rgba(222,192,120,0.1)_0%,transparent_60%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[6%] top-[18%] hidden h-[clamp(200px,26vw,340px)] w-[clamp(200px,26vw,340px)] animate-[wtbSpin_60s_linear_infinite] rounded-full border border-dashed border-gold/20 md:block"
            />
          </>
        )}

        <header className="relative z-10 px-[clamp(20px,6vw,64px)] pt-7">
          <Link href="/" className="text-xl font-extrabold tracking-[-0.02em] no-underline">
            <span className="text-lace">wethink</span><span className="text-gold">bharat</span>
          </Link>
        </header>

        <div className="relative z-10 flex flex-1 items-center px-[clamp(20px,6vw,64px)] pb-20 pt-14">
          <div className="max-w-[900px]">
            <ScrollReveal>
              <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[.14em] text-gold">
                <span className="pulse h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {pick(p?.heroEyebrow, D.heroEyebrow)}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-hero-lg m-0 mb-7 text-lace">
                {accentSplit(pick(p?.heroHeadline, D.heroHeadline))}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-lg m-0 mb-10 max-w-[620px] text-almond">
                {pick(p?.heroSub, D.heroSub)}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a href="#enquire" className="btn-gold justify-center">{pick(p?.heroPrimaryCtaLabel, D.heroPrimaryCtaLabel)}</a>
                <a href="#approach" className="btn-ghost justify-center">{pick(p?.heroSecondaryCtaLabel, D.heroSecondaryCtaLabel)}</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <section className={`${sectionClass} bg-mahogany`}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal>
            <SectionLabel>The gap</SectionLabel>
            <h2 className={h2Class}>
              {accentSplit(pick(p?.gapHeading, D.gapHeading))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="m-0 whitespace-pre-line text-body-md text-almond lg:pt-9">
              {pick(p?.gapBody, D.gapBody)}
            </p>
            <p className="font-georgia m-0 mt-9 border-l-2 border-gold pl-5 text-[clamp(26px,3vw,38px)] italic leading-tight text-gold">
              {pick(p?.gapPullLine, D.gapPullLine)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* WHAT OUR SESSIONS COVER */}
      <section className={`${sectionClass} bg-mahogany-deep`}>
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <h2 className={`${h2Class} mb-10`}>
              {accentSplit(pick(p?.coverHeading, D.coverHeading))}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {tiles.map((c, i) => (
              <ScrollReveal key={c.key} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-[18px] border border-gold/15 bg-[linear-gradient(160deg,#340F05,#2A0E05)] p-7 transition-colors duration-200 hover:border-gold/40">
                  {c.icon && (
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-[22px] text-gold">
                      <i className={`ti ${c.icon}`} aria-hidden="true" />
                    </span>
                  )}
                  <h3 className="m-0 mb-2 text-lg font-extrabold text-lace">{c.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-almond">{c.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section id="approach" className={`${sectionClass} scroll-mt-4 bg-mahogany`}>
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <h2 className={`${h2Class} mb-10`}>
              {accentSplit(pick(p?.approachHeading, D.approachHeading))}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {cards.map((a, i) => (
              <ScrollReveal key={a.key} delay={(i % 4) * 0.08}>
                <div className="h-full border-t border-gold/25 pt-6">
                  <div className="mb-4 text-[clamp(40px,4vw,56px)] font-extrabold leading-none tracking-[-0.03em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="m-0 mb-2 text-lg font-extrabold text-lace">{a.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-almond">{a.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME FORMATS */}
      <section className={`${sectionClass} bg-mahogany-deep`}>
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <div className="rounded-[20px] border border-gold/20 bg-[linear-gradient(120deg,#340F05,#2A0E05)] p-[clamp(24px,4vw,48px)]">
              <SectionLabel>{pick(p?.formatsHeading, D.formatsHeading)}</SectionLabel>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {formats.map((f, i) => (
                  <div key={`${i}-${f}`} className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-mahogany-dark/60 px-5 py-5">
                    <i className={`ti ${FORMAT_ICONS[i % FORMAT_ICONS.length]} text-2xl text-gold`} aria-hidden="true" />
                    <span className="text-[17px] font-bold leading-snug text-lace">{f}</span>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-7 text-body-sm text-almond">
                {accentSplit(pick(p?.formatsDelivery, D.formatsDelivery), 'text-lace')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className={`${sectionClass} scroll-mt-4 bg-[linear-gradient(150deg,#340F05_0%,#240A03_100%)]`}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <h2 className={`${h2Class} mb-5`}>
              {accentSplit(pick(p?.ctaHeading, D.ctaHeading))}
            </h2>
            <p className="m-0 max-w-[460px] text-body-md text-almond">
              {pick(p?.ctaSub, D.ctaSub)}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-[22px] border border-gold/25 bg-[linear-gradient(150deg,#340F05,#240A03)] p-[clamp(20px,4vw,44px)] shadow-[0_40px_100px_-30px_rgba(0,0,0,.8)]">
              <TrainingEnquiryForm submitLabel={pick(p?.ctaButtonLabel, D.ctaButtonLabel)} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 bg-mahogany-deep px-[clamp(20px,6vw,64px)] pb-10 pt-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-[-0.02em] no-underline">
            <span className="text-lace">wethink</span><span className="text-gold">bharat</span>
          </Link>
          <p className="m-0 text-[13px] text-almond/50">
            © {new Date().getFullYear()} WeThink Bharat. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
