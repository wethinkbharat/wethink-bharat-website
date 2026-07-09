'use client'
import { useState, useEffect } from 'react'

/* ── design tokens ───────────────────────────────────────────── */
const FF = "'League Spartan', system-ui, sans-serif"
const BG = '#3B1407'
const S1 = '#2A0E05'
const S2 = '#340F05'
const GOLD = '#DEC078'
const TP = '#F5EEE2'
const TS = '#E0CEBD'
const BORDER = '1px solid rgba(222,192,120,.14)'

/* ── keyframes ───────────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes wtbSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes wtbPulse { 0%,100% { box-shadow:0 0 0 0 rgba(222,192,120,.5); } 70% { box-shadow:0 0 0 10px rgba(222,192,120,0); } 100% { box-shadow:0 0 0 0 rgba(222,192,120,0); } }
@keyframes wtbBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(9px); } }
@keyframes wtbMarquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
@keyframes wtbFadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
[data-reveal] { opacity:0; transform:translateY(22px); transition:opacity .65s ease, transform .65s ease; }
[data-reveal].is-visible { opacity:1; transform:translateY(0); }
`

/* ── journey cards ───────────────────────────────────────────── */
const JOURNEY_CARDS = [
  { icon: 'ti-compass', stage: '01 OPEN', title: 'Open — The Exposure Experience', pill: '2 days', body: 'A 2-day immersive experience where students step into a live industry world for the first time. Real practitioners, real environments, real challenges.' },
  { icon: 'ti-briefcase', stage: '02 LIVE', title: 'Live — The Real Brief', pill: '2 weeks', body: 'Students work on a genuine industry brief over two weeks. No textbook answers — just real problems that real organisations need solved.' },
  { icon: 'ti-users', stage: '03 CIRCLE', title: 'Circle — Ongoing Mentorship', pill: 'Continuous', body: 'Ongoing sessions with industry practitioners who guide, challenge and push student thinking — every week, throughout the semester.' },
  { icon: 'ti-microphone', stage: '04 SUMMIT', title: 'Summit — The National Stage', pill: '4× / year', body: 'The best student work is pitched at the WeThink Summit — a live, nationally recognised event in front of industry leaders and an audience that matters.' },
  { icon: 'ti-certificate', stage: '05 IMPRINT', title: 'Imprint — Proof for Life', pill: 'Permanent', body: 'Every student receives a permanent, verifiable digital footprint of their work — a WeThink Imprint that belongs to them forever, globally accessible.' },
]

const CARD_BG = [
  'linear-gradient(165deg,#2A0E05,#200A03)',
  'linear-gradient(165deg,#3B1407,#2A0E05)',
  'linear-gradient(165deg,#52180B,#371106)',
  'linear-gradient(165deg,#6E2412,#48160A)',
  'linear-gradient(165deg,#8C3623,#5A1E10)',
]

/* ── advisory members ────────────────────────────────────────── */
const NAMED_MEMBERS = [
  { name: 'Dr. Aditi Misra', role: 'Director · DPS Intl', sub: 'Gurgaon, Jaipur & Dharav High School', num: '01', bio: 'A renowned educationist with over three decades in academic leadership and institution-building. Dr. Misra has shaped some of India\'s most respected school communities and has been honoured with the CV Raman Education Award for her transformative contributions to the field.' },
  { name: 'Dr. Amrita Burman', role: 'Director · Sunbeam Group', sub: 'Education Management Expert', num: '02', bio: 'A respected education leader and Director of the Sunbeam Group, with three decades transforming modern education through curriculum innovation, institutional culture-building, and a deep commitment to student-centred learning across India.' },
  { name: 'Dr. Arunabh Singh', role: 'Director · Nehru World School', sub: 'Healthy Planet & Cogent', num: '03', bio: 'A renowned education entrepreneur and Director-Principal of Nehru World School, championing digital innovation, experiential pedagogy, and holistic student development across his multi-institution portfolio.' },
  { name: 'Lina Ashar', role: 'Founder · Dreamtime Learning', sub: 'Kangaroo Kids Education Ltd', num: '04', bio: 'A pioneering edupreneur and visionary in progressive education. As founder of Kangaroo Kids, Billabong High, and Dreamtime Learning, Lina has redefined what early and secondary education can look and feel like for Indian students.' },
  { name: 'Lt. Gen. Surendra Kulkarni', role: 'Former Director · Mayo College', sub: 'Ajmer', num: '05', bio: 'A highly decorated Army veteran and education leader who served as Principal and Director of Mayo College from 2015–2024. He brings strategic leadership, values-based institution building, and a national perspective on youth development.' },
  { name: 'Dr. Nandini Srivastava', role: 'Dean · Manav Rachna International', sub: 'Institute of Research', num: '06', bio: 'Professor and Director of the Council for Doctoral Programs at Manav Rachna International Institute. With 27+ years in higher education research and pedagogy, Dr. Srivastava bridges academic rigour with real-world learning design.' },
]

const TBA_SEATS = [
  { num: '07', initial: 'I', category: 'Industry & Startups' },
  { num: '08', initial: 'M', category: 'Media & Storytelling' },
  { num: '09', initial: 'D', category: 'Design & Innovation' },
  { num: '10', initial: 'E', category: 'Education & Pedagogy' },
  { num: '11', initial: 'P', category: 'Policy & Public Systems' },
  { num: '12', initial: 'F', category: 'Founders & Operators' },
  { num: '13', initial: 'I', category: 'Industry & Startups' },
  { num: '14', initial: 'M', category: 'Media & Storytelling' },
  { num: '15', initial: 'D', category: 'Design & Innovation' },
  { num: '16', initial: 'E', category: 'Education & Pedagogy' },
]

/* ── domain data ─────────────────────────────────────────────── */
const DOMAINS = [
  {
    num: '01',
    title: 'Entrepreneurship',
    partner: 'Startup Studio · NASSCOM 10,000 Startups',
    levels: [
      { level: 'LEVEL 1', title: 'Find a Problem', body: 'Students identify real-world problems worth solving through structured research and observation.' },
      { level: 'LEVEL 2', title: 'Design & Validate', body: 'Build and test solutions with real users — iterating until the idea holds.' },
      { level: 'LEVEL 3', title: 'Idea to a Business', body: 'Transform the validated concept into a business model with financial and market basics.' },
      { level: 'LEVEL 4', title: 'Present to the Jury', body: 'Pitch the venture to a real industry jury — exactly as it would happen in the startup world.' },
    ],
    outcomes: ['A validated business idea and go-to-market plan', 'A functional prototype tested with real users', 'A pitch presented to a real industry jury'],
  },
  {
    num: '02',
    title: 'Media & Communication',
    partner: 'The Newsroom · Brut',
    levels: [
      { level: 'LEVEL 1', title: 'Find the Story', body: 'Students learn to identify stories worth telling — in their schools, communities and the world.' },
      { level: 'LEVEL 2', title: 'Write & Shape It', body: 'From first draft to polished piece — editorial judgment, structure, and voice.' },
      { level: 'LEVEL 3', title: 'Build & Prototype', body: 'Students produce their work: articles, videos, social content — built for real audiences.' },
      { level: 'LEVEL 4', title: 'Validate & Pitch', body: 'Present to an editorial panel — real feedback, real standards, real publication consideration.' },
    ],
    outcomes: ['Published journalism and content pieces', 'A portfolio-ready body of work', 'Editorial judgment and media industry knowledge'],
  },
  {
    num: '03',
    title: 'Design & Innovation',
    partner: 'Design Lab · Canva',
    levels: [
      { level: 'LEVEL 1', title: 'Observe & Empathise', body: 'Students become researchers — watching, listening, and understanding human problems.' },
      { level: 'LEVEL 2', title: 'Define the Problem', body: 'Turning observations into clear problem statements that are worth designing for.' },
      { level: 'LEVEL 3', title: 'Prototype a Solution', body: 'Rapid prototyping using real design tools — from sketch to working prototype.' },
      { level: 'LEVEL 4', title: 'Test & Present', body: 'User testing followed by a final presentation to a design-literate panel.' },
    ],
    outcomes: ['A complete human-centred design project', 'Design Thinking methodology experience', 'A professional portfolio piece from a real brief'],
  },
]

