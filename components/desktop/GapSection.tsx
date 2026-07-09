import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { CountUp } from '@/components/shared/CountUp'
import type { GapSection as GapSectionType, GapStat } from '@/sanity/types'

interface Props {
  gap: GapSectionType | null
}

const DEFAULT_STATS: GapStat[] = [
  {
    _key: 'gs1',
    value: '65',
    suffix: '%',
    label: 'Graduates Unemployable',
    description:
      'of Indian graduates are considered unprepared for work by employers — not for lack of intelligence, but lack of experience.',
  },
  {
    _key: 'gs2',
    value: '93',
    suffix: '%',
    label: 'No Career Exposure',
    description:
      'of school students in India have never had any real interaction with a working professional in their area of interest.',
  },
  {
    _key: 'gs3',
    value: '1.5',
    suffix: 'Cr+',
    label: 'Students Enter Workforce Yearly',
    description:
      'students enter the Indian workforce every year having made their most important life decision based on almost no real-world exposure.',
  },
]

export function GapSection({ gap }: Props) {
  const stats: GapStat[] = gap?.stats?.length ? gap.stats : DEFAULT_STATS

  return (
    <section id="gap" className="section-py" style={{ background: '#2A0E05' }}>
      <div className="wtb-container">
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            {gap?.kicker ?? 'The gap'}
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
              marginBottom: '64px',
              marginTop: '16px',
            }}
          >
            Educated unemployment begins with{' '}
            <span style={{ color: '#DEC078' }}>uninformed choices.</span>
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            borderTop: '1px solid rgba(222,192,120,0.14)',
          }}
        >
          {stats.map((stat, i) => (
            <ScrollReveal key={stat._key} delay={i * 0.1}>
              <div
                style={{
                  padding: '48px 0',
                  paddingRight: i < 2 ? '48px' : 0,
                  paddingLeft: i > 0 ? '48px' : 0,
                  borderRight: i < 2 ? '1px solid rgba(222,192,120,0.14)' : 'none',
                }}
              >
                <div className="stat-value">
                  <CountUp value={stat.value} suffix={stat.suffix ?? ''} />
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#DEC078',
                    margin: '16px 0 12px',
                  }}
                >
                  {stat.label}
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#E0CEBD',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {stat.description ?? ''}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
