import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { BeliefsIntro, Belief } from '@/sanity/types'

interface Props {
  intro: BeliefsIntro | null
  beliefs: Belief[]
}

const DEFAULT_BELIEFS: Belief[] = [
  {
    _id: 'b1',
    _type: 'belief',
    number: 1,
    title: 'Experience is the only real teacher',
    body: 'Reading about entrepreneurship and running a startup simulation are not the same thing. We build experiences — not content.',
  },
  {
    _id: 'b2',
    _type: 'belief',
    number: 2,
    title: 'Every student has undiscovered capability',
    body: 'Potential is universally present. The system just hasn\'t created the conditions to find it yet.',
  },
  {
    _id: 'b3',
    _type: 'belief',
    number: 3,
    title: 'Industry must come to the student',
    body: 'We cannot wait for students to graduate before industry engages them. The relationship must begin at school — and it must be real.',
  },
  {
    _id: 'b4',
    _type: 'belief',
    number: 4,
    title: 'Failure in a safe space is a gift',
    body: 'A student who has failed at a simulated pitch is infinitely better prepared than one who has never tried.',
  },
  {
    _id: 'b5',
    _type: 'belief',
    number: 5,
    title: 'A digital footprint is a student\'s first asset',
    body: 'Before a degree, before a job — a student deserves something permanently, globally, verifiably theirs.',
  },
  {
    _id: 'b6',
    _type: 'belief',
    number: 6,
    title: 'Scale is the only measure that matters',
    body: 'A program that changes 100 students is a project. A movement that changes a generation is what WeThink Bharat is built to be.',
  },
]

export function BeliefsSection({ intro, beliefs }: Props) {
  const displayBeliefs = beliefs.length ? beliefs : DEFAULT_BELIEFS

  return (
    <section id="beliefs" className="section-py" style={{ background: '#240A03' }}>
      <div className="wtb-container">
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            {intro?.kicker ?? 'What we believe'}
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
              marginBottom: '24px',
              marginTop: '16px',
            }}
          >
            Six convictions that drive everything we{' '}
            <span style={{ color: '#DEC078' }}>build</span>
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
            {intro?.intro ??
              'Not values on a wall — design principles behind every simulator, every project brief, every partner conversation.'}
          </p>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {displayBeliefs.map((belief, i) => (
            <ScrollReveal key={belief._id} delay={i * 0.08}>
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
                    fontSize: '48px',
                    fontWeight: 800,
                    color: 'rgba(222,192,120,0.2)',
                    lineHeight: 1,
                    marginBottom: '20px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {String(belief.number ?? i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F5EEE2',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {belief.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#E0CEBD',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {belief.body ?? ''}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
