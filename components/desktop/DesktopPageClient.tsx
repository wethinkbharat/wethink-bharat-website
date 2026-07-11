'use client'
import { useState } from 'react'
import { DesktopSite } from './DesktopSite'
import { SchoolFormModal } from '@/components/shared/SchoolFormModal'
import { PartnerFormModal } from '@/components/shared/PartnerFormModal'
import { Toast } from '@/components/shared/Toast'

export interface AdvisoryMemberData {
  _id: string
  name: string
  roleOrg?: string
  bio: string
  headshotUrl?: string
  initial?: string
  status: 'member' | 'announcing'
  categoryLabel?: string
  number?: number
}

export interface CurrentPartnerData {
  _id: string
  name: string
  type?: string
  description?: string
  logoUrl?: string
  categoryName?: string
  showInHomeMarquee?: boolean
  showInEcosystemGrid?: boolean
}

export interface HeroData {
  seasonBanner?: string
  headlineSpans: { text: string; gold: boolean }[]
  subcopy?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
  domainsStrip?: string
  scrollCueText?: string
  heroImageUrl?: string
}

export interface VisionSectionData {
  kicker?: string
  heading?: string
  bodyBlocks?: string
  directorImageUrl?: string
  directorName?: string
  directorTitle?: string
  directorQuote?: string
  purpose?: { label?: string; text?: string }
  vision?: { label?: string; text?: string }
  mission?: { label?: string; text?: string }
}

export interface BeliefsIntroData {
  kicker?: string
  heading?: string
  intro?: string
}

export interface BeliefData {
  number: number
  title: string
  body: string
}

export interface GapStatData {
  value: string
  suffix: string
  label: string
  description: string
}

export interface GapSectionData {
  kicker?: string
  heading?: string
  intro?: string
  stats: GapStatData[]
}

export interface PathwaysIntroData {
  kicker?: string
  heading?: string
  subtext?: string
}

export interface PathwayData {
  audienceLabel: string
  title: string
  description: string
  imageUrl?: string
}

export interface DomainsIntroData {
  kicker?: string
  heading?: string
  subtext?: string
  featureImageUrl?: string
}

export interface DomainLevelData {
  levelLabel: string
  title: string
  description: string
}

export interface DomainData {
  number: number
  name: string
  partnerName: string
  simulatorName: string
  status: 'live' | 'phase2'
  levels: DomainLevelData[]
  outcomes: string[]
  teaserImageUrl?: string
  detailImageUrl?: string
}

export interface GetInvolvedCardData {
  audience: string
  title: string
  description: string
  ctaLabel: string
  ctaLink?: string
}

export interface SummitData {
  heading?: string
  body?: string
  pullQuote?: string
  statChips: string[]
  getInvolvedCards: GetInvolvedCardData[]
}

export interface JourneyStageData {
  number: number
  name: string
  durationLabel: string
  description: string
  iconUrl?: string
}

export interface JourneyIntroData {
  kicker?: string
  heading?: string
}

export interface ApplyCtaData {
  heading?: string
  body?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
}

export interface FooterLinkData {
  label: string
  link: string
}

export interface SiteConfigData {
  primaryCtaLabel?: string
  footerTagline?: string
  copyrightText?: string
  footerExploreLinks: FooterLinkData[]
  footerConnectLinks: FooterLinkData[]
}

export interface HeaderImagesData {
  vision?: string
  domains?: string
  ecosystem?: string
  advisory?: string
  journey?: string
  summit?: string
}

interface Props {
  logoUrl?: string
  hero?: HeroData | null
  advisoryMembers?: AdvisoryMemberData[]
  currentPartners?: CurrentPartnerData[]
  visionSection?: VisionSectionData | null
  beliefsIntro?: BeliefsIntroData | null
  beliefs?: BeliefData[]
  gapSection?: GapSectionData | null
  pathwaysIntro?: PathwaysIntroData | null
  pathways?: PathwayData[]
  domainsIntro?: DomainsIntroData | null
  domains?: DomainData[]
  summit?: SummitData | null
  journeyStages?: JourneyStageData[]
  journeyIntro?: JourneyIntroData | null
  applyCta?: ApplyCtaData | null
  siteConfig?: SiteConfigData | null
  headerImages?: HeaderImagesData
}

export function DesktopPageClient({
  logoUrl,
  hero,
  advisoryMembers,
  currentPartners,
  visionSection,
  beliefsIntro,
  beliefs,
  gapSection,
  pathwaysIntro,
  pathways,
  domainsIntro,
  domains,
  summit,
  journeyStages,
  journeyIntro,
  applyCta,
  siteConfig,
  headerImages,
}: Props = {}) {
  const [schoolFormOpen, setSchoolFormOpen] = useState(false)
  const [partnerFormOpen, setPartnerFormOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 5000)
  }

  return (
    <>
      <DesktopSite
        onSchoolFormOpen={() => setSchoolFormOpen(true)}
        onPartnerFormOpen={() => setPartnerFormOpen(true)}
        logoUrl={logoUrl}
        hero={hero}
        advisoryMembers={advisoryMembers}
        currentPartners={currentPartners}
        visionSection={visionSection}
        beliefsIntro={beliefsIntro}
        beliefs={beliefs}
        gapSection={gapSection}
        pathwaysIntro={pathwaysIntro}
        pathways={pathways}
        domainsIntro={domainsIntro}
        domains={domains}
        summit={summit}
        journeyStages={journeyStages}
        journeyIntro={journeyIntro}
        applyCta={applyCta}
        siteConfig={siteConfig}
        headerImages={headerImages}
      />
      {schoolFormOpen && (
        <SchoolFormModal
          onClose={() => setSchoolFormOpen(false)}
          onSuccess={() => { setSchoolFormOpen(false); showToast("Thank you — we'll be in touch soon.") }}
          formConfig={null}
        />
      )}
      {partnerFormOpen && (
        <PartnerFormModal
          onClose={() => setPartnerFormOpen(false)}
          onSuccess={() => { setPartnerFormOpen(false); showToast("Thank you — we'll be in touch soon.") }}
          formConfig={null}
        />
      )}
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
