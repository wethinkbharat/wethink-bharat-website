'use client'
import { useState } from 'react'
import { MobileSite } from './MobileSite'
import { SchoolFormModal } from '@/components/shared/SchoolFormModal'
import { PartnerFormModal } from '@/components/shared/PartnerFormModal'
import { Toast } from '@/components/shared/Toast'
import type {
  AdvisoryMemberData,
  CurrentPartnerData,
  HeroData,
  VisionSectionData,
  BeliefsIntroData,
  BeliefData,
  GapSectionData,
  PathwaysIntroData,
  PathwayData,
  DomainsIntroData,
  DomainData,
  SummitData,
  JourneyStageData,
  JourneyIntroData,
  ApplyCtaData,
  SiteConfigData,
  HeaderImagesData,
} from '@/components/desktop/DesktopPageClient'

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

export function MobilePageClient({
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
      <MobileSite
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
