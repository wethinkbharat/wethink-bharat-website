import { getClientInstance } from './client'
import type {
  SiteSettings,
  Hero,
  VisionSection,
  BeliefsIntro,
  Belief,
  PathwaysIntro,
  Pathway,
  GapSection,
  DomainsIntro,
  Domain,
  Summit,
  JourneyIntro,
  JourneyStage,
  EcosystemIntro,
  PartnerCategory,
  CurrentPartner,
  AdvisoryIntro,
  AdvisoryMember,
  ApplyCta,
  SchoolFormConfig,
  PartnerFormConfig,
} from './types'

function c() {
  return getClientInstance()
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return c().fetch(`*[_type == "siteSettings"][0]`)
}

export async function getHero(): Promise<Hero | null> {
  return c().fetch(`*[_type == "hero"][0]`)
}

export async function getVisionSection(): Promise<VisionSection | null> {
  return c().fetch(`*[_type == "visionSection"][0]`)
}

export async function getBeliefsIntro(): Promise<BeliefsIntro | null> {
  return c().fetch(`*[_type == "beliefsIntro"][0]`)
}

export async function getBeliefs(): Promise<Belief[]> {
  return c().fetch(`*[_type == "belief"] | order(orderRank asc)`)
}

export async function getPathwaysIntro(): Promise<PathwaysIntro | null> {
  return c().fetch(`*[_type == "pathwaysIntro"][0]`)
}

export async function getPathways(): Promise<Pathway[]> {
  return c().fetch(`*[_type == "pathway"] | order(orderRank asc)`)
}

export async function getGapSection(): Promise<GapSection | null> {
  return c().fetch(`*[_type == "gapSection"][0]`)
}

export async function getDomainsIntro(): Promise<DomainsIntro | null> {
  return c().fetch(`*[_type == "domainsIntro"][0]`)
}

export async function getDomains(): Promise<Domain[]> {
  return c().fetch(`*[_type == "domain"] | order(orderRank asc)`)
}

export async function getSummit(): Promise<Summit | null> {
  return c().fetch(`*[_type == "summit"][0]`)
}

export async function getJourneyIntro(): Promise<JourneyIntro | null> {
  return c().fetch(`*[_type == "journeyIntro"][0]`)
}

export async function getJourneyStages(): Promise<JourneyStage[]> {
  return c().fetch(`*[_type == "journeyStage"] | order(orderRank asc)`)
}

export async function getEcosystemIntro(): Promise<EcosystemIntro | null> {
  return c().fetch(`*[_type == "ecosystemIntro"][0]`)
}

export async function getPartnerCategories(): Promise<PartnerCategory[]> {
  return c().fetch(`*[_type == "partnerCategory"] | order(orderRank asc)`)
}

export async function getCurrentPartners(): Promise<CurrentPartner[]> {
  return c().fetch(`*[_type == "currentPartner"]{ ..., category-> }`)
}

export async function getAdvisoryIntro(): Promise<AdvisoryIntro | null> {
  return c().fetch(`*[_type == "advisoryIntro"][0]`)
}

export async function getAdvisoryMembers(): Promise<AdvisoryMember[]> {
  return c().fetch(`*[_type == "advisoryMember"] | order(orderRank asc)`)
}

export async function getApplyCta(): Promise<ApplyCta | null> {
  return c().fetch(`*[_type == "applyCta"][0]`)
}

export async function getSchoolFormConfig(): Promise<SchoolFormConfig | null> {
  return c().fetch(`*[_type == "schoolFormConfig"][0]`)
}

export async function getPartnerFormConfig(): Promise<PartnerFormConfig | null> {
  return c().fetch(`*[_type == "partnerFormConfig"][0]`)
}
