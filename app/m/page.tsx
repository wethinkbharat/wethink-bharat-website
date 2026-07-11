export const revalidate = 60

import { MobilePageClient } from '@/components/mobile/MobilePageClient'
import {
  getAdvisoryMembers,
  getAdvisoryIntro,
  getCurrentPartners,
  getSiteSettings,
  getHero,
  getVisionSection,
  getBeliefsIntro,
  getBeliefs,
  getGapSection,
  getPathwaysIntro,
  getPathways,
  getDomainsIntro,
  getDomains,
  getSummit,
  getJourneyIntro,
  getJourneyStages,
  getEcosystemIntro,
  getApplyCta,
} from '@/sanity/queries'
import { urlFor } from '@/sanity/imageUrl'

function blocksToText(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return ''
  return (blocks as { _type?: string; children?: { text?: string }[] }[])
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children ?? []).map((c) => c.text ?? '').join(''))
    .filter(Boolean)
    .join('\n\n')
}

type HeadlineSpan = { text: string; gold: boolean }

function blocksToSpans(blocks: unknown[]): HeadlineSpan[] {
  if (!Array.isArray(blocks)) return []
  const result: HeadlineSpan[] = []
  for (const block of blocks as { _type?: string; children?: { text?: string; marks?: string[] }[] }[]) {
    if (block._type !== 'block') continue
    for (const child of block.children ?? []) {
      result.push({ text: child.text ?? '', gold: (child.marks ?? []).includes('gold') })
    }
  }
  return result
}

function imgUrl(src: { asset?: unknown } | undefined, w: number) {
  return src?.asset ? urlFor(src as Parameters<typeof urlFor>[0]).width(w).url() : undefined
}