/* ── helpers ─────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '11.5px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.22em', margin: '0 0 14px' }}>
      {children}
    </p>
  )
}

function HeroPageBg() {
  return (
    <>
      <div style={{ position: 'absolute', inset: '-12% 0', zIndex: 0, background: S1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(105deg,rgba(36,10,3,.9) 0%,rgba(36,10,3,.6) 40%,rgba(36,10,3,.18) 74%,rgba(36,10,3,0) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top,rgba(36,10,3,.9) 2%,rgba(36,10,3,0) 46%)' }} />
    </>
  )
}

function ImgPlaceholder({ height }: { height?: string | number }) {
  return (
    <div style={{ background: S2, width: '100%', height: height ?? '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(222,192,120,.3)', fontSize: '24px' }}>◈</div>
  )
}

/* ── carousel transform ──────────────────────────────────────── */
function getCardTransform(idx: number, active: number) {
  const offset = idx - active
  const clamped = Math.max(-2, Math.min(2, offset))
  const xMap: Record<string, number> = { '-2': -440, '-1': -240, '0': 0, '1': 240, '2': 440 }
  const scaleMap: Record<string, number> = { '-2': 0.82, '-1': 0.92, '0': 1.05, '1': 0.92, '2': 0.82 }
  const opMap: Record<string, number> = { '-2': 0.35, '-1': 0.7, '0': 1, '1': 0.7, '2': 0.35 }
  const zMap: Record<string, number> = { '-2': 4, '-1': 6, '0': 10, '1': 6, '2': 4 }
  const k = String(clamped)
  return {
    transform: `translateX(${xMap[k]}px) scale(${scaleMap[k]})`,
    opacity: opMap[k],
    zIndex: zMap[k],
    transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease',
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    marginLeft: '-clamp(107px,10vw,143px)' as unknown as number,
    marginTop: '-clamp(150px,16vw,192px)' as unknown as number,
  }
}

/* ── Props ───────────────────────────────────────────────────── */
interface Props {
  onSchoolFormOpen: () => void
  onPartnerFormOpen: () => void
}

