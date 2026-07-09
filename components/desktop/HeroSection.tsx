'use client'
import { useEffect, useRef } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import type { Hero } from '@/sanity/types'

interface Props {
  hero: Hero | null
  onSchoolFormOpen: () => void
}

export function HeroSection({ hero, onSchoolFormOpen }: Props) {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToDomains = () => {
    const el = document.querySelector('#domains')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(150deg, #340F05 0%, #240A03 100%)',
      }}
    >
      {/* Parallax radial glow */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(222,192,120,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="wtb-container"
        style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Season badge */}
        <ScrollReveal delay={0}>
          <div style={{ marginBottom: '40px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(222,192,120,0.1)',
                border: '1px solid rgba(222,192,120,0.24)',
                borderRadius: '100px',
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#DEC078',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span
                className="pulse"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#DEC078',
                  flexShrink: 0,
                }}
              />
              {hero?.seasonBanner ?? 'Season 1 · school nominations open'}
            </span>
          </div>
        </ScrollReveal>

        {/* Headline — use PortableText if available, otherwise fallback */}
        <ScrollReveal delay={0.1}>
          {hero?.headline?.length ? (
            <PortableTextRenderer
              blocks={hero.headline}
              className="text-hero-xl text-lace"
              style={{
                maxWidth: '900px',
                marginBottom: '28px',
              } as React.CSSProperties}
            />
          ) : (
            <h1
              className="text-hero-xl text-lace"
              style={{ maxWidth: '900px', marginBottom: '28px' }}
            >
              India&apos;s students deserve to{' '}
              <span className="text-gold">discover</span> before they choose
            </h1>
          )}
        </ScrollReveal>

        {/* Subcopy */}
        <ScrollReveal delay={0.2}>
          <p
            className="text-body-lg text-almond"
            style={{ maxWidth: '600px', marginBottom: '40px' }}
          >
            {hero?.subcopy ??
              'WeThink Bharat brings real industry into schools — through domain simulators, live projects, and a permanent digital footprint that belongs to every student forever.'}
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={0.3}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '80px',
            }}
          >
            <button className="btn-gold" onClick={scrollToDomains}>
              {hero?.primaryCtaLabel ?? 'Explore the domains'}
            </button>
            <button className="btn-ghost" onClick={onSchoolFormOpen}>
              {hero?.secondaryCtaLabel ?? 'Bring to my school'}
            </button>
          </div>
        </ScrollReveal>

        {/* Domains strip */}
        <ScrollReveal delay={0.4}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderTop: '1px solid rgba(222,192,120,0.14)',
              paddingTop: '20px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#DEC078',
                flexShrink: 0,
              }}
            />
            <span
              className="text-almond"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {hero?.domainsStrip ??
                '3 industry domains live now — Entrepreneurship, Media & Design'}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll cue */}
      <div
        className="bob"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(224,206,189,0.4)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        {hero?.scrollCueText ?? 'Scroll'}
      </div>
    </section>
  )
}
