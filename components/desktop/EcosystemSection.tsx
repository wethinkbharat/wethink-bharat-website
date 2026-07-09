'use client'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { EcosystemIntro, PartnerCategory, CurrentPartner } from '@/sanity/types'

interface Props {
  intro: EcosystemIntro | null
  categories: PartnerCategory[]
  partners: CurrentPartner[]
}

const DEFAULT_MARQUEE_NAMES = ['NASSCOM', 'Brut', 'Canva', 'iNEXT']
// Duplicate 3× for a seamless loop with plenty of content
const MARQUEE_ITEMS = [...DEFAULT_MARQUEE_NAMES, ...DEFAULT_MARQUEE_NAMES, ...DEFAULT_MARQUEE_NAMES]

const DEFAULT_CATEGORIES: PartnerCategory[] = [
  {
    _id: 'c1',
    _type: 'partnerCategory',
    name: 'Industry Partners',
    description: 'Real briefs, real mentors, and the standards students are measured against.',
  },
  {
    _id: 'c2',
    _type: 'partnerCategory',
    name: 'Experience Partners',
    description: 'Pedagogy and frameworks that keep classrooms current with industry.',
  },
  {
    _id: 'c3',
    _type: 'partnerCategory',
    name: 'Learning Partners',
    description: 'Educator networks and curriculum integration support.',
  },
  {
    _id: 'c4',
    _type: 'partnerCategory',
    name: 'Knowledge Partners',
    description: 'Research, policy, and institutional knowledge that shapes the programme.',
  },
]

export function EcosystemSection({ intro, categories, partners }: Props) {
  const displayCategories = categories.length ? categories : DEFAULT_CATEGORIES

  return (
    <section id="ecosystem" className="section-py" style={{ background: '#2A0E05' }}>
      <div className="wtb-container">
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            {intro?.kicker ?? 'Ecosystem partners'}
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
              maxWidth: '700px',
              marginBottom: '16px',
              marginTop: '16px',
            }}
          >
            Built with the world&apos;s{' '}
            <span style={{ color: '#DEC078' }}>leading organisations.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p
            style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              color: '#E0CEBD',
              maxWidth: '560px',
              lineHeight: 1.65,
              marginBottom: '64px',
            }}
          >
            {intro?.subtext ??
              "Industry, experience, learning, and knowledge partners — each bringing real briefs, real mentors, and real platforms to India's students."}
          </p>
        </ScrollReveal>

        {/* Marquee */}
        <div
          style={{
            overflow: 'hidden',
            marginBottom: '64px',
            borderTop: '1px solid rgba(222,192,120,0.14)',
            borderBottom: '1px solid rgba(222,192,120,0.14)',
            padding: '24px 0',
          }}
        >
          <div className="marquee-track" style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
            {MARQUEE_ITEMS.map((name, i) => (
              <span
                key={i}
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 28px)',
                  fontWeight: 700,
                  color: 'rgba(224,206,189,0.35)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.01em',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Partner categories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {displayCategories.map((cat, i) => (
            <ScrollReveal key={cat._id} delay={i * 0.08}>
              <div
                style={{
                  background: '#340F05',
                  border: '1px solid rgba(222,192,120,0.14)',
                  borderRadius: '14px',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#DEC078',
                    marginBottom: '10px',
                  }}
                >
                  {cat.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#E0CEBD',
                    lineHeight: 1.6,
                  }}
                >
                  {cat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Current partners */}
        {partners.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {partners.map((partner, i) => (
              <ScrollReveal key={partner._id} delay={i * 0.1}>
                <div
                  style={{
                    background: 'rgba(222,192,120,0.04)',
                    border: '1px solid rgba(222,192,120,0.12)',
                    borderRadius: '14px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#F5EEE2' }}>
                    {partner.name}
                  </div>
                  {partner.type && (
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#DEC078',
                      }}
                    >
                      {partner.type}
                    </div>
                  )}
                  {partner.description && (
                    <p style={{ fontSize: '14px', color: '#E0CEBD', lineHeight: 1.6 }}>
                      {partner.description}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