/* ═══════════════════════════════════════════════════════════════
   MobileSite
═══════════════════════════════════════════════════════════════ */
export function MobileSite({ onSchoolFormOpen, onPartnerFormOpen }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'domains' | 'journey' | 'summit' | 'menu'>('home')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [navStack, setNavStack] = useState<string[]>([])
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState(2)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [backToTopVisible, setBackToTopVisible] = useState(false)

  /* ── keyframe injection ──────────────────────── */
  useEffect(() => {
    if (typeof document === 'undefined') return
    const id = 'wtb-mobile-keyframes'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = KEYFRAMES
      document.head.appendChild(style)
    }
  }, [])

  /* ── scroll reveal ───────────────────────────── */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* ── count-up ────────────────────────────────── */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-count]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const raw = el.dataset.count ?? '0'
        const isRange = raw.includes('–')
        if (isRange) { el.textContent = raw; obs.unobserve(el); return }
        const target = parseFloat(raw)
        const suffix = raw.replace(/[\d.]/g, '')
        const start = performance.now()
        const dur = 1800
        const step = (now: number) => {
          const progress = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.round(eased * target) + suffix
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.unobserve(el)
      })
    }, { threshold: 0.5 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* ── back-to-top visibility ──────────────────── */
  useEffect(() => {
    const handleScroll = () => setBackToTopVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleFlip = (idx: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx); else next.add(idx)
      return next
    })
  }

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleTabClick = (tab: typeof activeTab) => {
    if (tab === 'menu') {
      setActiveTab('menu')
      setSheetOpen(true)
      return
    }
    setActiveTab(tab)
    const map: Record<string, string> = {
      home: '#home',
      domains: '#domains-section',
      journey: '#journey-section',
      summit: '#summit-section',
    }
    scrollTo(map[tab])
  }

  const closeSheet = () => {
    setSheetOpen(false)
    setActiveTab('home')
  }

  const goBack = () => {
    const next = [...navStack]
    const prev = next.pop()
    setNavStack(next)
    if (prev) scrollTo(prev)
  }

  /* ─── TABS ────────────────────────────────────────── */
  const TABS = [
    { id: 'home' as const, label: 'Home', icon: 'ti-home-2' },
    { id: 'domains' as const, label: 'Domains', icon: 'ti-layout-grid' },
    { id: 'journey' as const, label: 'Journey', icon: 'ti-route' },
    { id: 'summit' as const, label: 'Summit', icon: 'ti-microphone-2' },
    { id: 'menu' as const, label: 'Menu', icon: 'ti-menu-2' },
  ]

  return (
    <div style={{ fontFamily: FF, background: BG, color: TP, width: '100%', overflowX: 'hidden', position: 'relative', paddingBottom: '78px' }}>

      {/* ══════════════════════════════════════
          1. HEADER (fixed)
      ══════════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(36,10,3,.55)', backdropFilter: 'blur(14px)',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 18px',
        borderBottom: '1px solid rgba(222,192,120,.1)',
      }}>
        {navStack.length > 0 && (
          <button
            onClick={goBack}
            aria-label="Go back"
            style={{
              position: 'absolute', left: '12px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: TP, fontSize: '23px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '8px',
            }}
          >
            <i className="ti ti-arrow-left" />
          </button>
        )}
        <a href="#home" style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 800, fontFamily: FF }}>
          <span style={{ color: TP }}>wethink</span><span style={{ color: GOLD }}>bharat</span>
        </a>
      </header>

      {/* ══════════════════════════════════════
          MAIN CONTENT (padded for header + tab bar)
      ══════════════════════════════════════ */}
      <main style={{ paddingTop: '60px', paddingBottom: '78px' }}>

        {/* ════════════════════════════════════
            2. CINEMATIC HERO
        ════════════════════════════════════ */}
        <section id="home" style={{
          position: 'relative', minHeight: '100dvh',
          display: 'flex', alignItems: 'flex-end',
          overflow: 'hidden',
          padding: '0 clamp(24px,6vw,64px) 80px',
          borderBottom: BORDER,
        }}>
          <HeroPageBg />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            {/* Status chip */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(222,192,120,.1)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '6px 14px', marginBottom: '24px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GOLD, display: 'inline-block', animation: 'wtbPulse 2s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: GOLD, letterSpacing: '.06em' }}>Season 1 · school nominations open</span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em',
              lineHeight: 0.98, color: TP, margin: '0 0 22px', fontFamily: FF,
            }}>
              India's students deserve to{' '}
              <span style={{ color: GOLD }}>discover</span>{' '}
              before they decide.
            </h1>

            {/* Body */}
            <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: TS, margin: '0 0 32px' }}>
              WeThink Bharat brings real industry into schools — through domain simulators, live projects, and a permanent digital footprint that belongs to every student forever.
            </p>

            {/* CTAs — stacked column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              <button
                onClick={onSchoolFormOpen}
                style={{
                  background: GOLD, color: BG, padding: '16px 30px',
                  borderRadius: '999px', fontSize: '15px', fontWeight: 600,
                  border: 'none', cursor: 'pointer', fontFamily: FF, width: '100%',
                }}
              >
                Bring WeThink to my school ↗
              </button>
              <a
                href="#domains-section"
                style={{
                  background: 'rgba(52,15,5,.4)', color: TP,
                  border: '1px solid rgba(224,206,189,.3)', padding: '16px 30px',
                  borderRadius: '999px', fontSize: '15px', fontWeight: 600,
                  textDecoration: 'none', fontFamily: FF, width: '100%',
                  display: 'block', textAlign: 'center', boxSizing: 'border-box',
                }}
              >
                Explore the domains
              </a>
            </div>

            {/* Status chip 2 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(222,192,120,.08)', border: '1px solid rgba(222,192,120,.18)', borderRadius: '999px', padding: '6px 16px' }}>
              <span style={{ fontSize: '13px', color: TS }}>
                <strong style={{ color: TP }}>3 industry domains</strong> live now — Entrepreneurship, Media &amp; Design
              </span>
            </div>
          </div>

          {/* Scroll cue */}
          <div style={{
            position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 3, textAlign: 'center', color: 'rgba(224,206,189,.5)',
            fontSize: '12px', letterSpacing: '.1em', animation: 'wtbBob 2s ease-in-out infinite',
          }}>
            <div>Scroll to enter</div>
            <div style={{ fontSize: '18px', marginTop: '4px' }}>↓</div>
          </div>
        </section>

        {/* ════════════════════════════════════
            3. VISION PAGE HERO
        ════════════════════════════════════ */}
        <section id="vision-section" style={{
          position: 'relative', minHeight: 'clamp(200px,30vh,320px)', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
          padding: '100px clamp(24px,6vw,64px) 48px', borderBottom: BORDER,
        }}>
          <HeroPageBg />
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(32px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: TP, margin: '0 0 20px', fontFamily: FF }}>
              We are building India's first{' '}
              <span style={{ color: GOLD }}>experiential learning ecosystem.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.7, color: TS, margin: 0 }}>
              WeThink Bharat exists for one reason — so that no Indian student ever has to choose a career they don't understand, in a world they've never experienced.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. POETIC INTERSTITIAL
        ════════════════════════════════════ */}
        <section data-reveal="" style={{
          position: 'relative', padding: 'clamp(64px,10vw,120px) clamp(24px,6vw,64px)',
          background: S1, borderBottom: BORDER, overflow: 'hidden', textAlign: 'center',
        }}>
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: 0,
            transform: 'translateX(-50%)',
            fontSize: 'clamp(80px,18vw,160px)', fontWeight: 800,
            color: 'rgba(222,192,120,.28)', lineHeight: 1, pointerEvents: 'none',
            userSelect: 'none', zIndex: 0,
          }}>
            "
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: 'clamp(18px,4.5vw,32px)', fontWeight: 600, color: TP,
              lineHeight: 1.34, letterSpacing: '-.015em', textAlign: 'left',
              margin: '0 0 40px', fontFamily: FF,
            }}>
              Every year, millions of students in India make the most important decision of their lives based almost entirely on what their parents did, what relatives suggested, or what scored highest in a board exam.{' '}
              <strong style={{ color: GOLD }}>That has to change.</strong>
            </p>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.75, color: TS, margin: 0 }}>
                The average Indian student knows very little about the world of work before they are asked to commit to it for life. This isn't their failure — it's a structural gap that no one has addressed at scale.
              </p>
              <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.75, color: TS, margin: 0 }}>
                WeThink Bharat is built to close that gap — not through lectures or videos or one-day workshops, but through real, structured, industry-driven experiences that live inside the school itself.
              </p>
              <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.75, color: TS, margin: 0 }}>
                We believe that a student who has run a simulated startup, filed a news story, or designed a product for a real brief is infinitely better prepared than one who hasn't. And we believe India has the scale, the schools, and the students to make this happen — now.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            5. VISION CONTENT
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
          <SectionLabel>Our vision</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, maxWidth: '840px', margin: '0 0 40px', fontFamily: FF }}>
            A Bharat where every student discovers their{' '}
            <span style={{ color: GOLD }}>capability</span>{' '}
            before they ever have to choose a path.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Purpose', text: 'Expose every student to the real world of work — early, and for real.' },
              { label: 'Vision', text: 'A generation that enters adulthood already knowing what it is capable of.' },
              { label: 'Mission', text: 'Real briefs, real mentors, and permanent proof — inside every school.' },
            ].map(card => (
              <div key={card.label} style={{ border: '1px solid rgba(222,192,120,.16)', background: S1, borderRadius: '16px', padding: '24px 22px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 10px' }}>{card.label}</p>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: TP, margin: 0 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            6. BELIEFS
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <SectionLabel>What we believe</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 14px', fontFamily: FF }}>
            Six convictions that drive everything we build
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.4vw,16px)', color: TS, lineHeight: 1.7, margin: '0 0 40px' }}>
            Not values on a wall — design principles behind every simulator, every project brief, every partner conversation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { n: '01', title: 'Experience is the only real teacher', body: 'Reading about entrepreneurship and running a startup simulation are not the same thing. We build experiences — not content.' },
              { n: '02', title: 'Every student has undiscovered capability', body: 'Potential is universally present. The system just hasn\'t created the conditions to find it yet.' },
              { n: '03', title: 'Industry must come to the student', body: 'We cannot wait for students to graduate before industry engages them. The relationship must begin at school — and it must be real.' },
              { n: '04', title: 'Failure in a safe space is a gift', body: 'A student who has failed at a simulated pitch is infinitely better prepared than one who has never tried.' },
              { n: '05', title: 'A digital footprint is a student\'s first asset', body: 'Before a degree, before a job — a student deserves something permanently, globally, verifiably theirs.' },
              { n: '06', title: 'Scale is the only measure that matters', body: 'A program that changes 100 students is a project. A movement that changes a generation is what WeThink Bharat is built to be.' },
            ].map(b => (
              <div key={b.n} style={{ display: 'flex', gap: '14px', padding: '20px 0', borderTop: '1px solid rgba(222,192,120,.14)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: GOLD, minWidth: '28px', letterSpacing: '.02em', paddingTop: '2px' }}>{b.n}</span>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: TP, margin: '0 0 6px', fontFamily: FF }}>{b.title}</p>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: TS, margin: 0 }}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            7. PATHWAYS (1-col grid)
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 12px', fontFamily: FF }}>
            Capability across the whole <span style={{ color: GOLD }}>ecosystem</span>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, margin: '0 0 36px' }}>
            WeThink Bharat is designed for everyone inside a school — students, educators, and institutions — each with their own pathway.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            {[
              { icon: 'ti-books', label: 'For students', title: 'Discover before you decide', body: 'Simulated worlds, real briefs, live mentors, and a permanent footprint. Before choosing a path, students experience it.' },
              { icon: 'ti-chalkboard', label: 'For educators', title: 'Teach what industry needs', body: 'Structured programs, industry-designed content, and an educator community — built to make experiential learning easy to run.' },
              { icon: 'ti-building-community', label: 'For schools', title: 'Run it at scale, for years', body: 'A full institutional program — not a one-day workshop. WeThink Bharat integrates into the school calendar and grows every year.' },
            ].map(c => (
              <div key={c.label} style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(222,192,120,.16)', background: S1 }}>
                <div style={{ height: '300px', background: S2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImgPlaceholder />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(20,7,2,.94) 8%,rgba(20,7,2,.1) 62%)' }} />
                </div>
                <div style={{ padding: '24px 24px 26px', marginTop: '-66px', position: 'relative', zIndex: 1 }}>
                  <i className={`ti ${c.icon}`} style={{ fontSize: '26px', color: GOLD, display: 'block', marginBottom: '12px' }} />
                  <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 8px' }}>{c.label}</p>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: TP, margin: '0 0 10px', fontFamily: FF }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: TS, margin: 0 }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            8. PARTNER MARQUEE
        ════════════════════════════════════ */}
        <section style={{ padding: 'clamp(28px,4vw,44px) 0', background: BG, borderBottom: BORDER, overflow: 'hidden' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'wtbMarquee 30s linear infinite' }}>
            {[...Array(2)].map((_, t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(36px,5vw,64px)', paddingRight: 'clamp(36px,5vw,64px)' }}>
                {['NASSCOM', 'Brut', 'Canva', 'iNEXT', 'Partner'].map(name => (
                  <div key={name} style={{ width: 'clamp(112px,12vw,152px)', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.72 }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: TP, letterSpacing: '.08em', fontFamily: FF }}>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            9. IMPACT STATS
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
          <SectionLabel>The gap we close</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
            Educated unemployment begins with{' '}
            <span style={{ color: GOLD }}>uninformed choices.</span>
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: TS, margin: '0 0 26px', maxWidth: '440px' }}>
            India's students are bright and hardworking. But the system never gives them a chance to experience the world they are being prepared for.
          </p>

          <div>
            {[
              { count: '80', suffix: '%', label: 'Graduates are industry-unready', body: 'Most Indian graduates lack the applied, real-world skills industry needs on Day 1.' },
              { count: '93', suffix: '%', label: 'Students choose without experiencing', body: 'Students pick a stream on secondhand advice — never having lived the domain.' },
              { count: '14–18', suffix: '', label: 'The window that changes everything', body: 'The last moment before the fork — real experience here changes everything.', borderBottom: true },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '24px 0', borderTop: '1px solid rgba(222,192,120,.2)', borderBottom: s.borderBottom ? '1px solid rgba(222,192,120,.2)' : 'none' }}>
                <div
                  data-count={s.count + s.suffix}
                  style={{ fontSize: 'clamp(52px,6.4vw,84px)', fontWeight: 800, color: GOLD, lineHeight: 0.85, letterSpacing: s.count === '14–18' ? '0' : '-0.03em', fontFamily: FF, flexShrink: 0 }}
                >
                  {s.count}{s.suffix}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: TP, marginBottom: '6px', fontFamily: FF }}>{s.label}</div>
                  <div style={{ fontSize: '13.5px', color: TS, lineHeight: 1.55 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            10. DOMAINS TEASER (home)
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <div style={{ marginBottom: '36px' }}>
            <SectionLabel>Industry domains</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 14px', fontFamily: FF }}>
              Domains you <span style={{ color: GOLD }}>experience</span>, not just study.
            </h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(222,192,120,.08)', border: '1px solid rgba(222,192,120,.2)', borderRadius: '999px', padding: '5px 14px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD, display: 'inline-block', animation: 'wtbPulse 2s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: GOLD }}>Season 1 · 3 domains live</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { num: '01', label: 'Entrepreneurship', partner: 'NASSCOM 10,000 Startups' },
              { num: '02', label: 'Media & Communication', partner: 'Brut' },
              { num: '03', label: 'Design & Innovation', partner: 'Canva' },
            ].map(d => (
              <a key={d.num} href="#domains-section" style={{ textDecoration: 'none', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(222,192,120,.16)', background: S2, display: 'block' }}>
                <div style={{ aspectRatio: '3/2', background: BG, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImgPlaceholder />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(36,10,3,.85) 0%,rgba(36,10,3,0) 60%)' }} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(36,10,3,.7)', border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '.08em' }}>{d.num}</div>
                </div>
                <div style={{ padding: '16px 18px 18px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 6px' }}>{d.partner}</p>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: TP, margin: 0, fontFamily: FF }}>{d.label}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            11. SUMMIT TEASER
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(40px,6vw,64px) clamp(24px,6vw,64px)', borderBottom: BORDER, background: S1 }}>
          <div style={{
            border: '1px solid rgba(222,192,120,.45)', borderRadius: '20px',
            padding: 'clamp(32px,6vw,60px)',
            background: 'radial-gradient(120% 140% at 85% 0%,rgba(222,192,120,.22),rgba(58,36,8,.3) 40%,rgba(36,10,3,0) 72%),linear-gradient(135deg,#3a2408,#240a03)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', right: '-4%', bottom: '-20%',
              fontSize: 'clamp(80px,22vw,200px)', fontWeight: 800,
              color: 'rgba(222,192,120,.08)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>
              SUMMIT
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel>The WeThink Summit</SectionLabel>
              <h2 style={{ fontSize: 'clamp(22px,5vw,38px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
                Where a school project becomes a <span style={{ color: GOLD }}>national moment.</span>
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 28px' }}>
                Four times a year, the best student work from across India comes to a single stage — judged by industry, witnessed by a national audience, and permanently recorded as student achievement.
              </p>
              <a href="#summit-section" style={{ display: 'inline-block', background: GOLD, color: BG, padding: '13px 26px', borderRadius: '999px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: FF }}>
                Discover the Summit ↗
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            12. TESTIMONIAL
        ════════════════════════════════════ */}
        <section data-reveal="" style={{
          padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)',
          background: S2, borderBottom: BORDER, textAlign: 'center',
        }}>
          <div style={{ fontSize: '72px', lineHeight: 0.5, color: '#8C3623', fontWeight: 800, marginBottom: '16px' }}>"</div>
          <blockquote style={{ margin: '0 auto', maxWidth: '680px' }}>
            <p style={{ fontSize: 'clamp(18px,4.5vw,30px)', fontWeight: 500, color: TP, lineHeight: 1.4, margin: '0 0 30px', fontFamily: FF }}>
              Why do we wait until <strong style={{ color: GOLD }}>after graduation</strong> to give students real experience? By then, the choice is already made.
            </p>
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: S1, border: '1px solid rgba(222,192,120,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: GOLD }}>N</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: TP, margin: '0 0 2px' }}>Dr. Neha Raghav</p>
              <p style={{ fontSize: '12px', color: GOLD, margin: 0 }}>Director, WeThink Bharat</p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            13. DOMAINS PAGE HERO
        ════════════════════════════════════ */}
        <section style={{
          position: 'relative', minHeight: 'clamp(280px,40vh,420px)', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
          padding: '100px clamp(24px,6vw,64px) 52px', borderBottom: BORDER,
        }}>
          <HeroPageBg />
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(32px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 20px', fontFamily: FF }}>
              Step into the <span style={{ color: GOLD }}>real work.</span>
            </h1>
            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: TS, margin: 0 }}>
              Four complete worlds — each with a simulator, a live project, an industry partner, and proof that lasts.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            14. FEATURE: DOMAINS
        ════════════════════════════════════ */}
        <section id="domains-section" data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <div style={{ borderRadius: '16px', minHeight: '220px', background: S2, border: '1px solid rgba(222,192,120,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '36px' }}>
            <ImgPlaceholder height="220px" />
          </div>
          <SectionLabel>Industry domains</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
            Domains you <span style={{ color: GOLD }}>experience</span>, not just study.
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 24px' }}>
            Each WeThink domain is a complete world: a structured simulator, a live industry brief, an expert mentor network, and a verified credential at the end. Students don't learn about it — they do it.
          </p>
          <button
            onClick={onSchoolFormOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: GOLD, fontSize: '14px', fontWeight: 600, padding: 0, textDecoration: 'underline', fontFamily: FF }}
          >
            Bring domains to my school ↗
          </button>
        </section>

        {/* ════════════════════════════════════
            15. DOMAINS DETAIL (accordion)
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DOMAINS.map((domain, i) => {
              const isOpen = openAccordion === i
              return (
                <div
                  key={domain.num}
                  style={{
                    border: `1px solid ${isOpen ? 'rgba(222,192,120,.36)' : 'rgba(222,192,120,.16)'}`,
                    borderRadius: '16px',
                    background: isOpen ? 'rgba(42,14,5,.6)' : S2,
                    overflow: 'hidden',
                    transition: 'background .25s, border-color .25s',
                  }}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setOpenAccordion(prev => prev === i ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '20px 18px', background: 'none', border: 'none',
                      cursor: 'pointer', textAlign: 'left', fontFamily: FF,
                    }}
                  >
                    <span style={{ fontSize: 'clamp(22px,5vw,36px)', fontWeight: 800, color: 'rgba(222,192,120,.4)', minWidth: '44px', fontFamily: FF }}>{domain.num}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: isOpen ? GOLD : TP, margin: '0 0 4px', fontFamily: FF, transition: 'color .2s' }}>{domain.title}</h3>
                      <p style={{ fontSize: '12px', color: GOLD, margin: 0, fontWeight: 600 }}>{domain.partner}</p>
                    </div>
                    <i
                      className="ti ti-chevron-down"
                      style={{
                        fontSize: '20px', color: GOLD,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform .3s',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {/* Accordion body */}
                  <div style={{
                    maxHeight: isOpen ? '1000px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height .4s cubic-bezier(0.4,0,0.2,1)',
                  }}>
                    <div style={{ padding: '0 18px 24px' }}>
                      {/* Image placeholder */}
                      <div style={{ borderRadius: '12px', height: '180px', background: BG, border: '1px solid rgba(222,192,120,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <ImgPlaceholder height="180px" />
                      </div>

                      {/* Level grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                        {domain.levels.map(l => (
                          <div key={l.level} style={{ background: S2, borderRadius: '10px', padding: '14px' }}>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 5px' }}>{l.level}</p>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: TP, margin: '0 0 5px' }}>{l.title}</p>
                            <p style={{ fontSize: '11px', lineHeight: 1.5, color: TS, margin: 0 }}>{l.body}</p>
                          </div>
                        ))}
                      </div>

                      {/* Outcomes */}
                      <div style={{ borderTop: '1px solid rgba(222,192,120,.12)', paddingTop: '18px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 10px' }}>What students walk away with</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {domain.outcomes.map(item => (
                            <p key={item} style={{ fontSize: '13px', color: TS, margin: 0 }}>
                              <span style={{ color: GOLD, marginRight: '8px' }}>—</span>{item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ════════════════════════════════════
            16. SUMMIT PAGE HERO
        ════════════════════════════════════ */}
        <section id="summit-section" style={{
          position: 'relative', minHeight: 'clamp(280px,40vh,420px)', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
          padding: '100px clamp(24px,6vw,64px) 52px', borderBottom: BORDER,
        }}>
          <HeroPageBg />
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(30px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 20px', fontFamily: FF }}>
              The national stage where student work meets{' '}
              <span style={{ color: GOLD }}>a nation watching.</span>
            </h1>
            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: TS, margin: 0 }}>
              The WeThink Summit is where the journey culminates — live, nationally recognised, and permanently recorded.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            17. WHAT IS THE SUMMIT
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
          <SectionLabel>What is the WeThink Summit</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
            Not a competition. A <span style={{ color: GOLD }}>culmination.</span>
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 14px' }}>
            The WeThink Summit is the moment where everything students have built becomes real. Not a test they pass or fail — a stage they earn their way onto through genuine work across an entire semester.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 24px' }}>
            Student teams present their domain projects — whether a startup pitch, a media package, or a design prototype — to a live audience of industry leaders, educators, and peers from across India.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {['4× per year', 'Pan-India', 'Industry judged', 'Live audience'].map(tag => (
              <span key={tag} style={{ background: 'rgba(222,192,120,.1)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: GOLD }}>
                {tag}
              </span>
            ))}
          </div>

          <SectionLabel>Domain tracks — Season 1</SectionLabel>
          <h3 style={{ fontSize: 'clamp(18px,4vw,24px)', fontWeight: 800, color: TP, margin: '0 0 18px', fontFamily: FF }}>What students compete in</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { n: '01', title: 'Startup Studio — Entrepreneurship', partner: 'NASSCOM 10,000 Startups', active: true },
              { n: '02', title: 'The Newsroom — Media & Communication', partner: 'Brut', active: true },
              { n: '03', title: 'Design Lab — Design & Innovation', partner: 'Canva', active: true },
              { n: '04', title: 'Finance & Investment Track', partner: 'Phase 2', active: false },
              { n: '05', title: 'Public Policy Track', partner: 'Phase 2', active: false },
              { n: '06', title: 'Sports & Wellness Track', partner: 'Phase 2', active: false },
            ].map(row => (
              <div key={row.n} style={{
                border: row.active ? '1px solid rgba(222,192,120,.4)' : '1px solid rgba(222,192,120,.12)',
                background: row.active ? 'rgba(222,192,120,.06)' : 'transparent',
                boxShadow: row.active ? 'inset 4px 0 0 #DEC078' : 'none',
                borderRadius: '12px', padding: '16px 18px 16px 22px',
                opacity: row.active ? 1 : 0.55,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '.1em', marginRight: '10px' }}>{row.n}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: TP }}>{row.title}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: TS }}>{row.partner}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            18. GET INVOLVED
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(40px,6vw,64px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <SectionLabel>Get involved</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 14px', fontFamily: FF }}>
            Three ways to be part of the Summit
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 36px' }}>
            Whether you lead a school, run a company, or simply care about what India's next generation can do — there is a place for you at the WeThink Summit.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ border: '1px solid rgba(222,192,120,.45)', borderRadius: '16px', padding: '24px 22px', background: 'rgba(222,192,120,.04)' }}>
              <i className="ti ti-school" style={{ fontSize: '24px', color: GOLD, display: 'block', marginBottom: '12px' }} />
              <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 6px' }}>For schools</p>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>Nominate your student teams</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: TS, margin: '0 0 18px' }}>Schools that run WeThink domains can nominate their top student teams to present at the national Summit stage.</p>
              <button onClick={onSchoolFormOpen} style={{ background: GOLD, color: BG, border: 'none', borderRadius: '999px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: FF }}>Bring WeThink to my school ↗</button>
            </div>
            <div style={{ border: '1px solid rgba(222,192,120,.16)', borderRadius: '16px', padding: '24px 22px', background: S2 }}>
              <i className="ti ti-building-factory-2" style={{ fontSize: '24px', color: GOLD, display: 'block', marginBottom: '12px' }} />
              <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 6px' }}>For industry</p>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>Join as a jury member</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: TS, margin: '0 0 18px' }}>Industry professionals serve as domain judges — bringing authentic evaluation standards and real-world perspective to student work.</p>
              <button onClick={onPartnerFormOpen} style={{ background: 'rgba(222,192,120,.1)', color: GOLD, border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: FF }}>Express interest ↗</button>
            </div>
            <div style={{ border: '1px solid rgba(222,192,120,.16)', borderRadius: '16px', padding: '24px 22px', background: S2 }}>
              <i className="ti ti-eye" style={{ fontSize: '24px', color: GOLD, display: 'block', marginBottom: '12px' }} />
              <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 6px' }}>For media &amp; observers</p>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>Attend and amplify</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: TS, margin: '0 0 18px' }}>Media professionals, observers, and supporters can attend the Summit as audience members and help tell the story of what India's students are capable of.</p>
              <button onClick={onPartnerFormOpen} style={{ background: 'rgba(222,192,120,.1)', color: GOLD, border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: FF }}>Register interest ↗</button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            19. NUMBERED DISCOVER LIST
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S2, borderBottom: BORDER }}>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 8px', fontFamily: FF }}>
            Everything to <span style={{ color: GOLD }}>discover</span>
          </h2>
          <p style={{ fontSize: '14px', color: TS, margin: '0 0 32px' }}>Tap a strand to explore it.</p>
          <div>
            {[
              { n: '01', label: 'Entrepreneurship', href: '#domains-section' },
              { n: '02', label: 'Media & Communication', href: '#domains-section' },
              { n: '03', label: 'Design & Innovation', href: '#domains-section' },
              { n: '04', label: 'The WeThink Summit', href: '#summit-section' },
            ].map(item => (
              <a
                key={item.n}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: 'clamp(16px,3vw,26px) 4px',
                  borderTop: '1px solid rgba(222,192,120,.14)',
                  textDecoration: 'none',
                  fontSize: 'clamp(18px,5vw,32px)', fontWeight: 800, color: TP, fontFamily: FF,
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 600, color: GOLD, width: '32px', flexShrink: 0 }}>{item.n}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '18px', color: GOLD }}>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            20. ECOSYSTEM PAGE HERO
        ════════════════════════════════════ */}
        <section style={{
          position: 'relative', minHeight: 'clamp(280px,40vh,420px)', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
          padding: '100px clamp(24px,6vw,64px) 52px', borderBottom: BORDER,
        }}>
          <HeroPageBg />
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(30px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 20px', fontFamily: FF }}>
              More than a partnership,{' '}
              <span style={{ color: GOLD }}>a movement.</span>
            </h1>
            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: TS, margin: 0 }}>
              Every organisation in the WeThink ecosystem is here because they believe the same thing — that India's students deserve better, sooner.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            21. ECOSYSTEM (2-col grid)
        ════════════════════════════════════ */}
        <section id="ecosystem-section" data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 36px', fontFamily: FF }}>
            Not just Collaborators.<br />
            <span style={{ color: GOLD }}>Changemakers.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '14px' }}>
            {[
              { icon: 'ti-building-factory-2', label: 'Industry Partners', names: 'NASSCOM · Brut · Canva', body: 'Domain owners — they design the brief, supply the mentor, and judge the final work.' },
              { icon: 'ti-presentation', label: 'Experience Partners', names: 'Summit · Studios', body: 'They create the environments — live stages, immersive studios, and experiential spaces.' },
              { icon: 'ti-school', label: 'Learning Partners', names: 'Educator network', body: 'Schools and educators who run WeThink programs and shape the student journey on the ground.' },
              { icon: 'ti-certificate-2', label: 'Knowledge Partners', names: 'iNEXT', body: 'Research, credential validation, and the intellectual foundation behind every WeThink program.' },
            ].map(c => (
              <div key={c.label} style={{ border: '1px solid rgba(222,192,120,.16)', background: S1, borderRadius: '14px', padding: '20px 18px' }}>
                <i className={`ti ${c.icon}`} style={{ fontSize: '22px', color: GOLD, display: 'block', marginBottom: '12px' }} />
                <p style={{ fontSize: '10px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 5px' }}>{c.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: TP, margin: '0 0 8px', fontFamily: FF }}>{c.names}</p>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: TS, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            22. CURRENT PARTNERS
        ════════════════════════════════════ */}
        <section data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <div style={{ marginBottom: '36px' }}>
            <SectionLabel>Current partners</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 6px', fontFamily: FF }}>
              Who we <span style={{ color: GOLD }}>work with</span>
            </h2>
            <p style={{ fontSize: '14px', color: TS, margin: '0 0 20px' }}>A growing network of Changemakers.</p>
            <button
              onClick={onPartnerFormOpen}
              style={{ background: 'none', border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, color: GOLD, cursor: 'pointer', fontFamily: FF }}
            >
              Join the ecosystem →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { type: 'Industry Partner', name: 'NASSCOM 10,000 Startups', tagline: 'Entrepreneurship Domain Partner', desc: 'India\'s largest startup ecosystem brings its expertise into WeThink schools — designing the Startup Studio domain and serving as the lead industry partner for the Entrepreneurship track.' },
              { type: 'Media Partner', name: 'Brut', tagline: 'Media & Communication Domain Partner', desc: 'The digital-native media organisation behind some of India\'s most impactful journalism brings its newsroom to WeThink — designing the Media & Communication domain and editorial mentorship program.' },
              { type: 'Design Partner', name: 'Canva', tagline: 'Design & Innovation Domain Partner', desc: 'The global design platform joins WeThink as the Design & Innovation domain partner — bringing professional design tools, briefs, and mentors directly into the school environment.' },
            ].map(p => (
              <div key={p.name} style={{ background: S2, border: '1px solid rgba(222,192,120,.16)', borderRadius: '14px', padding: '22px 20px' }}>
                <span style={{ display: 'inline-block', background: 'rgba(222,192,120,.1)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '.08em', marginBottom: '12px' }}>{p.type}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: TP, margin: '0 0 4px', fontFamily: FF }}>{p.name}</h3>
                <p style={{ fontSize: '11px', color: GOLD, margin: '0 0 10px', fontWeight: 600 }}>{p.tagline}</p>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: TS, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            23. JOURNEY PAGE HERO
        ════════════════════════════════════ */}
        <section style={{
          position: 'relative', minHeight: 'clamp(280px,40vh,420px)', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
          padding: '100px clamp(24px,6vw,64px) 52px', borderBottom: BORDER,
        }}>
          <HeroPageBg />
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(30px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 20px', fontFamily: FF }}>
              Five stages. One <span style={{ color: GOLD }}>transformation.</span>
            </h1>
            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: TS, margin: 0 }}>
              The WeThink journey moves students from exposure to permanent proof — through five structured, connected stages that build on each other.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            24. JOURNEY CAROUSEL
        ════════════════════════════════════ */}
        <section id="journey-section" data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', borderBottom: BORDER }}>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 12px', fontFamily: FF }}>
            From exposure to <span style={{ color: GOLD }}>permanent proof</span>
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 48px' }}>
            Each stage is designed to build on the last — so that by the time a student reaches the Summit, they are genuinely ready for it.
          </p>

          {/* Carousel */}
          <div style={{ position: 'relative', width: '100%', height: 'clamp(380px,48vw,520px)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 0, height: 0 }}>
              {JOURNEY_CARDS.map((card, idx) => {
                const t = getCardTransform(idx, activeCard)
                const cardW = 'clamp(190px,48vw,260px)'
                const cardH = 'clamp(280px,68vw,360px)'
                const borderOpacity = 0.18 + (idx === activeCard ? 0.26 : 0)
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCard(idx)}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: cardW,
                      height: cardH,
                      marginLeft: `calc(${cardW} / -2)`,
                      marginTop: `calc(${cardH} / -2)`,
                      borderRadius: '20px',
                      border: `1px solid rgba(222,192,120,${borderOpacity})`,
                      background: CARD_BG[idx] ?? 'linear-gradient(165deg,#3B1407,#2A0E05)',
                      padding: '24px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 24px 52px -22px rgba(0,0,0,.72)',
                      cursor: 'pointer',
                      transition: 'transform .5s cubic-bezier(.4,0,.2,1), opacity .5s ease',
                      transform: t.transform,
                      opacity: t.opacity,
                      zIndex: t.zIndex,
                    }}
                  >
                    <i className={`ti ${card.icon}`} style={{ fontSize: '26px', color: GOLD, marginBottom: '10px' }} />
                    <p style={{ fontSize: '10px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.14em', margin: '0 0 6px' }}>{card.stage}</p>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: TP, margin: '0 0 10px', lineHeight: 1.3, fontFamily: FF }}>{card.title}</h3>
                    <p style={{ fontSize: '12px', lineHeight: 1.6, color: TS, margin: 0, flex: 1 }}>{card.body}</p>
                    <div style={{ marginTop: '14px' }}>
                      <span style={{ background: 'rgba(222,192,120,.12)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, color: GOLD }}>{card.pill}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Prev button */}
            <button
              onClick={() => setActiveCard(c => (c - 1 + JOURNEY_CARDS.length) % JOURNEY_CARDS.length)}
              aria-label="Previous stage"
              style={{
                position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                zIndex: 20, width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(42,14,5,.8)', border: '1px solid rgba(222,192,120,.3)',
                cursor: 'pointer', color: GOLD, fontSize: '18px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <i className="ti ti-chevron-left" />
            </button>

            {/* Next button */}
            <button
              onClick={() => setActiveCard(c => (c + 1) % JOURNEY_CARDS.length)}
              aria-label="Next stage"
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                zIndex: 20, width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(42,14,5,.8)', border: '1px solid rgba(222,192,120,.3)',
                cursor: 'pointer', color: GOLD, fontSize: '18px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <i className="ti ti-chevron-right" />
            </button>

            {/* Hint */}
            <p style={{
              position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)',
              fontSize: '11px', color: 'rgba(224,206,189,.4)', whiteSpace: 'nowrap', zIndex: 20,
            }}>
              Tap a card to bring it forward
            </p>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {JOURNEY_CARDS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCard(idx)}
                aria-label={`Go to stage ${idx + 1}`}
                style={{
                  width: idx === activeCard ? '22px' : '8px', height: '8px',
                  borderRadius: '999px', border: 'none', cursor: 'pointer',
                  background: idx === activeCard ? GOLD : 'rgba(222,192,120,.25)',
                  transition: 'all .3s ease', padding: 0,
                }}
              />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            25. ADVISORY PAGE HERO
        ════════════════════════════════════ */}
        <section style={{
          position: 'relative', minHeight: 'clamp(280px,40vh,420px)', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
          padding: '100px clamp(24px,6vw,64px) 52px', borderBottom: BORDER,
        }}>
          <HeroPageBg />
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(28px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, color: TP, margin: '0 0 20px', fontFamily: FF }}>
              Leaders who believe the system can — and{' '}
              <span style={{ color: GOLD }}>must change.</span>
            </h1>
            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: TS, margin: 0 }}>
              The WeThink Advisory Board is composed of India's most respected institution builders — educational leaders who don't just endorse the mission, they hold it accountable.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════
            26. ADVISORY FLIP GRID (2-col, tap to flip)
        ════════════════════════════════════ */}
        <section id="advisory-section" data-reveal="" style={{ padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)', background: S1, borderBottom: BORDER }}>
          <h2 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 12px', fontFamily: FF }}>
            The people who keep the work <span style={{ color: GOLD }}>honest.</span>
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: '0 0 40px' }}>
            Educators, institution builders, and industry leaders who bring decades of real-world experience to WeThink's strategic direction.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '14px' }}>
            {/* Named members */}
            {NAMED_MEMBERS.map((member, idx) => {
              const isFlipped = flippedCards.has(idx)
              return (
                <div
                  key={idx}
                  onClick={() => toggleFlip(idx)}
                  style={{ perspective: '1600px', height: '380px', cursor: 'pointer', position: 'relative' }}
                >
                  <div style={{
                    position: 'relative', width: '100%', height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}>
                    {/* Front */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                      background: S2, borderRadius: '14px',
                      border: '1px solid rgba(222,192,120,.18)', overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                    }}>
                      <div style={{ flex: 1, background: S1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '32px', color: 'rgba(222,192,120,.15)' }}>{member.name[0]}</span>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(36,10,3,.5) 0%,rgba(36,10,3,0) 60%)' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(36,10,3,.7)', border: '1px solid rgba(222,192,120,.25)', borderRadius: '999px', padding: '3px 8px', fontSize: '10px', fontWeight: 700, color: GOLD }}>
                          {member.num}
                        </div>
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(222,192,120,.15)', border: '1px solid rgba(222,192,120,.3)', borderRadius: '999px', padding: '3px 8px', fontSize: '10px', fontWeight: 600, color: GOLD }}>
                          Tap ↻
                        </div>
                      </div>
                      <div style={{ padding: '13px 14px 15px', background: S2, borderTop: '1px solid rgba(222,192,120,.14)' }}>
                        <p style={{ fontSize: '13px', fontWeight: 800, color: TP, margin: '0 0 2px', fontFamily: FF }}>{member.name}</p>
                        <p style={{ fontSize: '11px', color: GOLD, margin: '0 0 2px' }}>{member.role}</p>
                        <p style={{ fontSize: '10px', color: TS, margin: 0 }}>{member.sub}</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(165deg,#3B1407,#2A0E05)',
                      border: '1px solid rgba(222,192,120,.34)', borderRadius: '14px',
                      padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '10px',
                    }}>
                      <div style={{ fontFamily: 'Georgia,serif', fontSize: '52px', color: '#8C3623', lineHeight: 0.8 }}>"</div>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.12em', margin: 0 }}>{member.name}</p>
                      <p style={{ fontSize: '12px', lineHeight: 1.6, color: TS, margin: 0, flex: 1 }}>{member.bio}</p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* TBA seats */}
            {TBA_SEATS.map((seat, idx) => (
              <div
                key={`tba-${idx}`}
                style={{
                  height: '380px', borderRadius: '14px',
                  border: '1px dashed rgba(222,192,120,.2)',
                  background: 'rgba(42,14,5,.4)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '16px',
                }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(222,192,120,.07)', border: '1px dashed rgba(222,192,120,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: 'rgba(222,192,120,.3)' }}>
                  {seat.initial}
                </div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(245,238,226,.35)', margin: 0, textAlign: 'center' }}>Advisory seat</p>
                <p style={{ fontSize: '11px', color: 'rgba(222,192,120,.35)', margin: 0, textAlign: 'center' }}>{seat.category}</p>
                <p style={{ fontSize: '10px', color: 'rgba(224,206,189,.3)', margin: 0, textAlign: 'center' }}>Announcing · Season 1</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            27. APPLY CTA
        ════════════════════════════════════ */}
        <section id="apply" data-reveal="" style={{
          padding: 'clamp(64px,9vw,120px) clamp(24px,6vw,64px)',
          background: S1, textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden="true" style={{
            position: 'absolute', right: '-8%', bottom: '-12%',
            fontSize: 'clamp(80px,22vw,200px)', fontWeight: 800,
            color: 'rgba(222,192,120,.04)', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}>
            APPLY
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(24px,6vw,44px)', fontWeight: 800, letterSpacing: '-0.02em', color: TP, margin: '0 0 16px', fontFamily: FF }}>
              Your students are ready for a <span style={{ color: GOLD }}>national stage.</span>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: TS, margin: '0 auto 32px', maxWidth: '480px' }}>
              Season 1 nominations are open now. Bring WeThink Bharat to your school and give your students the experience that changes everything.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={onSchoolFormOpen}
                style={{ background: GOLD, color: BG, padding: '16px 32px', borderRadius: '999px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: FF }}
              >
                Bring WeThink to my school ↗
              </button>
              <button
                onClick={onPartnerFormOpen}
                style={{ background: 'rgba(52,15,5,.4)', color: TP, border: '1px solid rgba(224,206,189,.3)', padding: '16px 32px', borderRadius: '999px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: FF }}
              >
                Partner with us
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            28. FOOTER
        ════════════════════════════════════ */}
        <footer style={{ padding: 'clamp(44px,7vw,64px) clamp(24px,6vw,64px) 40px', background: S1, borderTop: '1px solid rgba(222,192,120,.14)' }}>
          {/* Partner CTA card */}
          <div style={{
            border: '1px solid rgba(222,192,120,.2)', borderRadius: '18px',
            padding: 'clamp(24px,4vw,40px)',
            background: 'linear-gradient(120deg,#340F05,#2A0E05)',
            marginBottom: '48px',
          }}>
            <div style={{ maxWidth: '560px', marginBottom: '24px' }}>
              <SectionLabel>Partner with us</SectionLabel>
              <h3 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: TP, margin: '0 0 10px', fontFamily: FF }}>
                Build the future of Young Bharat with us
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: TS, margin: 0 }}>
                Whether you are an industry leader, an educator, a media organisation, or a policymaker — there is a role for you in the WeThink ecosystem.
              </p>
            </div>
            <button
              onClick={onPartnerFormOpen}
              style={{ background: GOLD, color: BG, padding: '13px 26px', borderRadius: '999px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: FF }}
            >
              Become a partner ↗
            </button>
          </div>

          {/* Footer grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
            <div>
              <p style={{ fontSize: '20px', fontWeight: 800, color: TP, margin: '0 0 6px', fontFamily: FF }}>
                <span style={{ color: TP }}>wethink</span><span style={{ color: GOLD }}>bharat</span>
              </p>
              <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(224,206,189,.55)', margin: 0 }}>An initiative of Viksit Bharat Foundation</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 14px' }}>Explore</p>
                {[
                  { label: 'Who we build for', href: '#pathways' },
                  { label: 'Domains', href: '#domains-section' },
                  { label: 'WeThink Summit', href: '#summit-section' },
                  { label: 'The journey', href: '#journey-section' },
                ].map(l => (
                  <a key={l.href} href={l.href} style={{ display: 'block', fontSize: '13px', color: TS, textDecoration: 'none', marginBottom: '9px' }}>{l.label}</a>
                ))}
              </div>

              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 14px' }}>Connect</p>
                <button onClick={onSchoolFormOpen} style={{ display: 'block', fontSize: '13px', color: TS, background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 9px', fontFamily: FF, textAlign: 'left' }}>School enquiry</button>
                <button onClick={onPartnerFormOpen} style={{ display: 'block', fontSize: '13px', color: TS, background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 9px', fontFamily: FF, textAlign: 'left' }}>Partner with us</button>
                <a href="#advisory-section" style={{ display: 'block', fontSize: '13px', color: TS, textDecoration: 'none', marginBottom: '9px' }}>Advisory board</a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: '1px solid rgba(222,192,120,.1)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(224,206,189,.4)', margin: 0 }}>
              © 2026 WeThink Bharat. All rights reserved.
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(224,206,189,.4)', margin: 0 }}>
              A national experiential learning movement.
            </p>
          </div>
        </footer>
      </main>

      {/* ════════════════════════════════════
          29. BOTTOM TAB BAR (fixed)
      ════════════════════════════════════ */}
      <nav style={{
        position: 'fixed',
        left: 0, right: 0, bottom: 0,
        height: 'calc(60px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'rgba(30,8,2,.94)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(222,192,120,.18)',
        display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
        zIndex: 200,
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              aria-label={tab.label}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: FF,
                color: isActive ? GOLD : 'rgba(224,206,189,.6)',
                transition: 'color .2s',
              }}
            >
              <i className={`ti ${tab.icon}`} style={{ fontSize: '21px' }} />
              <span style={{ fontSize: '9.5px', fontWeight: 600, letterSpacing: '.04em' }}>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      {/* ════════════════════════════════════
          30. BOTTOM SHEET (Menu)
      ════════════════════════════════════ */}
      {sheetOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 210 }}>
          {/* Backdrop */}
          <div
            onClick={closeSheet}
            style={{ position: 'absolute', inset: 0, background: 'rgba(20,6,2,.6)', backdropFilter: 'blur(3px)' }}
          />
          {/* Card */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: '#240A03',
            borderTop: '1px solid rgba(222,192,120,.2)',
            borderRadius: '22px 22px 0 0',
            padding: `14px 18px calc(20px + env(safe-area-inset-bottom))`,
            animation: 'wtbFadeUp .28s ease',
          }}>
            {/* Drag handle */}
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(224,206,189,.3)', margin: '0 auto 12px' }} />

            {/* Sheet links */}
            {[
              { icon: 'ti-eye', label: 'Vision', target: '#vision-section' },
              { icon: 'ti-affiliate', label: 'Ecosystem', target: '#ecosystem-section' },
              { icon: 'ti-users-group', label: 'Advisory Board', target: '#advisory-section' },
              { icon: 'ti-send', label: 'Bring to my school', target: null },
            ].map(link => (
              <a
                key={link.label}
                href={link.target ?? '#'}
                onClick={(e) => {
                  e.preventDefault()
                  if (link.target === null) {
                    closeSheet()
                    setTimeout(() => onSchoolFormOpen(), 120)
                  } else {
                    closeSheet()
                    setTimeout(() => scrollTo(link.target!), 120)
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 8px',
                  textDecoration: 'none', color: link.target === null ? GOLD : TP,
                  fontSize: '17px', fontWeight: 600,
                  borderBottom: link.target === null ? 'none' : '1px solid rgba(222,192,120,.1)',
                  fontFamily: FF,
                }}
              >
                <i className={`ti ${link.icon}`} style={{ fontSize: '20px', color: GOLD }} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════
          31. BACK TO TOP (fixed)
      ════════════════════════════════════ */}
      {backToTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', right: '16px', bottom: 'calc(72px + env(safe-area-inset-bottom))', zIndex: 180,
            width: '42px', height: '42px', borderRadius: '50%',
            background: GOLD, color: BG, border: 'none', cursor: 'pointer',
            fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,.4)',
          }}
        >
          ↑
        </button>
      )}
    </div>
  )
}
