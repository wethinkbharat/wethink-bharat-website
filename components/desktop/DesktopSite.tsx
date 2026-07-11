'use client'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'

/* ─────────────────────────────────────────────────────────
   TYPES & CONSTANTS
───────────────────────────────────────────────────────── */
type Route = 'home' | 'vision' | 'domains' | 'summit' | 'ecosystem' | 'advisory' | 'journey' | 'contact'

interface AdvisoryMemberData {
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

interface CurrentPartnerData {
  _id: string
  name: string
  type?: string
  description?: string
  logoUrl?: string
  categoryName?: string
  showInHomeMarquee?: boolean
  showInEcosystemGrid?: boolean
}

interface HeroData {
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

interface VisionSectionData {
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

interface BeliefsIntroData {
  kicker?: string
  heading?: string
  intro?: string
}

interface BeliefData {
  number: number
  title: string
  body: string
}

interface GapStatData {
  value: string
  suffix: string
  label: string
  description: string
}

interface GapSectionData {
  kicker?: string
  heading?: string
  intro?: string
  stats: GapStatData[]
}

interface PathwaysIntroData {
  kicker?: string
  heading?: string
  subtext?: string
}

interface PathwayData {
  audienceLabel: string
  title: string
  description: string
  imageUrl?: string
}

interface DomainsIntroData {
  kicker?: string
  heading?: string
  subtext?: string
  featureImageUrl?: string
}

interface DomainLevelData {
  levelLabel: string
  title: string
  description: string
}

interface DomainData {
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

interface GetInvolvedCardData {
  audience: string
  title: string
  description: string
  ctaLabel: string
  ctaLink?: string
}

interface SummitData {
  heading?: string
  body?: string
  pullQuote?: string
  statChips: string[]
  getInvolvedCards: GetInvolvedCardData[]
}

interface JourneyStageData {
  number: number
  name: string
  durationLabel: string
  description: string
  iconUrl?: string
}

interface JourneyIntroData {
  kicker?: string
  heading?: string
}

interface ApplyCtaData {
  heading?: string
  body?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
}

interface FooterLinkData {
  label: string
  link: string
}

interface SiteConfigData {
  primaryCtaLabel?: string
  footerTagline?: string
  copyrightText?: string
  footerExploreLinks: FooterLinkData[]
  footerConnectLinks: FooterLinkData[]
}

interface Props {
  onSchoolFormOpen: () => void
  onPartnerFormOpen: () => void
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
  headerImages?: {
    vision?: string
    domains?: string
    ecosystem?: string
    advisory?: string
    journey?: string
    summit?: string
  }
}

const FF = "'League Spartan', system-ui, sans-serif"
const BG = '#3B1407'
const S1 = '#2A0E05'
const S2 = '#340F05'
const GOLD = '#DEC078'
const TP = '#F5EEE2'
const TS = '#E0CEBD'
const BORDER = '1px solid rgba(222,192,120,.14)'

function goldLast(text: string, fromWord: string): React.ReactNode {
  const i = text.toLowerCase().indexOf(fromWord.toLowerCase())
  if (i < 0) return text
  return <>{text.slice(0, i)}<span style={{ color: GOLD }}>{text.slice(i)}</span></>
}

/* ─────────────────────────────────────────────────────────
   KEYFRAME CSS INJECTION
───────────────────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes wtbSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes wtbPulse { 0%,100% { opacity:1; } 50% { opacity:.35; } }
@keyframes wtbBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }
@keyframes wtbMarquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
[data-reveal-child] {
  opacity: 0;
  transform: translate(var(--rev-tx, 0px), var(--rev-ty, 32px));
  transition: opacity .7s ease-out, transform .8s cubic-bezier(.22,.61,.36,1);
}
[data-reveal-child].rev-visible { opacity: 1; transform: none; }
`

/* ─────────────────────────────────────────────────────────
   JOURNEY ORBIT STAGES
───────────────────────────────────────────────────────── */
const JOURNEY_STAGES = [
  { key: '01 · OPEN',   title: '2 days of immersion',      dur: '2 days',    body: 'Gamified exposure to a real domain before any training begins — so students choose from experience, not guesswork.',          icon: 'ti-compass',     iconUrl: undefined as string | undefined, bg: 'linear-gradient(165deg,#2A0E05,#200A03)' },
  { key: '02 · LIVE',   title: '2 weeks, one real brief',  dur: '2 weeks',   body: 'A live industry project with a real deadline and a real client — the way work actually happens.',                             icon: 'ti-briefcase',   iconUrl: undefined as string | undefined, bg: 'linear-gradient(165deg,#3B1407,#2A0E05)' },
  { key: '03 · CIRCLE', title: 'Ongoing mentorship',       dur: 'Continuous',body: 'Domain, Process, Peer, and Master Mentors support every student at every stage of the journey.',                             icon: 'ti-users',       iconUrl: undefined as string | undefined, bg: 'linear-gradient(165deg,#52180B,#371106)' },
  { key: '04 · SUMMIT', title: 'The national stage',       dur: '4× / year', body: 'Students pitch their work to a jury of industry partners — four times a year, in front of the country.',                    icon: 'ti-microphone',  iconUrl: undefined as string | undefined, bg: 'linear-gradient(165deg,#6E2412,#48160A)' },
  { key: '05 · IMPRINT',title: 'Proof for life',           dur: 'Permanent', body: 'A permanent, verifiable Digital Footprint of everything they built, powered by iNEXT.',                                     icon: 'ti-certificate', iconUrl: undefined as string | undefined, bg: 'linear-gradient(165deg,#8C3623,#5A1E10)' },
]


/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '11.5px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.22em', margin: '0 0 14px' }}>
      {children}
    </p>
  )
}

function HeroDecorRing({ speed = '60s', size = 'clamp(180px,24vw,320px)' }: { speed?: string; size?: string }) {
  return (
    <div style={{
      position: 'absolute', right: '6%', top: '16%', width: size, height: size,
      border: '1px dashed rgba(222,192,120,.16)', borderRadius: '50%', zIndex: 1,
      pointerEvents: 'none', animation: `wtbSpin ${speed} linear infinite`,
    }} />
  )
}

function PageHeroBg({ imageUrl }: { imageUrl?: string }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: S1 }} />
      {imageUrl && (
        <img src={imageUrl} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 1 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(105deg,rgba(36,10,3,.92) 0%,rgba(36,10,3,.65) 40%,rgba(36,10,3,.28) 74%,rgba(36,10,3,.1) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top,rgba(36,10,3,.95) 2%,rgba(36,10,3,0) 46%)', pointerEvents: 'none' }} />
    </>
  )
}