export default async function MobilePage() {
  const [
    siteSettings,
    hero,
    advisoryMembers,
    advisoryIntro,
    currentPartners,
    visionSection,
    beliefsIntro,
    beliefs,
    gapSection,
    pathwaysIntro,
    pathways,
    domainsIntro,
    domains,
    ecosystemIntro,
    summit,
    journeyIntro,
    journeyStages,
    applyCta,
  ] = await Promise.all([
    getSiteSettings().catch(() => null),
    getHero().catch(() => null),
    getAdvisoryMembers().catch(() => []),
    getAdvisoryIntro().catch(() => null),
    getCurrentPartners().catch(() => []),
    getVisionSection().catch(() => null),
    getBeliefsIntro().catch(() => null),
    getBeliefs().catch(() => []),
    getGapSection().catch(() => null),
    getPathwaysIntro().catch(() => null),
    getPathways().catch(() => []),
    getDomainsIntro().catch(() => null),
    getDomains().catch(() => []),
    getEcosystemIntro().catch(() => null),
    getSummit().catch(() => null),
    getJourneyIntro().catch(() => null),
    getJourneyStages().catch(() => []),
    getApplyCta().catch(() => null),
  ])

  const processedAdvisory = advisoryMembers.map((m, i) => ({
    _id: m._id,
    name: m.name ?? '',
    roleOrg: m.roleOrg,
    bio: blocksToText((m.bio ?? []) as unknown[]),
    headshotUrl: m.headshot?.asset ? urlFor(m.headshot).width(400).height(500).url() : undefined,
    initial: m.initial,
    status: m.status,
    categoryLabel: m.categoryLabel,
    number: m.number ?? i + 1,
  }))

  const processedPartners = currentPartners.map((p) => ({
    _id: p._id,
    name: p.name,
    type: p.type,
    description: p.description,
    logoUrl: p.logo?.asset ? urlFor(p.logo).width(240).url() : undefined,
    categoryName: p.category?.name,
    showInHomeMarquee: p.showInHomeMarquee ?? false,
    showInEcosystemGrid: p.showInEcosystemGrid ?? false,
  }))

  const logoUrl = siteSettings?.logo?.asset
    ? urlFor(siteSettings.logo).height(48).url()
    : undefined

  const processedHero = hero ? {
    seasonBanner: hero.seasonBanner,
    headlineSpans: blocksToSpans((hero.headline ?? []) as unknown[]),
    subcopy: hero.subcopy,
    primaryCtaLabel: hero.primaryCtaLabel,
    primaryCtaLink: hero.primaryCtaLink,
    secondaryCtaLabel: hero.secondaryCtaLabel,
    secondaryCtaLink: hero.secondaryCtaLink,
    domainsStrip: hero.domainsStrip,
    scrollCueText: hero.scrollCueText,
    heroImageUrl: imgUrl(hero.heroImage, 1600),
  } : null

  const processedVisionSection = visionSection ? {
    kicker: visionSection.kicker,
    heading: visionSection.heading,
    bodyBlocks: blocksToText((visionSection.bodyBlocks ?? []) as unknown[]),
    directorImageUrl: imgUrl(visionSection.directorImage, 200),
    directorName: visionSection.directorName,
    directorTitle: visionSection.directorTitle,
    directorQuote: visionSection.directorQuote,
    purpose: visionSection.purpose,
    vision: visionSection.vision,
    mission: visionSection.mission,
  } : null

  const processedBeliefsIntro = beliefsIntro ? {
    kicker: beliefsIntro.kicker,
    heading: beliefsIntro.heading,
    intro: beliefsIntro.intro,
  } : null

  const processedBeliefs = beliefs.map((b) => ({
    number: b.number ?? 0,
    title: b.title,
    body: b.body ?? '',
  }))

  const processedGapSection = gapSection ? {
    kicker: gapSection.kicker,
    heading: gapSection.heading,
    intro: blocksToText((gapSection.intro ?? []) as unknown[]),
    stats: (gapSection.stats ?? []).map((s) => ({
      value: s.value,
      suffix: s.suffix ?? '',
      label: s.label,
      description: s.description ?? '',
    })),
  } : null

  const processedPathwaysIntro = pathwaysIntro ? {
    kicker: pathwaysIntro.kicker,
    heading: pathwaysIntro.heading,
    subtext: pathwaysIntro.subtext,
  } : null

  const processedPathways = pathways.map((p) => ({
    audienceLabel: p.audienceLabel,
    title: p.title,
    description: p.description ?? '',
    imageUrl: imgUrl(p.image, 800),
  }))

  const processedDomainsIntro = domainsIntro ? {
    kicker: domainsIntro.kicker,
    heading: domainsIntro.heading,
    subtext: domainsIntro.subtext,
    featureImageUrl: imgUrl(domainsIntro.featureImage, 1200),
  } : null

  const processedDomains = domains.map((d) => ({
    number: d.number ?? 0,
    name: d.name,
    partnerName: d.partnerName ?? '',
    simulatorName: d.simulatorName ?? '',
    status: d.status,
    levels: (d.levels ?? []).map((l) => ({
      levelLabel: l.levelLabel ?? '',
      title: l.title ?? '',
      description: l.description ?? '',
    })),
    outcomes: d.outcomes ?? [],
    teaserImageUrl: imgUrl(d.teaserImage, 800),
    detailImageUrl: imgUrl(d.detailImage, 800),
  }))

  const processedSummit = summit ? {
    heading: summit.heading,
    homepageTeaser: summit.homepageTeaser,
    body: blocksToText((summit.body ?? []) as unknown[]),
    pullQuote: summit.pullQuote,
    statChips: summit.statChips ?? [],
    getInvolvedCards: (summit.getInvolvedCards ?? []).map((c) => ({
      audience: c.audience ?? '',
      title: c.title ?? '',
      description: c.description ?? '',
      ctaLabel: c.ctaLabel ?? '',
      ctaLink: c.ctaLink,
    })),
  } : null

  const processedJourneyStages = journeyStages.map((s) => ({
    number: s.number ?? 0,
    name: s.name,
    durationLabel: s.durationLabel ?? '',
    description: s.description ?? '',
    iconUrl: imgUrl(s.icon, 120),
  }))

  const processedJourneyIntro = journeyIntro ? {
    kicker: journeyIntro.kicker,
    heading: journeyIntro.heading,
  } : null

  const processedApplyCta = applyCta ? {
    heading: applyCta.heading,
    body: applyCta.body,
    primaryCtaLabel: applyCta.primaryCtaLabel,
    secondaryCtaLabel: applyCta.secondaryCtaLabel,
  } : null

  const siteConfig = siteSettings ? {
    primaryCtaLabel: siteSettings.primaryCtaLabel,
    footerTagline: siteSettings.footerTagline,
    copyrightText: siteSettings.copyrightText,
    footerExploreLinks: (siteSettings.footerExploreLinks ?? []).map((l) => ({ label: l.label, link: l.link })),
    footerConnectLinks: (siteSettings.footerConnectLinks ?? []).map((l) => ({ label: l.label, link: l.link })),
  } : null

  const headerImages = {
    vision:    imgUrl(visionSection?.headerImage,   1600),
    domains:   imgUrl(domainsIntro?.headerImage,    1600),
    ecosystem: imgUrl(ecosystemIntro?.headerImage,  1600),
    advisory:  imgUrl(advisoryIntro?.headerImage,   1600),
    journey:   imgUrl(journeyIntro?.headerImage,    1600),
    summit:    imgUrl(summit?.headerImage,          1600),
  }

  return (
    <MobilePageClient
      logoUrl={logoUrl}
      hero={processedHero}
      advisoryMembers={processedAdvisory}
      currentPartners={processedPartners}
      visionSection={processedVisionSection}
      beliefsIntro={processedBeliefsIntro}
      beliefs={processedBeliefs}
      gapSection={processedGapSection}
      pathwaysIntro={processedPathwaysIntro}
      pathways={processedPathways}
      domainsIntro={processedDomainsIntro}
      domains={processedDomains}
      summit={processedSummit}
      journeyStages={processedJourneyStages}
      journeyIntro={processedJourneyIntro}
      applyCta={processedApplyCta}
      siteConfig={siteConfig}
      headerImages={headerImages}
    />
  )
}
