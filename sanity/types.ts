import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: SanityImageSource
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface NavLink {
  _key: string
  label: string
  anchor: string
}

export interface FooterLink {
  _key: string
  label: string
  link: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Site Settings
// ─────────────────────────────────────────────────────────────────────────────

export interface SiteSettings {
  _id: 'siteSettings'
  _type: 'siteSettings'
  logo?: SanityImage
  navLinks: NavLink[]
  primaryCtaLabel?: string
  primaryCtaLink?: string
  footerTagline?: string
  footerExploreLinks: FooterLink[]
  footerConnectLinks: FooterLink[]
  copyrightText?: string
  formNotConnectedToast?: string
  seoTitle?: string
  seoDescription?: string
  seoImage?: SanityImage
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

export interface Hero {
  _id: 'hero'
  _type: 'hero'
  seasonBanner?: string
  headline: PortableTextBlock[]
  subcopy?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
  domainsStrip?: string
  scrollCueText?: string
  heroImage?: SanityImage
}

// ─────────────────────────────────────────────────────────────────────────────
// Vision Section
// ─────────────────────────────────────────────────────────────────────────────

export interface PVMBlock {
  label?: string
  text?: string
}

export interface VisionSection {
  _id: 'visionSection'
  _type: 'visionSection'
  headerImage?: SanityImage
  heroHeading?: string
  heroSubtext?: string
  poeticQuote?: string
  kicker?: string
  heading?: string
  bodyBlocks: PortableTextBlock[]
  directorImage?: SanityImage
  directorName?: string
  directorTitle?: string
  directorQuote?: string
  purpose?: PVMBlock
  vision?: PVMBlock
  mission?: PVMBlock
}

// ─────────────────────────────────────────────────────────────────────────────
// Beliefs
// ─────────────────────────────────────────────────────────────────────────────

export interface BeliefsIntro {
  _id: 'beliefsIntro'
  _type: 'beliefsIntro'
  kicker?: string
  heading?: string
  intro?: string
}

export interface Belief {
  _id: string
  _type: 'belief'
  orderRank?: string
  number?: number
  title: string
  body?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Pathways
// ─────────────────────────────────────────────────────────────────────────────

export interface PathwaysIntro {
  _id: 'pathwaysIntro'
  _type: 'pathwaysIntro'
  kicker?: string
  heading?: string
  subtext?: string
}

export interface Pathway {
  _id: string
  _type: 'pathway'
  orderRank?: string
  audienceLabel: string
  title: string
  description?: string
  image?: SanityImage
}

// ─────────────────────────────────────────────────────────────────────────────
// Gap Section
// ─────────────────────────────────────────────────────────────────────────────

export interface GapStat {
  _key: string
  value: string
  suffix?: string
  label: string
  description?: string
}

export interface GapSection {
  _id: 'gapSection'
  _type: 'gapSection'
  kicker?: string
  heading?: string
  intro: PortableTextBlock[]
  stats: GapStat[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Domains
// ─────────────────────────────────────────────────────────────────────────────

export interface DomainsIntro {
  _id: 'domainsIntro'
  _type: 'domainsIntro'
  headerImage?: SanityImage
  featureImage?: SanityImage
  kicker?: string
  heading?: string
  subtext?: string
}

export interface DomainLevel {
  _key: string
  levelLabel?: string
  title?: string
  description?: string
}

export interface Domain {
  _id: string
  _type: 'domain'
  orderRank?: string
  number?: number
  name: string
  partnerName?: string
  simulatorName?: string
  status: 'live' | 'phase2'
  levels: DomainLevel[]
  outcomes: string[]
  teaserImage?: SanityImage
  detailImage?: SanityImage
}

// ─────────────────────────────────────────────────────────────────────────────
// Summit
// ─────────────────────────────────────────────────────────────────────────────

export interface GetInvolvedCard {
  _key: string
  audience?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaLink?: string
}

export interface Summit {
  _id: 'summit'
  _type: 'summit'
  headerImage?: SanityImage
  heading?: string
  homepageTeaser?: string
  body: PortableTextBlock[]
  pullQuote?: string
  statChips: string[]
  getInvolvedCards: GetInvolvedCard[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Journey
// ─────────────────────────────────────────────────────────────────────────────

export interface JourneyIntro {
  _id: 'journeyIntro'
  _type: 'journeyIntro'
  headerImage?: SanityImage
  kicker?: string
  heading?: string
}

export interface JourneyStage {
  _id: string
  _type: 'journeyStage'
  orderRank?: string
  number?: number
  name: string
  durationLabel?: string
  description?: string
  icon?: SanityImage
}

// ─────────────────────────────────────────────────────────────────────────────
// Ecosystem / Partners
// ─────────────────────────────────────────────────────────────────────────────

export interface EcosystemIntro {
  _id: 'ecosystemIntro'
  _type: 'ecosystemIntro'
  headerImage?: SanityImage
  kicker?: string
  heading?: string
  subtext?: string
}

export interface PartnerCategory {
  _id: string
  _type: 'partnerCategory'
  orderRank?: string
  name: string
  description?: string
}

export interface CurrentPartner {
  _id: string
  _type: 'currentPartner'
  name: string
  type?: string
  description?: string
  logo?: SanityImage
  /** Expanded reference — only present when GROQ query uses `category->` */
  category?: PartnerCategory
  showInHomeMarquee?: boolean
  showInEcosystemGrid?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Advisory Board
// ─────────────────────────────────────────────────────────────────────────────

export interface AdvisoryIntro {
  _id: 'advisoryIntro'
  _type: 'advisoryIntro'
  headerImage?: SanityImage
  kicker?: string
  heading?: string
}

export interface AdvisoryMember {
  _id: string
  _type: 'advisoryMember'
  orderRank?: string
  number?: number
  name: string
  roleOrg?: string
  bio: PortableTextBlock[]
  headshot?: SanityImage
  /** Single letter shown when no headshot is available. */
  initial?: string
  status: 'member' | 'announcing'
  /** Only populated when status === 'announcing'. */
  categoryLabel?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Apply CTA
// ─────────────────────────────────────────────────────────────────────────────

export interface ApplyCta {
  _id: 'applyCta'
  _type: 'applyCta'
  heading?: string
  body?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Form Configs
// ─────────────────────────────────────────────────────────────────────────────

export interface SchoolFormConfig {
  _id: 'schoolFormConfig'
  _type: 'schoolFormConfig'
  // Labels
  labelSchoolName?: string
  labelContactPerson?: string
  labelDesignation?: string
  labelEmail?: string
  labelContactNumber?: string
  labelCity?: string
  labelState?: string
  labelBoard?: string
  labelGrades?: string
  labelStudentRange?: string
  labelTimeline?: string
  labelPrograms?: string
  labelMessage?: string
  // Options
  designationOptions: string[]
  boardOptions: string[]
  gradesOptions: string[]
  studentRangeOptions: string[]
  timelineOptions: string[]
  programOptions: string[]
}

export interface PartnerFormConfig {
  _id: 'partnerFormConfig'
  _type: 'partnerFormConfig'
  // Labels
  labelOrgName?: string
  labelContactPerson?: string
  labelDesignation?: string
  labelEmail?: string
  labelContactNumber?: string
  labelCity?: string
  labelState?: string
  labelOrgType?: string
  labelInterestedIn?: string
  labelMessage?: string
  // Options
  designationOptions: string[]
  orgTypeOptions: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Enquiry (Lead)
// ─────────────────────────────────────────────────────────────────────────────

export interface Enquiry {
  _id: string
  _type: 'enquiry'
  type: 'school' | 'partner'
  submittedAt: string // ISO datetime string
  // Common
  contactPerson?: string
  designation?: string
  email?: string
  contactNumber?: string
  city?: string
  state?: string
  message?: string
  // School-specific
  schoolName?: string
  board?: string
  grades?: string[]
  studentRange?: string
  timeline?: string
  programs?: string[]
  // Partner-specific
  orgName?: string
  orgType?: string
  interestedIn?: string
}