/* Spring button wrapper — adds mouse scale effect */
function SpringBtn({ onClick, style, children, className }: {
  onClick?: () => void
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
}) {
  const [scale, setScale] = useState(1)
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={() => setScale(1.04)}
      onMouseLeave={() => setScale(1)}
      onMouseDown={() => setScale(0.95)}
      onMouseUp={() => setScale(1.04)}
      style={{
        ...style,
        transform: `scale(${scale})`,
        transition: 'transform .25s cubic-bezier(.34,1.56,.64,1)',
      }}
    >
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export function DesktopSite({ onSchoolFormOpen, onPartnerFormOpen, logoUrl, hero, advisoryMembers, currentPartners, visionSection, beliefsIntro, beliefs, gapSection, pathwaysIntro, pathways, domainsIntro, domains, summit, journeyStages, journeyIntro, applyCta, siteConfig, headerImages }: Props) {
  /* ── routing ─────────────────────────────────────────── */
  const [currentRoute, setCurrentRoute] = useState<Route>('home')

  /* ── ui state ────────────────────────────────────────── */
  const [menuOpen, setMenuOpen] = useState(false)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [backToTopVisible, setBackToTopVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  /* ── journey orbit state ─────────────────────────────── */
  const [orbitFrontIdx, setOrbitFrontIdx] = useState(0)
  const orbitAngleRef = useRef(0)
  const orbitTargetRef = useRef(0)
  const orbitRafRef = useRef<number | null>(null)
  const orbitStageRef = useRef<HTMLDivElement>(null)
  const orbitCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])
  const orbitFrontRef = useRef(0)

  /* ── scroll progress bar ─────────────────────────────── */
  const progressBarRef = useRef<HTMLDivElement>(null)

  /* ── cursor glow ─────────────────────────────────────── */
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const cursorTargetX = useRef(0)
  const cursorTargetY = useRef(0)
  const cursorCurrentX = useRef(0)
  const cursorCurrentY = useRef(0)
  const cursorRafId = useRef<number | null>(null)
  const cursorVisible = useRef(false)

  /* ── keyframe injection ──────────────────────────────── */
  useEffect(() => {
    if (typeof document === 'undefined') return
    const id = 'wtb-keyframes'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = KEYFRAMES
      document.head.appendChild(style)
    }
  }, [])

  /* ── touch detection ─────────────────────────────────── */
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer:coarse)').matches)
  }, [])

  /* ── reveal animations ───────────────────────────────── */
  const armReveal = useCallback(() => {
    const directions = [
      'translateY(32px)',
      'translateX(-46px)',
      'translateX(46px)',
      'translateY(32px)',
    ]
    const sections = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const section = entry.target as HTMLElement
          const children = Array.from(section.children) as HTMLElement[]
          children.forEach((child, ci) => {
            child.setAttribute('data-reveal-child', '')
            const dir = directions[ci % directions.length]
            child.style.setProperty('--rev-tx', dir.startsWith('translateX') ? dir.replace('translateX(', '').replace(')', '') : '0px')
            child.style.setProperty('--rev-ty', dir.startsWith('translateY') ? dir.replace('translateY(', '').replace(')', '') : '0px')
            child.style.opacity = '0'
            if (dir.startsWith('translateY')) {
              child.style.transform = `translateY(32px)`
            } else if (dir.includes('-46px')) {
              child.style.transform = `translateX(-46px)`
            } else {
              child.style.transform = `translateX(46px)`
            }
            child.style.transition = `opacity .7s ease-out ${ci * 80}ms, transform .8s cubic-bezier(.22,.61,.36,1) ${ci * 80}ms`
            setTimeout(() => {
              child.style.opacity = '1'
              child.style.transform = 'none'
            }, 50 + ci * 80)
          })
          obs.unobserve(section)
        })
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )
    sections.forEach((el) => {
      /* Pre-hide direct children so they're already invisible before the
         observer fires — prevents visible→hidden flash on scroll */
      Array.from(el.children).forEach((child) => {
        const c = child as HTMLElement
        if (c.style.position !== 'absolute' && c.style.position !== 'fixed') {
          c.style.opacity = '0'
        }
      })
      obs.observe(el)
    })
    return obs
  }, [])

  /* ── count-up ────────────────────────────────────────── */
  const armCountUp = useCallback(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-count]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const raw = el.dataset.count ?? '0'
          const isRange = raw.includes('–')
          if (isRange) { el.textContent = raw; obs.unobserve(el); return }
          const target = parseFloat(raw)
          if (isNaN(target)) { el.textContent = raw; obs.unobserve(el); return }
          const suffix = raw.replace(/[\d.]/g, '')
          const start = performance.now()
          const dur = 900
          const step = (now: number) => {
            const progress = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.round(eased * target) + suffix
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          obs.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    els.forEach((el) => obs.observe(el))
    return obs
  }, [])

  /* ── navigate function ───────────────────────────────── */
  const navigate = useCallback((route: Route) => {
    setCurrentRoute(route)
    window.location.hash = route
    window.scrollTo({ top: 0, behavior: 'instant' })
    setTimeout(() => {
      armReveal()
      armCountUp()
    }, 50)
  }, [armReveal, armCountUp])

  /* ── initial hash read + hashchange ─────────────────── */
  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.replace('#', '')
      const validRoutes: Route[] = ['home', 'vision', 'domains', 'summit', 'ecosystem', 'advisory', 'journey', 'contact']
      if (hash === 'apply') {
        setCurrentRoute('contact')
      } else if (validRoutes.includes(hash as Route)) {
        setCurrentRoute(hash as Route)
      }
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  /* ── arm reveal + countup on mount + route change ────── */
  useEffect(() => {
    const revObs = armReveal()
    const countObs = armCountUp()
    return () => {
      revObs?.disconnect()
      countObs?.disconnect()
    }
  }, [currentRoute, armReveal, armCountUp])

  /* ── scroll: progress bar + header + back-to-top ─────── */
  useEffect(() => {
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const y = window.scrollY
        const max = document.body.scrollHeight - window.innerHeight
        if (progressBarRef.current) {
          const ratio = max > 0 ? y / max : 0
          progressBarRef.current.style.transform = `scaleX(${ratio})`
        }
        setHeaderScrolled(y > 40)
        setBackToTopVisible(y > 600)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── cursor glow ─────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFine = window.matchMedia('(pointer:fine)').matches
    if (!isFine) return

    const el = cursorGlowRef.current
    if (!el) return

    const tick = () => {
      cursorCurrentX.current += (cursorTargetX.current - cursorCurrentX.current) * 0.12
      cursorCurrentY.current += (cursorTargetY.current - cursorCurrentY.current) * 0.12
      if (el) {
        el.style.left = `${cursorCurrentX.current - 230}px`
        el.style.top = `${cursorCurrentY.current - 230}px`
      }
      cursorRafId.current = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorTargetX.current = e.clientX
      cursorTargetY.current = e.clientY
      if (!cursorVisible.current) {
        cursorVisible.current = true
        if (el) el.style.opacity = '1'
        cursorRafId.current = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (cursorRafId.current) cancelAnimationFrame(cursorRafId.current)
    }
  }, [])

  /* ── advisory flip ───────────────────────────────────── */
  const toggleFlip = (idx: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  /* ── journey orbit ───────────────────────────────────── */
  const selectOrbitCard = useCallback((idx: number) => {
    const N = 5
    const rawTarget = -idx * (2 * Math.PI / N)
    let t = rawTarget
    const curr = orbitAngleRef.current
    while (t - curr > Math.PI) t -= 2 * Math.PI
    while (t - curr < -Math.PI) t += 2 * Math.PI
    orbitTargetRef.current = t
  }, [])

  useEffect(() => {
    if (currentRoute !== 'journey') {
      if (orbitRafRef.current) { cancelAnimationFrame(orbitRafRef.current); orbitRafRef.current = null }
      return
    }
    const N = 5
    const tick = () => {
      const diff = orbitTargetRef.current - orbitAngleRef.current
      const normDiff = ((diff % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI
      if (Math.abs(normDiff) > 0.001) {
        orbitAngleRef.current += normDiff * 0.12
      } else {
        orbitAngleRef.current = orbitTargetRef.current
      }
      const stage = orbitStageRef.current
      if (stage) {
        const R = Math.min(stage.offsetWidth * 0.3, 540)
        let maxNz = -1; let frontIdx = 0
        for (let i = 0; i < N; i++) {
          const card = orbitCardRefs.current[i]
          if (!card) continue
          const a = orbitAngleRef.current + i * (2 * Math.PI / N)
          const x = Math.sin(a) * R
          const cosVal = Math.cos(a)
          const nz = (cosVal + 1) / 2
          if (nz > maxNz) { maxNz = nz; frontIdx = i }
          const scale = 0.6 + nz * 0.46
          const opacity = 0.24 + nz * 0.76
          const blur = nz < 0.5 ? (1 - nz * 2) * 1.2 : 0
          card.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), -50%) scale(${scale.toFixed(4)})`
          card.style.opacity = opacity.toFixed(4)
          card.style.filter = blur > 0.02 ? `blur(${blur.toFixed(2)}px)` : 'none'
          card.style.zIndex = String(Math.round(nz * 100))
          card.style.borderColor = `rgba(222,192,120,${(0.18 + nz * 0.26).toFixed(2)})`
          card.style.pointerEvents = nz > 0.3 ? 'auto' : 'none'
        }
        if (frontIdx !== orbitFrontRef.current) {
          orbitFrontRef.current = frontIdx
          setOrbitFrontIdx(frontIdx)
        }
      }
      orbitRafRef.current = requestAnimationFrame(tick)
    }
    orbitRafRef.current = requestAnimationFrame(tick)
    return () => { if (orbitRafRef.current) cancelAnimationFrame(orbitRafRef.current) }
  }, [currentRoute])

  /* ── normalized advisory data (Sanity-only, no hardcoded fallback) ── */
  const namedMembers = useMemo(() =>
    (advisoryMembers ?? [])
      .filter(m => m.status === 'member')
      .map((m, i) => ({
        name: m.name,
        titleLine: m.roleOrg ?? '',
        bio: m.bio,
        headshotUrl: m.headshotUrl,
        initial: m.initial ?? m.name?.[0] ?? '?',
        number: m.number ?? i + 1,
      }))
  , [advisoryMembers])

  const tbaSeats = useMemo(() =>
    (advisoryMembers ?? [])
      .filter(m => m.status === 'announcing')
      .map(m => ({
        letter: m.initial ?? m.name?.[0] ?? m.categoryLabel?.[0] ?? '?',
        category: m.categoryLabel ?? 'Announcing Soon',
      }))
  , [advisoryMembers])

  /* ── normalized partner data ─────────────────────────── */
  const partnerCards = useMemo(() => {
    if (currentPartners && currentPartners.length > 0) return currentPartners
    return [
      { _id: 'nasscom', name: 'NASSCOM', type: 'Industry partner', description: 'Entrepreneurship domain — real startup mentors, live briefs, and jury presence at the WeThink Summit.', logoUrl: undefined, categoryName: '10,000 Startups' },
      { _id: 'brut', name: 'Brut', type: 'Industry partner', description: 'Media & Communication domain — editorial mentorship and the craft of modern digital storytelling.', logoUrl: undefined, categoryName: 'Digital media & storytelling' },
      { _id: 'canva', name: 'Canva', type: 'Industry partner', description: 'Design & Innovation domain — design tools, creative mentorship, and visual thinking for every student.', logoUrl: undefined, categoryName: 'Design & visual communication' },
    ] as CurrentPartnerData[]
  }, [currentPartners])

  /* ── merge Sanity journey stages into orbit shape ────── */
  const activeJourneyStages = useMemo(() => {
    const ICONS = ['ti-compass', 'ti-briefcase', 'ti-users', 'ti-microphone', 'ti-certificate']
    const BGS = [
      'linear-gradient(165deg,#2A0E05,#200A03)',
      'linear-gradient(165deg,#3B1407,#2A0E05)',
      'linear-gradient(165deg,#52180B,#371106)',
      'linear-gradient(165deg,#6E2412,#48160A)',
      'linear-gradient(165deg,#8C3623,#5A1E10)',
    ]
    if (journeyStages && journeyStages.length > 0) {
      return journeyStages.map((s, i) => ({
        key: `${String(s.number).padStart(2, '0')} · ${s.name}`,
        title: s.durationLabel,
        dur: s.durationLabel,
        body: s.description,
        icon: ICONS[i] ?? 'ti-compass',
        iconUrl: s.iconUrl,
        bg: BGS[i] ?? BGS[0],
      }))
    }
    return JOURNEY_STAGES
  }, [journeyStages])

  const NAV_LINKS: { label: string; route: Route }[] = [
    { label: 'Vision', route: 'vision' },
    { label: 'Domains', route: 'domains' },
    { label: 'Ecosystem', route: 'ecosystem' },
    { label: 'Advisory', route: 'advisory' },
    { label: 'Journey', route: 'journey' },
    { label: 'Summit', route: 'summit' },
  ]

  /* ─────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────── */
  return (
    <div style={{ fontFamily: FF, background: BG, color: TP, minHeight: '100vh', position: 'relative' }}>

      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        style={{
          position: 'fixed', width: '460px', height: '460px',
          background: 'radial-gradient(circle 230px, rgba(222,192,120,.075) 0%, transparent 100%)',
          mixBlendMode: 'screen', zIndex: 90, pointerEvents: 'none',
          opacity: 0, transition: 'opacity .4s ease',
        }}
      />

      {/* Scroll progress bar */}
      <div
        ref={progressBarRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 410,
          background: 'linear-gradient(90deg,#8C3623,#DEC078)',
          transformOrigin: 'left', transform: 'scaleX(0)',
          pointerEvents: 'none',
        }}
      />

      {/* ══════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: headerScrolled ? 'rgba(36,10,3,.92)' : 'rgba(36,10,3,.55)',
        backdropFilter: 'blur(14px)',
        borderBottom: headerScrolled ? '1px solid rgba(222,192,120,.24)' : '1px solid rgba(222,192,120,.1)',
        boxShadow: headerScrolled ? '0 4px 24px rgba(0,0,0,.3)' : 'none',
        transition: 'background .3s ease, border-color .3s ease, box-shadow .3s ease',
      }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px clamp(24px,6vw,64px)', maxWidth: '1360px', margin: '0 auto',
        }}>
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {logoUrl
              ? <img src={logoUrl} alt="WeThink Bharat" style={{ height: '36px', display: 'block', objectFit: 'contain' }} />
              : <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: FF }}><span style={{ color: TP }}>wethink</span><span style={{ color: GOLD }}>bharat</span></span>
            }
          </button>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l.route}
                onClick={() => navigate(l.route)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '14px',
                  color: currentRoute === l.route ? GOLD : TS,
                  fontWeight: 500, letterSpacing: '.04em', fontFamily: FF,
                  padding: '4px 0',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right CTA */}
          <SpringBtn
            onClick={onSchoolFormOpen}
            style={{
              borderRadius: '999px', fontSize: '12.5px', padding: '9px 20px',
              background: GOLD, color: BG, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontFamily: FF,
            }}
          >
            {siteConfig?.primaryCtaLabel ?? 'Bring to my school'}
          </SpringBtn>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(36,10,3,.97)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '32px',
        }}>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: TP, fontSize: '32px', lineHeight: 1 }}
          >
            ×
          </button>
          {NAV_LINKS.map((l) => (
            <button
              key={l.route}
              onClick={() => { setMenuOpen(false); navigate(l.route) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '30px', fontWeight: 800, color: TP, fontFamily: FF }}
            >
              {l.label}
            </button>
          ))}
          <SpringBtn
            onClick={() => { setMenuOpen(false); onSchoolFormOpen() }}
            style={{
              borderRadius: '999px', fontSize: '15px', padding: '14px 32px',
              background: GOLD, color: BG, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontFamily: FF, marginTop: '16px',
            }}
          >
            {siteConfig?.primaryCtaLabel ?? 'Bring to my school'}
          </SpringBtn>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          HOME ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'home' && (
        <>
          {/* CINEMATIC HERO */}
          <section style={{
            position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
            overflow: 'hidden', padding: '140px clamp(24px,6vw,64px) 90px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={hero?.heroImageUrl} />
            <div style={{ position: 'absolute', right: '-160px', top: '6%', width: '560px', height: '560px', border: '1px solid rgba(222,192,120,.12)', borderRadius: '50%', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: '40px', top: '20%', width: '320px', height: '320px', border: '1px dashed rgba(222,192,120,.16)', borderRadius: '50%', zIndex: 1, pointerEvents: 'none', animation: 'wtbSpin 60s linear infinite' }} />
            <div style={{ position: 'absolute', right: '150px', top: '33%', width: '130px', height: '130px', border: '1px solid rgba(140,54,35,.5)', borderRadius: '50%', zIndex: 1, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(222,192,120,.1)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '6px 14px', marginBottom: '28px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GOLD, display: 'inline-block', animation: 'wtbPulse 2s infinite' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: GOLD, letterSpacing: '.06em' }}>{hero?.seasonBanner ?? 'Season 1 · school nominations open'}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(40px,7vw,98px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.98, color: TP, margin: '0 0 28px', maxWidth: '900px', fontFamily: FF }}>
                {hero?.headlineSpans?.length
                  ? hero.headlineSpans.map((s, i) =>
                      s.gold ? <span key={i} style={{ color: GOLD }}>{s.text}</span> : s.text
                    )
                  : <>India&apos;s students deserve to{' '}<span style={{ color: GOLD }}>discover</span>{' '}before they decide.</>
                }
              </h1>

              <p style={{ fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.7, color: TS, maxWidth: '560px', margin: '0 0 36px' }}>
                {hero?.subcopy ?? 'WeThink Bharat brings real industry into schools — through domain simulators, live projects, and a permanent digital footprint that belongs to every student forever.'}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <SpringBtn
                  onClick={onSchoolFormOpen}
                  style={{
                    background: GOLD, color: BG, padding: '16px 30px',
                    borderRadius: '999px', fontSize: '15px', fontWeight: 600,
                    border: 'none', cursor: 'pointer', fontFamily: FF,
                  }}
                >
                  {hero?.primaryCtaLabel ?? 'Bring WeThink to my school ↗'}
                </SpringBtn>
                <button
                  onClick={() => navigate('domains')}
                  style={{
                    background: 'rgba(52,15,5,.4)', color: TP,
                    border: '1px solid rgba(224,206,189,.3)', padding: '16px 30px',
                    borderRadius: '999px', fontSize: '15px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: FF,
                  }}
                >
                  {hero?.secondaryCtaLabel ?? 'Explore the domains'}
                </button>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(222,192,120,.08)', borderRadius: '999px', padding: '6px 16px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GOLD, display: 'inline-block', flexShrink: 0, animation: 'wtbPulse 2s infinite' }} />
                <span style={{ fontSize: '13px', color: TS }}>
                  {hero?.domainsStrip ?? '3 industry domains live now — Entrepreneurship, Media & Design'}
                </span>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 3, textAlign: 'center', color: 'rgba(224,206,189,.5)',
                fontSize: '12px', letterSpacing: '.1em', animation: 'wtbBob 2s ease-in-out infinite',
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: FF,
              }}
            >
              <div>{hero?.scrollCueText ?? 'Scroll to enter'}</div>
              <div style={{ fontSize: '18px', marginTop: '4px' }}>↓</div>
            </button>
          </section>

          {/* PATHWAYS BAND */}
          <section id="pathways" data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: 0, fontFamily: FF }}>
                {goldLast(pathwaysIntro?.heading ?? 'Capability across the whole ecosystem', 'ecosystem')}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, maxWidth: '380px', margin: 0 }}>
                {pathwaysIntro?.subtext ?? 'We don\'t build students in isolation. We build the educators who guide them and the schools that hold it all together.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '20px' }}>
              {(pathways && pathways.length > 0 ? pathways.map((p, i) => ({
                icon: ['ti-books', 'ti-chalkboard', 'ti-building-community'][i] ?? 'ti-books',
                label: p.audienceLabel,
                title: p.title,
                body: p.description,
                imageUrl: p.imageUrl,
              })) : [
                { icon: 'ti-books', label: 'For students', title: 'Discover before you decide', body: 'Simulated worlds, real briefs, live mentors, and a permanent footprint. Before choosing a path, students experience it.', imageUrl: undefined as string | undefined },
                { icon: 'ti-chalkboard', label: 'For educators', title: 'Teach what industry needs', body: 'Structured programs, industry-designed content, and an educator community — built to make experiential learning easy to run.', imageUrl: undefined as string | undefined },
                { icon: 'ti-building-community', label: 'For schools', title: 'Run it at scale, for years', body: 'A full institutional program — not a one-day workshop. WeThink Bharat integrates into the school calendar and grows every year.', imageUrl: undefined as string | undefined },
              ]).map((c) => (
                <div key={c.label} style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(222,192,120,.16)', background: S1 }}>
                  <div style={{ height: '300px', background: S2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {c.imageUrl
                      ? <img src={c.imageUrl} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                      : <span style={{ fontSize: '48px', color: 'rgba(222,192,120,.2)' }}>◈</span>
                    }
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(36,10,3,.8) 0%,rgba(36,10,3,0) 60%)' }} />
                  </div>
                  <div style={{ padding: '24px 24px 26px' }}>
                    <i className={`ti ${c.icon}`} style={{ fontSize: '26px', color: GOLD, display: 'block', marginBottom: '12px' }} />
                    <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.16em', margin: '0 0 8px' }}>{c.label}</p>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: TP, margin: '0 0 10px', fontFamily: FF }}>{c.title}</h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: TS, margin: 0 }}>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PARTNER MARQUEE */}
          {(() => {
            const homeMarqueePartners = partnerCards.filter((p) => p.showInHomeMarquee)
            if (homeMarqueePartners.length === 0) return null
            return (
              <section style={{ padding: 'clamp(28px,4vw,44px) 0', background: BG, borderBottom: BORDER, overflow: 'hidden' }}>
                <div style={{ display: 'flex', width: 'max-content', animation: 'wtbMarquee 30s linear infinite' }}>
                  {[...Array(2)].map((_, t) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '48px', paddingRight: '48px' }}>
                      {homeMarqueePartners.map((p) => (
                        <div key={`${t}-${p._id}`} style={{ width: 'clamp(112px,12vw,152px)', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.72 }}>
                          {p.logoUrl
                            ? <img src={p.logoUrl} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(320deg)' }} />
                            : <span style={{ fontSize: '16px', fontWeight: 700, color: TP, letterSpacing: '.08em', fontFamily: FF }}>{p.name}</span>
                          }
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )
          })()}

          {/* IMPACT STATS */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}>
              <div>
                <SectionLabel>{gapSection?.kicker ?? 'The gap we close'}</SectionLabel>
                <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 20px', fontFamily: FF }}>
                  {goldLast(gapSection?.heading ?? 'Educated unemployment begins with uninformed choices.', 'uninformed choices')}
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, margin: 0 }}>
                  {gapSection?.intro ?? "Millions of graduates enter the workforce unprepared — not because they aren't capable, but because they were never given the chance to explore what they were capable of."}
                </p>
              </div>
              <div>
                {(gapSection?.stats && gapSection.stats.length > 0 ? gapSection.stats : [
                  { value: '80', suffix: '%', label: 'Graduates are industry-unready', description: 'Most Indian graduates lack the applied, real-world skills industry needs on Day 1.' },
                  { value: '93', suffix: '%', label: 'Students choose without experiencing', description: 'Students pick a stream on secondhand advice — never having lived the domain.' },
                  { value: '14–18', suffix: '', label: 'The window that changes everything', description: 'The last moment before the fork — real experience here changes everything.' },
                ]).map((s) => (
                  <div key={s.label} style={{ borderTop: '1px solid rgba(222,192,120,.2)', padding: '24px 0', display: 'flex', alignItems: 'center', gap: '22px' }}>
                    <div
                      data-count={s.value + s.suffix}
                      style={{ fontSize: 'clamp(52px,6.4vw,84px)', fontWeight: 800, color: GOLD, lineHeight: 0.85, letterSpacing: '-0.03em', fontFamily: FF, flexShrink: 0 }}
                    >
                      {s.value}{s.suffix}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: TP, marginBottom: '6px' }}>{s.label}</div>
                      <div style={{ fontSize: '13.5px', color: TS, lineHeight: 1.55 }}>{s.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DOMAINS TEASER */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <div>
                <SectionLabel>Industry domains</SectionLabel>
                <h2 style={{ fontSize: 'clamp(28px,3.6vw,48px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
                  Domains you <span style={{ color: GOLD }}>experience</span>, not just study.
                </h2>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(222,192,120,.08)', border: '1px solid rgba(222,192,120,.2)', borderRadius: '999px', padding: '5px 14px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD, display: 'inline-block', animation: 'wtbPulse 2s infinite' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: GOLD }}>3 domains live, expanding to 6 in Phase 2</span>
                </div>
              </div>
              <button
                onClick={() => navigate('domains')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: TP, fontFamily: FF, borderBottom: `1.5px solid ${GOLD}`, paddingBottom: '3px' }}
              >
                Explore domains ↗
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '18px' }}>
              {(domains && domains.length > 0 ? domains.map((d) => ({
                num: String(d.number).padStart(2, '0'),
                label: d.name,
                partner: d.partnerName,
                imageUrl: d.teaserImageUrl,
              })) : [
                { num: '01', label: 'Entrepreneurship', partner: 'NASSCOM 10,000 Startups', imageUrl: undefined as string | undefined },
                { num: '02', label: 'Media & Communication', partner: 'Brut', imageUrl: undefined as string | undefined },
                { num: '03', label: 'Design & Innovation', partner: 'Canva', imageUrl: undefined as string | undefined },
              ]).map((d) => (
                <button
                  key={d.num}
                  onClick={() => navigate('domains')}
                  style={{
                    textAlign: 'left',
                    border: '1px solid rgba(222,192,120,.16)',
                    borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                    background: S2, display: 'block', padding: 0,
                  }}
                >
                  <div style={{ aspectRatio: '4/3', background: BG, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {d.imageUrl
                      ? <img src={d.imageUrl} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                      : <span style={{ fontSize: '40px', color: 'rgba(222,192,120,.15)' }}>◈</span>
                    }
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(36,10,3,.85) 0%,rgba(36,10,3,0) 60%)' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(36,10,3,.7)', border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: GOLD }}>{d.num}</div>
                  </div>
                  <div style={{ padding: '20px 20px 22px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 8px' }}>{d.partner}</p>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: 0, fontFamily: FF }}>{d.label}</h3>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* SUMMIT TEASER */}
          <section data-reveal style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,6vw,64px)', borderBottom: BORDER, background: S1 }}>
            <div style={{
              border: '1px solid rgba(222,192,120,.45)', borderRadius: '24px',
              padding: 'clamp(40px,6vw,76px)',
              background: 'radial-gradient(120% 140% at 85% 0%,rgba(222,192,120,.22),rgba(58,36,8,.3) 40%,rgba(36,10,3,0) 72%),linear-gradient(135deg,#3a2408,#240a03)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{ position: 'absolute', right: '-2%', bottom: '-24%', fontSize: 'clamp(140px,24vw,340px)', fontWeight: 800, color: 'rgba(222,192,120,.08)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                SUMMIT
              </div>
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                <SectionLabel>The WeThink Summit</SectionLabel>
                <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 20px', fontFamily: FF }}>
                  {summit?.heading ?? 'Where a school project becomes a national moment.'}
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, margin: '0 0 32px' }}>
                  Four times a year, the best student work from across India comes to a single stage — judged by industry, witnessed by a national audience, and permanently recorded as student achievement.
                </p>
                <SpringBtn
                  onClick={() => navigate('summit')}
                  style={{ background: GOLD, color: BG, padding: '14px 28px', borderRadius: '999px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: FF }}
                >
                  Discover the Summit ↗
                </SpringBtn>
              </div>
            </div>
          </section>

          {/* TESTIMONIAL */}
          <section data-reveal style={{ padding: 'clamp(72px,10vw,150px) clamp(24px,6vw,64px)', background: S2, borderBottom: BORDER, textAlign: 'center' }}>
            <div style={{ fontSize: '90px', lineHeight: 0.5, color: '#8C3623', fontWeight: 800, marginBottom: '18px' }}>{'\u201C'}</div>
            <blockquote style={{ margin: '0 auto', maxWidth: '820px' }}>
              <p style={{ fontSize: 'clamp(22px,3vw,38px)', fontWeight: 500, color: TP, lineHeight: 1.4, margin: '0 0 36px', fontFamily: FF }}>
                {visionSection?.directorQuote ?? 'Why do we wait until after graduation to give students real experience? By then, the choice is already made.'}
              </p>
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: S1, border: '1px solid rgba(222,192,120,.3)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: GOLD, flexShrink: 0 }}>
                {visionSection?.directorImageUrl
                  ? <img src={visionSection.directorImageUrl} alt="Dr. Neha Raghav" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  : 'N'
                }
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '15px', fontWeight: 700, color: TP, margin: '0 0 2px' }}>{visionSection?.directorName ?? 'Dr. Neha Raghav'}</p>
                <p style={{ fontSize: '13px', color: GOLD, margin: 0 }}>{visionSection?.directorTitle ?? 'Director, WeThink Bharat'}</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          VISION ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'vision' && (
        <>
          {/* Vision Hero */}
          <section style={{
            position: 'relative', minHeight: 'clamp(240px,30vh,360px)', display: 'flex',
            alignItems: 'center', overflow: 'hidden',
            padding: '104px clamp(24px,6vw,64px) 52px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={headerImages?.vision} />
            <HeroDecorRing />
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(38px,6.4vw,88px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: TP, margin: '0 0 24px', maxWidth: '900px', fontFamily: FF }}>
                We are building India's first{' '}
                <span style={{ color: GOLD }}>experiential learning ecosystem.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: TS, maxWidth: '560px', margin: 0 }}>
                WeThink Bharat exists for one reason — so that no Indian student ever has to choose a career they don't understand, in a world they've never experienced.
              </p>
            </div>
          </section>

          {/* Poetic Interstitial */}
          <section data-reveal style={{
            position: 'relative', padding: 'clamp(80px,13vw,180px) clamp(24px,6vw,64px)',
            background: S1, borderBottom: BORDER, overflow: 'hidden', textAlign: 'center',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', left: '50%', top: 0,
              transform: 'translateX(-50%)',
              fontSize: 'clamp(96px,13vw,180px)', fontWeight: 800,
              color: 'rgba(222,192,120,.28)', lineHeight: 1, pointerEvents: 'none',
              userSelect: 'none', zIndex: 0,
            }}>
              {'\u201C'}
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1040px', margin: '0 auto' }}>
              <p style={{
                fontSize: 'clamp(22px,3.2vw,42px)', fontWeight: 600, color: TP,
                lineHeight: 1.34, letterSpacing: '-.015em', textAlign: 'justify',
                margin: '0 0 48px', fontFamily: FF,
              }}>
                Every year, millions of students in India make the most important decision of their lives based almost entirely on what their parents did, what relatives suggested, or what scored highest in a board exam.{' '}
                <strong style={{ color: GOLD }}>That has to change.</strong>
              </p>

              <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {visionSection?.bodyBlocks
                  ? visionSection.bodyBlocks.split('\n\n').map((para, i) => (
                      <p key={i} style={{ fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.75, color: TS, margin: 0 }}>{para}</p>
                    ))
                  : <>
                      <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.75, color: TS, margin: 0 }}>
                        India produces the world's largest number of graduates every year — yet most are judged unprepared for work. Not because they&apos;re unintelligent or didn&apos;t study, but because the system never let them experience the world they were being prepared for.
                      </p>
                      <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.75, color: TS, margin: 0 }}>
                        The gap isn&apos;t academic — it&apos;s experiential. Students know the theory. They&apos;ve never felt what it&apos;s like to pitch to an investor, design something a real user rejects, or navigate a real deadline.
                      </p>
                      <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.75, color: TS, margin: 0 }}>
                        <span style={{ color: TP, fontWeight: 700 }}>WeThink Bharat is the answer</span> — a structured, industry-integrated, school-delivered experiential learning movement that lets every student discover who they are before they decide who they will become.
                      </p>
                    </>
                }
              </div>
            </div>
          </section>

          {/* Vision / Purpose / Mission cards */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
            <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
              <SectionLabel>{visionSection?.kicker ?? 'Our vision'}</SectionLabel>
              <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 48px', fontFamily: FF }}>
                {visionSection?.heading ?? 'A Bharat where every student discovers their capability before they ever have to choose a path.'}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '20px' }}>
                {[
                  { label: visionSection?.purpose?.label ?? 'Purpose', text: visionSection?.purpose?.text ?? 'Expose every student to the real world of work — early, and for real.' },
                  { label: visionSection?.vision?.label ?? 'Vision', text: visionSection?.vision?.text ?? 'A generation that enters adulthood already knowing what it is capable of.' },
                  { label: visionSection?.mission?.label ?? 'Mission', text: visionSection?.mission?.text ?? 'Real briefs, real mentors, and permanent proof — inside every school.' },
                ].map((card) => (
                  <div key={card.label} style={{ border: '1px solid rgba(222,192,120,.16)', background: S1, borderRadius: '16px', padding: '28px 26px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 12px' }}>{card.label}</p>
                    <p style={{ fontSize: '16px', lineHeight: 1.6, color: TP, margin: 0 }}>{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What We Believe */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <SectionLabel>{beliefsIntro?.kicker ?? 'What we believe'}</SectionLabel>
              <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
                {beliefsIntro?.heading ?? 'Six convictions that drive everything we build'}
              </h2>
              <p style={{ fontSize: 'clamp(15px,1.4vw,17px)', color: TS, lineHeight: 1.7, maxWidth: '560px', margin: '0 0 48px' }}>
                {beliefsIntro?.intro ?? 'Not values on a wall — design principles behind every simulator, every project brief, every partner conversation.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '0 56px' }}>
                {(beliefs && beliefs.length > 0 ? beliefs : [
                  { number: 1, title: 'Experience is the only real teacher', body: "Reading about entrepreneurship and running a startup simulation are not the same thing. We build experiences — not content." },
                  { number: 2, title: 'Every student has undiscovered capability', body: "Potential is universally present. The system just hasn't created the conditions to find it yet." },
                  { number: 3, title: 'Industry must come to the student', body: 'We cannot wait for students to graduate before industry engages them. The relationship must begin at school — and it must be real.' },
                  { number: 4, title: 'Failure in a safe space is a gift', body: 'A student who has failed at a simulated pitch is infinitely better prepared than one who has never tried.' },
                  { number: 5, title: "A digital footprint is a student's first asset", body: 'Before a degree, before a job — a student deserves something permanently, globally, verifiably theirs.' },
                  { number: 6, title: 'Scale is the only measure that matters', body: 'A program that changes 100 students is a project. A movement that changes a generation is what WeThink Bharat is built to be.' },
                ]).map((b) => (
                  <div key={b.number} style={{ display: 'flex', gap: '14px', padding: '24px 0', borderTop: '1px solid rgba(222,192,120,.14)' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: GOLD, minWidth: '28px', letterSpacing: '.02em', paddingTop: '2px' }}>{String(b.number).padStart(2, '0')}</span>
                    <div>
                      <p style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>{b.title}</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: TS, margin: 0 }}>{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          DOMAINS ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'domains' && (
        <>
          {/* Domains Hero */}
          <section style={{
            position: 'relative', minHeight: 'clamp(400px,50vh,560px)', display: 'flex',
            alignItems: 'center', overflow: 'hidden',
            padding: '128px clamp(24px,6vw,64px) 68px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={headerImages?.domains} />
            <HeroDecorRing />
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(38px,6.4vw,88px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 24px', maxWidth: '800px', fontFamily: FF }}>
                Step into the <span style={{ color: GOLD }}>real work.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: TS, maxWidth: '560px', margin: 0 }}>
                Four complete worlds — each with a simulator, a live project, an industry partner, and proof that lasts.
              </p>
            </div>
          </section>

          {/* Feature overview */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '48px', alignItems: 'center' }}>
              <div style={{ borderRadius: '20px', minHeight: 'clamp(300px,34vw,440px)', background: S2, border: '1px solid rgba(222,192,120,.14)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {domainsIntro?.featureImageUrl
                  ? <img src={domainsIntro.featureImageUrl} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  : <span style={{ fontSize: '64px', color: 'rgba(222,192,120,.15)' }}>◈</span>
                }
              </div>
              <div>
                <SectionLabel>Industry domains</SectionLabel>
                <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 20px', fontFamily: FF }}>
                  {domainsIntro?.heading ?? <>Domains you <span style={{ color: GOLD }}>experience</span>, not just study.</>}
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, margin: '0 0 28px' }}>
                  {domainsIntro?.subtext ?? "Each WeThink domain is a complete world: a structured simulator, a live industry brief, an expert mentor network, and a verified credential at the end. Students don't learn about it — they do it."}
                </p>
                <SpringBtn
                  onClick={onSchoolFormOpen}
                  style={{ background: GOLD, color: BG, border: 'none', borderRadius: '999px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: FF }}
                >
                  Bring domains to my school ↗
                </SpringBtn>
              </div>
            </div>
          </section>

          {/* Domains Detail */}
          <section data-reveal style={{ padding: 'clamp(48px,7vw,96px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,7vw,88px)' }}>

              {(domains && domains.length > 0 ? domains : [
                {
                  number: 1, name: 'Entrepreneurship', partnerName: 'NASSCOM 10,000 Startups', simulatorName: 'Startup Studio', status: 'live' as const,
                  levels: [
                    { levelLabel: 'Level 1', title: 'Find a Problem', description: 'Field research, user interviews, and identifying a real community pain point.' },
                    { levelLabel: 'Level 2', title: 'Design & Validate', description: 'Create a prototype, gather feedback, and refine your ideas using design thinking and AI-powered tools.' },
                    { levelLabel: 'Level 3', title: 'Idea to a Business', description: 'Develop your business model, identify your market, and craft a go-to-market strategy.' },
                    { levelLabel: 'Level 4', title: 'Present to the Jury', description: 'Present to an industry jury. Real feedback — not grades.' },
                  ],
                  outcomes: ['A validated business idea built from real user research', 'A functional prototype and a business model ready for the real world', 'A pitch delivered to a real industry jury'],
                },
                {
                  number: 2, name: 'Media & Communication', partnerName: 'Brut', simulatorName: 'The Newsroom', status: 'live' as const,
                  levels: [
                    { levelLabel: 'Level 1', title: 'Find the story', description: 'Research a real issue, identify an angle, and conduct interviews.' },
                    { levelLabel: 'Level 2', title: 'Write & shape it', description: 'Draft, edit, and refine with editorial feedback from mentors.' },
                    { levelLabel: 'Level 3', title: 'Build & Prototype', description: 'Bring ideas to life through rapid prototyping using Canva.' },
                    { levelLabel: 'Level 4', title: 'Validate & Pitch', description: 'Test with real users, refine your solution, and present your innovation confidently.' },
                  ],
                  outcomes: ['A published piece of original journalism or content', 'A portfolio-ready body of work', 'Editorial judgment and a distinct voice'],
                },
                {
                  number: 3, name: 'Design & Innovation', partnerName: 'Canva', simulatorName: 'Design Lab', status: 'live' as const,
                  levels: [
                    { levelLabel: 'Level 1', title: 'Observe & empathise', description: 'Field observation, user interviews, and building an empathy map.' },
                    { levelLabel: 'Level 2', title: 'Define the problem', description: 'Frame the design challenge using real insights, not assumptions.' },
                    { levelLabel: 'Level 3', title: 'Prototype a solution', description: 'Build a working prototype using Canva and physical materials.' },
                    { levelLabel: 'Level 4', title: 'Test & present', description: 'Get real user feedback. Iterate. Present to a design jury.' },
                  ],
                  outcomes: ['A complete human-centred design project, brief to prototype', 'Hands-on experience with Design Thinking and rapid prototyping', 'A professional portfolio project showcasing your innovation process'],
                },
              ]).map((d) => (
                <div key={d.number}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '28px' }}>
                    <span style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, color: 'rgba(222,192,120,.4)', fontFamily: FF }}>{String(d.number).padStart(2, '0')}</span>
                    <div>
                      <h3 style={{ fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 800, color: TP, margin: '0 0 4px', fontFamily: FF }}>{d.name}</h3>
                      <p style={{ fontSize: '14px', color: GOLD, margin: 0, fontWeight: 600 }}>{d.simulatorName} · {d.partnerName}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '32px', marginBottom: '28px' }}>
                    <div style={{ borderRadius: '16px', minHeight: '240px', background: S2, border: '1px solid rgba(222,192,120,.12)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {d.detailImageUrl
                        ? <img src={d.detailImageUrl} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                        : <span style={{ fontSize: '40px', color: 'rgba(222,192,120,.15)' }}>◈</span>
                      }
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 12px' }}>The four levels</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {d.levels.map((l) => (
                          <div key={l.levelLabel} style={{ border: '1px solid rgba(222,192,120,.16)', background: S2, borderRadius: '12px', padding: '16px' }}>
                            <p style={{ fontSize: '10.5px', letterSpacing: '.1em', color: GOLD, fontWeight: 700, margin: '0 0 6px' }}>{l.levelLabel.toUpperCase()}</p>
                            <p style={{ fontSize: '14px', fontWeight: 800, color: TP, margin: '0 0 5px' }}>{l.title}</p>
                            <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: TS, margin: 0 }}>{l.description}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: '26px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 12px' }}>What students walk away with</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {d.outcomes.map((item) => (
                            <p key={item} style={{ fontSize: '14px', color: TS, margin: 0 }}>
                              <span style={{ color: GOLD, marginRight: '10px' }}>—</span>{item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          SUMMIT ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'summit' && (
        <>
          {/* Summit Hero */}
          <section style={{
            position: 'relative', minHeight: 'clamp(400px,50vh,560px)', display: 'flex',
            alignItems: 'center', overflow: 'hidden',
            padding: '128px clamp(24px,6vw,64px) 68px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={headerImages?.summit} />
            <HeroDecorRing speed="50s" />
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(38px,6.4vw,88px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 24px', maxWidth: '900px', fontFamily: FF }}>
                {summit?.heading ?? <>The national stage where student work meets{' '}<span style={{ color: GOLD }}>a nation watching.</span></>}
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: TS, maxWidth: '520px', margin: 0 }}>
                Four times a year, WeThink Bharat students from across India converge — to present, compete, and be recognised in front of the country's top industry leaders.
              </p>
            </div>
          </section>

          {/* What is the Summit */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '56px' }}>
              <div>
                <SectionLabel>What is the WeThink Summit</SectionLabel>
                <h2 style={{ fontSize: 'clamp(26px,3.6vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 20px', fontFamily: FF }}>
                  Not a competition. A <span style={{ color: GOLD }}>culmination.</span>
                </h2>
                {summit?.body
                  ? summit.body.split('\n\n').map((para, i) => (
                      <p key={i} style={{ fontSize: '15px', lineHeight: 1.75, color: TS, margin: i < summit.body!.split('\n\n').length - 1 ? '0 0 16px' : '0 0 28px' }}>{para}</p>
                    ))
                  : <>
                      <p style={{ fontSize: '15px', lineHeight: 1.75, color: TS, margin: '0 0 16px' }}>
                        The WeThink Summit is the moment the entire programme builds toward. After weeks of simulating, building, and publishing — students bring their best work to a national audience and stand behind it in front of people who have spent their careers in the very industries they have been learning about.
                      </p>
                      <p style={{ fontSize: '15px', lineHeight: 1.75, color: TS, margin: '0 0 28px' }}>
                        This is a real showcase — with real industry judges, real stakes, and real recognition that follows students for the rest of their lives.
                      </p>
                    </>
                }
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {(summit?.statChips && summit.statChips.length > 0 ? summit.statChips : ['4× per year', 'Pan-India', 'Industry judged', 'Live audience']).map((tag) => (
                    <span key={tag} style={{ background: 'rgba(222,192,120,.1)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: GOLD }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <SectionLabel>Domain tracks — Season 1</SectionLabel>
                <h2 style={{ fontSize: 'clamp(26px,3.4vw,44px)', fontWeight: 800, color: TP, margin: '0 0 24px', fontFamily: FF }}>What students compete in</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { n: '01', title: 'Entrepreneurship', partner: 'NASSCOM 10,000 Startups', active: true },
                    { n: '02', title: 'Media & Communication', partner: 'Brut', active: true },
                    { n: '03', title: 'Design & Innovation', partner: 'Canva', active: true },
                    { n: '04', title: 'Technology & AI', partner: 'Google for Education', active: false },
                    { n: '05', title: 'Social entrepreneurship', partner: '', active: false },
                    { n: '06', title: 'Finance & economics', partner: '', active: false },
                  ].map((row) => (
                    <div key={row.n} style={{
                      border: row.active ? '1px solid rgba(222,192,120,.4)' : '1px solid rgba(222,192,120,.14)',
                      background: row.active ? 'rgba(222,192,120,.06)' : 'transparent',
                      boxShadow: row.active ? 'inset 4px 0 0 #DEC078' : 'none',
                      borderRadius: '14px', padding: '20px 22px 20px 26px',
                      opacity: row.active ? 1 : 0.55,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '.1em' }}>{row.n}</span>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: TP }}>{row.title}</div>
                          {row.partner && <div style={{ fontSize: '12.5px', color: TS, marginTop: '2px' }}>{row.partner}</div>}
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: row.active ? GOLD : TS, background: row.active ? 'rgba(222,192,120,.14)' : 'rgba(224,206,189,.1)', borderRadius: '999px', padding: '4px 11px', flexShrink: 0 }}>
                        {row.active ? 'Season 1' : 'Phase 2'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section data-reveal style={{ padding: 'clamp(48px,6vw,84px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <div>
                <SectionLabel>Get involved</SectionLabel>
                <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: 0, fontFamily: FF }}>
                  Three ways to be part of the Summit
                </h2>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: TS, maxWidth: '320px', margin: 0 }}>
                Whether you lead a school, an industry, or want to witness what India's students are building.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' }}>
              {(summit?.getInvolvedCards && summit.getInvolvedCards.length > 0 ? summit.getInvolvedCards : [
                { audience: 'For schools', title: 'Nominate your student teams', description: 'Schools that have completed at least one WeThink Bharat domain cycle are eligible to nominate teams.', ctaLabel: 'Nominate your school ↗', ctaLink: undefined },
                { audience: 'For industry', title: 'Join as a jury member', description: "Industry leaders are invited to join domain juries and recognise India's most motivated student work on a national stage.", ctaLabel: 'Express interest ↗', ctaLink: undefined },
                { audience: 'For media & observers', title: 'Attend and amplify', description: "Journalists, educators, and partner organisations are welcome to attend and share the story of what India's students are capable of.", ctaLabel: 'Request an invitation ↗', ctaLink: undefined },
              ] as GetInvolvedCardData[]).map((card, i) => (
                <div key={card.audience} style={{ border: i === 0 ? '1px solid rgba(222,192,120,.35)' : '1px solid rgba(222,192,120,.16)', background: i === 0 ? 'rgba(222,192,120,.05)' : S2, borderRadius: '14px', padding: '22px' }}>
                  <p style={{ fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, fontWeight: 600, margin: '0 0 8px' }}>{card.audience}</p>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>{card.title}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.55, color: TS, margin: '0 0 16px' }}>{card.description}</p>
                  <SpringBtn onClick={i === 0 ? onSchoolFormOpen : onPartnerFormOpen} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: TP, fontFamily: FF, padding: 0, borderBottom: `1.5px solid ${GOLD}`, paddingBottom: '2px' }}>
                    {card.ctaLabel}
                  </SpringBtn>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          ECOSYSTEM ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'ecosystem' && (
        <>
          {/* Ecosystem Hero */}
          <section style={{
            position: 'relative', minHeight: 'clamp(400px,50vh,560px)', display: 'flex',
            alignItems: 'center', overflow: 'hidden',
            padding: '128px clamp(24px,6vw,64px) 68px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={headerImages?.ecosystem} />
            <HeroDecorRing speed="45s" size="clamp(160px,20vw,280px)" />
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(38px,6.4vw,88px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 24px', maxWidth: '800px', fontFamily: FF }}>
                More than a partnership,{' '}
                <span style={{ color: GOLD }}>a movement.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: TS, maxWidth: '560px', margin: 0 }}>
                We bring together industry leaders, educators, innovators, and institutions with one shared mission — empowering Young Bharat through meaningful learning experiences.
              </p>
            </div>
          </section>

          {/* Ecosystem partner-type grid */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '44px' }}>
                <h2 style={{ fontSize: 'clamp(28px,4vw,54px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: 0, fontFamily: FF }}>
                  Not just Collaborators.<br /><span style={{ color: GOLD }}>Changemakers.</span>
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '16px' }}>
                {[
                  { icon: 'ti-building-factory-2', label: 'Industry Partners', names: 'NASSCOM · Brut · Canva', body: 'Real briefs, real mentors, and the standards students are measured against.' },
                  { icon: 'ti-presentation', label: 'Experience Partners', names: 'Summit · Studios', body: 'The stages, tools, and platforms where student work actually goes live.' },
                  { icon: 'ti-school', label: 'Learning Partners', names: 'Educator network', body: 'Pedagogy and frameworks that keep classrooms current with industry.' },
                  { icon: 'ti-certificate-2', label: 'Knowledge Partners', names: 'iNEXT', body: "Credentials and research that make every student's proof portable." },
                ].map((c) => (
                  <div key={c.label} style={{ border: '1px solid rgba(222,192,120,.16)', background: S1, borderRadius: '16px', padding: '26px 24px' }}>
                    <i className={`ti ${c.icon}`} style={{ fontSize: '28px', color: GOLD, display: 'block', marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '19px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>{c.label}</h3>
                    <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: TS, margin: '0 0 12px' }}>{c.body}</p>
                    <div style={{ fontSize: '12px', color: GOLD, fontWeight: 600 }}>{c.names}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Changemakers / Current Partners */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <div style={{ maxWidth: '600px' }}>
                  <SectionLabel>Current partners</SectionLabel>
                  <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
                    Who we <span style={{ color: GOLD }}>work with</span>
                  </h2>
                  <p style={{ fontSize: '16px', lineHeight: 1.7, color: TS, margin: 0 }}>A growing network of Changemakers.</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '12.5px', color: TS, marginTop: '2px' }}>Early partner slots are open</div>
                  <SpringBtn onClick={onPartnerFormOpen} style={{ display: 'inline-block', marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: TP, fontFamily: FF, borderBottom: `1.5px solid ${GOLD}`, paddingBottom: '3px' }}>
                    Join the ecosystem →
                  </SpringBtn>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(258px,1fr))', gap: '18px' }}>
                {partnerCards.filter((p) => p.showInEcosystemGrid).map((p) => (
                  <div key={p._id} style={{ border: '1px solid rgba(222,192,120,.18)', background: S2, borderRadius: '16px', padding: '26px 24px' }}>
                    {p.type && (
                      <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, color: GOLD, background: 'rgba(222,192,120,.1)', border: '1px solid rgba(222,192,120,.22)', borderRadius: '999px', padding: '5px 12px', marginBottom: '18px' }}>{p.type}</span>
                    )}
                    {p.logoUrl
                      ? <img src={p.logoUrl} alt={p.name} style={{ height: '36px', objectFit: 'contain', marginBottom: '12px', display: 'block', filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(320deg)' }} />
                      : <h3 style={{ fontSize: '24px', fontWeight: 800, color: TP, letterSpacing: '-0.01em', margin: 0, fontFamily: FF }}>{p.name}</h3>
                    }
                    {p.categoryName && <div style={{ marginTop: '4px', fontSize: '13px', color: GOLD }}>{p.categoryName}</div>}
                    {p.description && <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: TS, margin: '14px 0 0' }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>

        </>
      )}

      {/* ══════════════════════════════════════════════════
          ADVISORY ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'advisory' && (
        <>
          {/* Advisory Hero */}
          <section style={{
            position: 'relative', minHeight: 'clamp(400px,50vh,560px)', display: 'flex',
            alignItems: 'center', overflow: 'hidden',
            padding: '128px clamp(24px,6vw,64px) 68px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={headerImages?.advisory} />
            <HeroDecorRing speed="48s" size="clamp(160px,20vw,280px)" />
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(38px,6.4vw,88px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 24px', maxWidth: '900px', fontFamily: FF }}>
                Leaders who believe the system can — and{' '}
                <span style={{ color: GOLD }}>must change.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: TS, maxWidth: '560px', margin: 0 }}>
                The WeThink Bharat Advisory Board brings together India's most respected voices across industry, education, and public policy — united by one conviction.
              </p>
            </div>
          </section>

          {/* Advisory flip grid */}
          <section data-reveal style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '44px' }}>
                <h2 style={{ fontSize: 'clamp(28px,4vw,54px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: 0, fontFamily: FF }}>
                  The people who keep the work <span style={{ color: GOLD }}>honest.</span>
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, maxWidth: '360px', margin: 0 }}>
                  Industry leaders, educators, and founders who shape our standards, guide the domains, and sit on Summit juries. The full board is announced ahead of Season 1.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '18px' }}>
                {namedMembers.map((member, idx) => (
                  <div
                    key={member.name || idx}
                    className={`flip-card${flippedCards.has(idx) ? ' flipped' : ''}`}
                    onClick={() => { if (isTouchDevice) toggleFlip(idx) }}
                    onMouseEnter={() => { if (!isTouchDevice && !flippedCards.has(idx)) toggleFlip(idx) }}
                    onMouseLeave={() => { if (!isTouchDevice && flippedCards.has(idx)) toggleFlip(idx) }}
                    style={{ height: '440px', cursor: 'pointer' }}
                  >
                    <div className="flip-card-inner">
                      {/* Front */}
                      <div className="flip-card-front" style={{
                        background: S2, borderRadius: '16px',
                        border: '1px solid rgba(222,192,120,.18)', overflow: 'hidden',
                        display: 'flex', flexDirection: 'column',
                      }}>
                        <div style={{ flex: 1, background: S1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {member.headshotUrl
                            ? <img src={member.headshotUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                            : <span style={{ fontSize: '40px', color: 'rgba(222,192,120,.15)' }}>{member.initial}</span>
                          }
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(20,7,2,.5),transparent 40%)', pointerEvents: 'none' }} />
                          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(36,10,3,.72)', border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: GOLD, zIndex: 2 }}>
                            {String(member.number).padStart(2, '0')}
                          </div>
                          <div style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: GOLD, background: 'rgba(36,10,3,.7)', border: '1px solid rgba(222,192,120,.28)', borderRadius: '999px', padding: '5px 10px', zIndex: 2 }}>
                            Read bio ↻
                          </div>
                        </div>
                        <div style={{ padding: '15px 16px 17px', background: S2, borderTop: '1px solid rgba(222,192,120,.14)' }}>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: TP, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{member.name}</div>
                          <div style={{ marginTop: '6px', fontSize: '11.5px', fontWeight: 600, lineHeight: 1.4, color: GOLD }}>{member.titleLine}</div>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="flip-card-back" style={{
                        background: 'linear-gradient(165deg,#3B1407,#2A0E05)',
                        border: '1px solid rgba(222,192,120,.34)', borderRadius: '16px',
                        padding: '22px 20px', display: 'flex', flexDirection: 'column',
                      }}>
                        <span style={{ fontFamily: 'Georgia,serif', fontSize: '64px', lineHeight: 0.7, color: '#8C3623', height: '34px' }}>{'\u201C'}</span>
                        <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: GOLD }}>{member.name}</div>
                        <p style={{ margin: '10px 0 0', fontSize: '13px', lineHeight: 1.6, color: TS, overflow: 'auto', flex: 1 }}>{member.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* TBA seats */}
                {tbaSeats.map((seat, idx) => {
                  const flipIdx = namedMembers.length + idx
                  return (
                    <div
                      key={`tba-${idx}`}
                      className={`flip-card${flippedCards.has(flipIdx) ? ' flipped' : ''}`}
                      onClick={() => { if (isTouchDevice) toggleFlip(flipIdx) }}
                      onMouseEnter={() => { if (!isTouchDevice && !flippedCards.has(flipIdx)) toggleFlip(flipIdx) }}
                      onMouseLeave={() => { if (!isTouchDevice && flippedCards.has(flipIdx)) toggleFlip(flipIdx) }}
                      style={{ height: '440px', cursor: 'pointer' }}
                    >
                      <div className="flip-card-inner">
                        {/* Front */}
                        <div className="flip-card-front" style={{
                          borderRadius: '16px',
                          border: '1px dashed rgba(222,192,120,.28)',
                          background: 'linear-gradient(160deg,#340F05,#2A0E05)',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          textAlign: 'center', padding: '24px', position: 'relative',
                        }}>
                          <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '11px', fontWeight: 700, color: GOLD, background: 'rgba(36,10,3,.72)', border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '4px 10px' }}>
                            {String(flipIdx + 1).padStart(2, '0')}
                          </span>
                          <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(222,192,120,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: '24px', fontWeight: 800, marginBottom: '18px', background: 'rgba(222,192,120,.06)' }}>
                            {seat.letter}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: TP, letterSpacing: '-0.01em' }}>Advisory seat</div>
                          <div style={{ marginTop: '6px', fontSize: '12px', fontWeight: 600, color: GOLD }}>{seat.category}</div>
                          <div style={{ marginTop: '14px', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(224,206,189,.75)' }}>Announcing · Season 1</div>
                        </div>
                        {/* Back */}
                        <div className="flip-card-back" style={{
                          background: 'linear-gradient(165deg,#3B1407,#2A0E05)',
                          border: '1px solid rgba(222,192,120,.34)', borderRadius: '16px',
                          padding: '22px 20px', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                        }}>
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px dashed rgba(222,192,120,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(222,192,120,.4)', fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>
                            ?
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>{seat.category}</div>
                          <p style={{ fontSize: '13px', lineHeight: 1.65, color: TS, margin: 0 }}>
                            We&apos;re finalising this seat. The advisor for this domain will be announced ahead of Season 1.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          JOURNEY ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'journey' && (
        <>
          {/* Journey Hero */}
          <section style={{
            position: 'relative', minHeight: 'clamp(400px,50vh,560px)', display: 'flex',
            alignItems: 'center', overflow: 'hidden',
            padding: '128px clamp(24px,6vw,64px) 68px', borderBottom: BORDER,
          }}>
            <PageHeroBg imageUrl={headerImages?.journey} />
            <HeroDecorRing speed="52s" size="clamp(160px,20vw,280px)" />
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
              <h1 style={{ fontSize: 'clamp(38px,6.4vw,88px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 24px', maxWidth: '800px', fontFamily: FF }}>
                {journeyIntro?.heading ?? <>Five stages. One <span style={{ color: GOLD }}>transformation.</span></>}
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: TS, maxWidth: '520px', margin: 0 }}>
                Five structured experiences that carry a student from a first taste of a domain to permanent, citable proof.
              </p>
            </div>
          </section>

          {/* Journey Orbit */}
          <section style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px) clamp(48px,6vw,80px)', borderBottom: BORDER }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '44px', maxWidth: '1360px', marginLeft: 'auto', marginRight: 'auto' }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(28px,4vw,54px)', lineHeight: 1.04, fontWeight: 800, color: TP, letterSpacing: '-.02em', maxWidth: '620px', fontFamily: FF }}>
                {journeyIntro?.kicker ?? <>From exposure to <span style={{ color: GOLD }}>permanent proof</span></>}
              </h2>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7, color: TS, maxWidth: '320px' }}>
                Five structured experiences that carry a student from a first taste of a domain to a globally citable record of what they built.
              </p>
            </div>

            {/* Full-width orbit stage */}
            <div
              ref={orbitStageRef}
              style={{
                position: 'relative', width: '100vw', marginLeft: 'calc(50% - 50vw)',
                height: 'clamp(440px,50vw,580px)', overflow: 'hidden',
              }}
            >
              {/* Zero-size orbit anchor at center */}
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}>
                {activeJourneyStages.map((stage, i) => (
                  <div
                    key={stage.key}
                    ref={el => { orbitCardRefs.current[i] = el }}
                    onClick={() => selectOrbitCard(i)}
                    style={{
                      position: 'absolute', left: 0, top: 0,
                      transform: 'translate(-50%, -50%)',
                      width: 'clamp(214px,20vw,286px)', height: 'clamp(300px,32vw,384px)',
                      borderRadius: '22px',
                      border: '1px solid rgba(222,192,120,.18)',
                      background: stage.bg,
                      padding: '28px 26px',
                      display: 'flex', flexDirection: 'column',
                      boxShadow: '0 26px 56px -24px rgba(0,0,0,.72)',
                      cursor: 'pointer', userSelect: 'none',
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '15px', background: 'rgba(222,192,120,.12)', border: '1px solid rgba(222,192,120,.3)', color: GOLD, marginBottom: '20px', flexShrink: 0, overflow: 'hidden' }}>
                      {stage.iconUrl
                        ? <img src={stage.iconUrl} alt="" aria-hidden="true" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                        : <i className={`ti ${stage.icon}`} style={{ fontSize: '25px' }} />
                      }
                    </span>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.14em', color: GOLD, textTransform: 'uppercase' }}>{stage.key}</div>
                    <h3 style={{ margin: '11px 0 12px', fontSize: 'clamp(20px,2.1vw,25px)', fontWeight: 800, color: TP, letterSpacing: '-.01em', lineHeight: 1.12, fontFamily: FF }}>{stage.title}</h3>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: TS }}>{stage.body}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '12px', fontWeight: 600, color: GOLD }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
                      {stage.dur}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev button */}
              <button
                aria-label="Previous"
                onClick={() => { orbitTargetRef.current += 2 * Math.PI / 5 }}
                style={{ position: 'absolute', left: 'clamp(16px,4vw,52px)', top: '50%', transform: 'translateY(-50%)', zIndex: 120, width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(36,10,3,.6)', border: '1px solid rgba(222,192,120,.3)', color: GOLD, fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>

              {/* Next button */}
              <button
                aria-label="Next"
                onClick={() => { orbitTargetRef.current -= 2 * Math.PI / 5 }}
                style={{ position: 'absolute', right: 'clamp(16px,4vw,52px)', top: '50%', transform: 'translateY(-50%)', zIndex: 120, width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(36,10,3,.6)', border: '1px solid rgba(222,192,120,.3)', color: GOLD, fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>

              {/* Hint */}
              <div style={{ position: 'absolute', left: '50%', bottom: 'clamp(14px,3vw,30px)', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(224,206,189,.5)', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3v10M9 3 6 6M9 3l3 3M15 13v-2a3 3 0 0 0-6 0v2m0 0v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5H9z"/></svg>
                Click a card to bring it forward
              </div>

              {/* Dot indicators */}
              <div style={{ position: 'absolute', left: '50%', bottom: 'clamp(40px,6vw,60px)', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                {activeJourneyStages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => selectOrbitCard(i)}
                    style={{ width: i === orbitFrontIdx ? '24px' : '8px', height: '8px', borderRadius: '999px', background: i === orbitFrontIdx ? GOLD : 'rgba(222,192,120,.35)', border: 'none', cursor: 'pointer', transition: 'width .3s ease, background .3s ease', padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial quote */}
          <section data-reveal style={{ padding: 'clamp(72px,10vw,150px) clamp(24px,6vw,64px)', background: S2, borderBottom: BORDER, textAlign: 'center' }}>
            <div style={{ maxWidth: '980px', margin: '0 auto' }}>
              <span aria-hidden="true" style={{ display: 'block', fontSize: '90px', lineHeight: 0.5, color: '#8C3623', fontWeight: 800, marginBottom: '18px' }}>
                {'\u201C'}
              </span>
              <p style={{ margin: '0 0 30px', fontSize: 'clamp(22px,3vw,38px)', lineHeight: 1.3, fontWeight: 500, color: TP, letterSpacing: '-0.01em', fontFamily: FF }}>
                {visionSection?.directorQuote ?? 'Why do we wait until after graduation to give students real experience? By then, the choice is already made.'}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '18px' }}>
                <div style={{ width: '76px', height: '76px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(222,192,120,.3)', flexShrink: 0, background: S1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: GOLD }}>
                  {visionSection?.directorImageUrl
                    ? <img src={visionSection.directorImageUrl} alt="Dr. Neha Raghav" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                    : 'N'
                  }
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '19px', fontWeight: 700, color: TP }}>{visionSection?.directorName ?? 'Dr. Neha Raghav'}</div>
                  <div style={{ fontSize: '15px', color: GOLD }}>{visionSection?.directorTitle ?? 'Director, WeThink Bharat'}</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          CONTACT ROUTE
      ══════════════════════════════════════════════════ */}
      {currentRoute === 'contact' && (
        <section data-reveal style={{
          padding: 'clamp(120px,16vw,200px) clamp(24px,6vw,64px)',
          background: S1, textAlign: 'center',
          position: 'relative', overflow: 'hidden', minHeight: '100vh',
          display: 'flex', alignItems: 'center',
        }}>
          <div aria-hidden="true" style={{
            position: 'absolute', right: '-4%', bottom: '-16%',
            fontSize: 'clamp(140px,22vw,340px)', fontWeight: 800,
            color: 'rgba(222,192,120,.04)', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}>
            JOIN
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
            <SectionLabel>Get involved</SectionLabel>
            <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 20px', fontFamily: FF }}>
              {applyCta?.heading ?? 'Join the movement.'}
            </h2>
            <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.7, color: TS, maxWidth: '560px', margin: '0 auto 44px' }}>
              {applyCta?.body ?? 'Season 1 nominations are open now. Bring WeThink Bharat to your school and give your students the experience that changes everything.'}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <SpringBtn
                onClick={onSchoolFormOpen}
                style={{
                  background: GOLD, color: BG, padding: '18px 36px',
                  borderRadius: '999px', fontSize: '16px', fontWeight: 700,
                  border: 'none', cursor: 'pointer', fontFamily: FF,
                }}
              >
                {applyCta?.primaryCtaLabel ?? 'Bring WeThink to my school ↗'}
              </SpringBtn>
              <SpringBtn
                onClick={onPartnerFormOpen}
                style={{
                  background: 'rgba(52,15,5,.4)', color: TP,
                  border: '1px solid rgba(224,206,189,.3)', padding: '18px 36px',
                  borderRadius: '999px', fontSize: '16px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: FF,
                }}
              >
                {applyCta?.secondaryCtaLabel ?? 'Partner with us'}
              </SpringBtn>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          FOOTER (always visible)
      ══════════════════════════════════════════════ */}
      <footer style={{ padding: 'clamp(56px,7vw,84px) clamp(24px,6vw,64px) 40px', background: S1, borderTop: '1px solid rgba(222,192,120,.14)' }}>
        {/* Partner CTA card */}
        <div style={{
          border: '1px solid rgba(222,192,120,.2)', borderRadius: '20px',
          padding: 'clamp(28px,4vw,48px)',
          background: 'linear-gradient(120deg,#340F05,#2A0E05)',
          marginBottom: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '560px' }}>
            <SectionLabel>Partner with us</SectionLabel>
            <h3 style={{ fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 800, color: TP, margin: '0 0 12px', fontFamily: FF }}>
              {applyCta?.heading ?? 'Build the future of Young Bharat with us.'}
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, margin: 0 }}>
              {applyCta?.body ?? 'Whether you are an industry leader, an educator, a media organisation, or a policymaker — there is a role for you in the WeThink ecosystem.'}
            </p>
          </div>
          <SpringBtn
            onClick={onPartnerFormOpen}
            style={{ background: GOLD, color: BG, padding: '14px 28px', borderRadius: '999px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: FF, whiteSpace: 'nowrap' }}
          >
            Become a partner ↗
          </SpringBtn>
        </div>

        {/* Footer grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '32px', marginBottom: '48px' }}>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>
              <span style={{ color: TP }}>wethink</span><span style={{ color: GOLD }}>bharat</span>
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(224,206,189,.55)', margin: 0 }}>
              {siteConfig?.footerTagline ?? 'An initiative of Viksit Bharat Foundation.'}
            </p>
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 16px' }}>Explore</p>
            {(siteConfig?.footerExploreLinks && siteConfig.footerExploreLinks.length > 0
              ? siteConfig.footerExploreLinks.map((l) => ({ label: l.label, route: (l.link.replace('#', '') as Route) || ('home' as Route) }))
              : [
                  { label: 'Vision', route: 'vision' as Route },
                  { label: 'Domains', route: 'domains' as Route },
                  { label: 'WeThink Summit', route: 'summit' as Route },
                  { label: 'The journey', route: 'journey' as Route },
                ]
            ).map((l) => (
              <button key={l.label} onClick={() => navigate(l.route)} style={{ display: 'block', fontSize: '14px', color: TS, background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px', fontFamily: FF, textAlign: 'left' }}>
                {l.label}
              </button>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 16px' }}>Connect</p>
            {(siteConfig?.footerConnectLinks && siteConfig.footerConnectLinks.length > 0
              ? siteConfig.footerConnectLinks
              : [
                  { label: 'School enquiry', link: '#school-form' },
                  { label: 'Partner with us', link: '#partner-form' },
                  { label: 'Advisory board', link: '#advisory' },
                ]
            ).map((l) => {
              const isSchool = l.link === '#school-form'
              const isPartner = l.link === '#partner-form'
              const isAdvisory = l.link === '#advisory'
              return (
                <button
                  key={l.label}
                  onClick={() => isSchool ? onSchoolFormOpen() : isPartner ? onPartnerFormOpen() : isAdvisory ? navigate('advisory') : undefined}
                  style={{ display: 'block', fontSize: '14px', color: TS, background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px', fontFamily: FF, textAlign: 'left' }}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{ borderTop: '1px solid rgba(222,192,120,.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(224,206,189,.4)', margin: 0 }}>
            {siteConfig?.copyrightText ?? '© 2026 WeThink Bharat. All rights reserved.'}
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(224,206,189,.4)', margin: 0 }}>
            A national experiential learning movement.
          </p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      {backToTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', right: '24px', bottom: '24px', zIndex: 180,
            width: '46px', height: '46px', borderRadius: '50%',
            background: GOLD, color: BG, border: 'none', cursor: 'pointer',
            fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,.4)',
          }}
        >
          ↑
        </button>
      )}

    </div>
  )
}
