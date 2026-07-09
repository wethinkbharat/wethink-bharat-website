import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import type { VisionSection as VisionType } from '@/sanity/types'

interface Props {
  vision: VisionType | null
}

const PVM_DEFAULTS = [
  {
    key: 'purpose',
    label: 'Purpose',
    text: 'Expose every student to the real world of work — early, and for real.',
  },
  {
    key: 'vision',
    label: 'Vision',
    text: 'A generation that enters adulthood already knowing what it is capable of.',
  },
  {
    key: 'mission',
    label: 'Mission',
    text: 'Real briefs, real mentors, and permanent proof — inside every school.',
  },
] as const

export function VisionSection({ vision }: Props) {
  const pvmItems = [
    {
      key: 'purpose',
      label: vision?.purpose?.label ?? PVM_DEFAULTS[0].label,
      text: vision?.purpose?.text ?? PVM_DEFAULTS[0].text,
    },
    {
      key: 'vision',
      label: vision?.vision?.label ?? PVM_DEFAULTS[1].label,
      text: vision?.vision?.text ?? PVM_DEFAULTS[1].text,
    },
    {
      key: 'mission',
      label: vision?.mission?.label ?? PVM_DEFAULTS[2].label,
      text: vision?.mission?.text ?? PVM_DEFAULTS[2].text,
    },
  ]

  return (
    <section
      id="vision"
      className="section-py"
      style={{ background: '#2A0E05' }}
    >
      <div className="wtb-container">
        {/* Kicker */}
        <ScrollReveal>
          <span className="kicker" style={{ marginBottom: '48px' }}>
            {vision?.kicker ?? 'Our vision'}
          </span>
        </ScrollReveal>

        {/* Two-tone heading */}
        <ScrollReveal delay={0.1}>
          <h2
            className="text-h2-xl text-lace"
            style={{
              maxWidth: '820px',
              marginBottom: '48px',
              marginTop: '24px',
            }}
          >
            {vision?.heading ? (
              vision.heading
            ) : (
              <>
                A Bharat where every student discovers their{' '}
                <span className="text-gold">capability</span> before they ever
                have to choose a path.
              </>
            )}
          </h2>
        </ScrollReveal>

        {/* Body portable text */}
        {vision?.bodyBlocks?.length ? (
          <ScrollReveal delay={0.15}>
            <PortableTextRenderer
              blocks={vision.bodyBlocks}
              className="text-body-lg text-almond"
              style={{ maxWidth: '720px', marginBottom: '48px' } as React.CSSProperties}
            />
          </ScrollReveal>
        ) : null}

        {/* Director pull-quote */}
        <ScrollReveal delay={0.2}>
          <blockquote
            style={{
              position: 'relative',
              borderLeft: '2px solid rgba(222,192,120,0.3)',
              paddingLeft: '32px',
              marginBottom: '80px',
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            {/* Decorative Georgia open-quote glyph */}
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '80px',
                color: '#8C3623',
                lineHeight: 0.5,
                display: 'block',
                marginBottom: '16px',
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="text-lace"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                fontWeight: 700,
                fontStyle: 'italic',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {vision?.directorQuote ??
                'Why do we wait until after graduation to give students real experience? By then, the choice is already made.'}
            </p>
          </blockquote>
        </ScrollReveal>

        {/* Purpose / Vision / Mission trio */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {pvmItems.map((item, i) => (
            <ScrollReveal key={item.key} delay={i * 0.1}>
              <div
                style={{
                  background: '#340F05',
                  border: '1px solid rgba(222,192,120,0.14)',
                  borderRadius: '16px',
                  padding: '32px',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#DEC078',
                    marginBottom: '16px',
                  }}
                >
                  {item.label}
                </div>
                <p
                  className="text-almond"
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
