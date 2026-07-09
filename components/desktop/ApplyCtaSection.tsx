import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { ApplyCta } from '@/sanity/types'

interface Props {
  cta: ApplyCta | null
  onSchoolFormOpen: () => void
  onPartnerFormOpen: () => void
}

const RIGHT_CARDS = [
  {
    label: 'For Schools',
    text: 'Register your school and bring a structured experiential curriculum to your students.',
  },
  {
    label: 'For Industry',
    text: "Bring real briefs, real mentors, and your organisation's standards to the next generation.",
  },
  {
    label: 'For Educators',
    text: "Join India's most progressive educator community and reshape what school can be.",
  },
]

export function ApplyCtaSection({ cta, onSchoolFormOpen, onPartnerFormOpen }: Props) {
  return (
    <section
      id="apply"
      className="section-py"
      style={{ background: '#2A0E05', position: 'relative', overflow: 'hidden' }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(222,192,120,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wtb-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Left: text + CTAs */}
          <div>
            <ScrollReveal>
              <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
                Partner with us
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#F5EEE2',
                  marginBottom: '24px',
                  marginTop: '16px',
                }}
              >
                {cta?.heading ?? 'Build the future of Young Bharat with us.'}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p
                style={{
                  fontSize: 'clamp(15px, 1.4vw, 18px)',
                  color: '#E0CEBD',
                  lineHeight: 1.65,
                  marginBottom: '40px',
                }}
              >
                {cta?.body ??
                  "Whether you're a school ready to bring experiential learning to your students, or an organisation that wants to be part of a national movement — we'd love to work with you."}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button className="btn-gold" onClick={onSchoolFormOpen}>
                  {cta?.primaryCtaLabel ?? 'Bring WeThink to my school ↗'}
                </button>
                <button className="btn-ghost" onClick={onPartnerFormOpen}>
                  {cta?.secondaryCtaLabel ?? 'Become a partner ↗'}
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: audience info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {RIGHT_CARDS.map((item, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.1}>
                <div
                  style={{
                    background: '#340F05',
                    border: '1px solid rgba(222,192,120,0.14)',
                    borderRadius: '14px',
                    padding: '24px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#DEC078',
                      marginBottom: '8px',
                    }}
                  >
                    {item.label}
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#E0CEBD',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
