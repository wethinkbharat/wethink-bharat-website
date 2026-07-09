import { siteSettings } from './siteSettings'
import { hero } from './hero'
import { visionSection } from './visionSection'
import { belief } from './belief'
import { beliefsIntro } from './beliefsIntro'
import { pathway } from './pathway'
import { pathwaysIntro } from './pathwaysIntro'
import { gapSection } from './gapSection'
import { domain } from './domain'
import { domainsIntro } from './domainsIntro'
import { summit } from './summit'
import { journeyStage } from './journeyStage'
import { journeyIntro } from './journeyIntro'
import { partnerCategory } from './partnerCategory'
import { currentPartner } from './currentPartner'
import { ecosystemIntro } from './ecosystemIntro'
import { advisoryMember } from './advisoryMember'
import { advisoryIntro } from './advisoryIntro'
import { applyCta } from './applyCta'
import { schoolFormConfig } from './schoolFormConfig'
import { partnerFormConfig } from './partnerFormConfig'
import { enquiry } from './enquiry'

export const schemaTypes = [
  // Singletons
  siteSettings,
  hero,
  visionSection,
  beliefsIntro,
  pathwaysIntro,
  gapSection,
  domainsIntro,
  journeyIntro,
  ecosystemIntro,
  advisoryIntro,
  applyCta,
  summit,
  schoolFormConfig,
  partnerFormConfig,

  // Ordered documents
  belief,
  pathway,
  domain,
  journeyStage,
  partnerCategory,
  currentPartner,
  advisoryMember,

  // API-created documents (leads / enquiries)
  enquiry,
]
