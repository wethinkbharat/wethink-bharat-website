'use client'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { Summit } from '@/sanity/types'

interface Props {
  summit: Summit | null
  onSchoolFormOpen: () => void
  onPartnerFormOpen: () => void
}

export function SummitSection({ summit, onSchoolFormOpen, onPartnerFormOpen }: Props) {
  const defaultChips = ['4× per year', 'Pan-India', 'Industry Judges', 'Permanent Record']
  const chips = summit?.statChips?.length ? summit.statChips : defaultChips

  const defaultCards = [
    {
      audience: 'For Students',
      title: 'Earn your place at the Summit',
      description: 'Complete your domain journey and bring your best work to the national stage.',
      ctaLabel: 'Join your school',
      ctaLink: '#school-form',
    },
    {
      audience: 'For Schools',
      title: 'Send your students to the Summit',
      description: 'Register your school and give your students a national platform for their work.',
      ctaLabel: 'Register your school',
      ctaLink: '#school-form',
    },
    {
      audience: 'For Partners',
      title: 'Judge, mentor, and shape the Summit',
      description: 'Bring your expertise to the jury table and help recognise the next generation.',
      ctaLabel: 'Become a partner',
      ctaLink: '#partner-form',
    },
  ]
  const cards = summit?.getInvolvedCards?.length ? summit.getInvolvedCards : defaultCards

  const handleCardCta = (link: string) => {
    if (link === '#school-form') { onSchoolFormOpen(); return }
    if (link === '#partner-form') { onPartnerFormOpen(); return }
    const el = document.querySelector(link)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="summit"
      className="section-py"
      style={{
        background: 'linear-gradient(150deg, #340F05 0%, #240A03 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(140px, 24vw, 340px)',
          fontWeight: 800,
          color: 'rgba(222,192,120,0.05)',
          letterSpacing: '-0.05em',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        SUMMIT
      </div>

      <div className="wtb-container" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            The WeThink Summit
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            style={{
              fontSize: 'clamp(30px, 4.8vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#F5EEE2',
              maxWidth: '760px',
              marginBottom: '32px',
              marginTop: '16px',
            }}
          >
            Where a school project becomes a{' '}
            <span style={{ color: '#DEC078' }}>national moment.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              fontWeight: 500,
              color: '#E0CEBD',
              maxWidth: '640px',
              lineHeight: 1.65,
              marginBottom: '48px',
            }}
          >
            {summit?.pullQuote ??
              'Four times a year, the strongest student teams from across India take a national stage — real work, real industry judges, and real recognition that lasts a lifetime.'}
          </p>
        </ScrollReveal>

        {/* Stat chips */}
        <ScrollReveal delay={0.2}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '80px' }}>
            {chips.map((chip, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'rgba(222,192,120,0.1)',
                  border: '1px solid rgba(222,192,120,0.24)',
                  borderRadius: '100px',
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#DEC078',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Get involved cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                style={{
                  background: '#340F05',
                  border: '1px solid rgba(222,192,120,0.14)',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#DEC078',
                    marginBottom: '16px',
                  }}
                >
                  {card.audience}
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#F5EEE2',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#E0CEBD',
                    lineHeight: 1.65,
                    flex: 1,
                    marginBottom: '24px',
                  }}
                >
                  {card.description}
                </p>
                <button
                  className="btn-gold"
                  onClick={() => handleCardCta(card.ctaLink ?? '#school-form')}
                >
                  {card.ctaLabel} ↗
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
