'use client'
import { useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { JourneyIntro, JourneyStage } from '@/sanity/types'

interface Props {
  intro: JourneyIntro | null
  stages: JourneyStage[]
}

const DEFAULT_STAGES: JourneyStage[] = [
  {
    _id: 'j1',
    _type: 'journeyStage',
    number: 1,
    name: 'OPEN',
    durationLabel: '2 days',
    description:
      'Gamified exposure to a real domain before any training begins — so students choose from experience, not guesswork.',
  },
  {
    _id: 'j2',
    _type: 'journeyStage',
    number: 2,
    name: 'LIVE',
    durationLabel: '2 weeks',
    description:
      'A live industry project with a real deadline and a real client — the way work actually happens.',
  },
  {
    _id: 'j3',
    _type: 'journeyStage',
    number: 3,
    name: 'CIRCLE',
    durationLabel: 'Ongoing',
    description:
      'Domain, Process, Peer, and Master Mentors support every student at every stage of the journey.',
  },
  {
    _id: 'j4',
    _type: 'journeyStage',
    number: 4,
    name: 'SUMMIT',
    durationLabel: '4× / year',
    description:
      'Students pitch their work to a jury of industry partners — four times a year, in front of the country.',
  },
  {
    _id: 'j5',
    _type: 'journeyStage',
    number: 5,
    name: 'IMPRINT',
    durationLabel: 'Permanent',
    description:
      'A permanent, verifiable Digital Footprint of everything they built, powered by iNEXT.',
  },
]

export function JourneySection({ intro, stages }: Props) {
  const [active, setActive] = useState(0)
  const displayStages = stages.length ? stages : DEFAULT_STAGES

  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = index - active
    const absOffset = Math.abs(offset)
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) translateX(${offset * 280}px) scale(${1 - absOffset * 0.12})`,
      opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
      zIndex: 10 - absOffset,
      transition: 'all 0.5s cubic-bezier(0.2, 0.75, 0.2, 1)',
      pointerEvents: absOffset > 2 ? 'none' : 'auto',
      cursor: offset !== 0 ? 'pointer' : 'default',
      width: '320px',
    }
  }

  return (
    <section id="journey" className="section-py" style={{ background: '#240A03' }}>
      <div className="wtb-container">
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            {intro?.kicker ?? 'The journey'}
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
              maxWidth: '600px',
              marginBottom: '80px',
              marginTop: '16px',
            }}
          >
            Five stages.{' '}
            <span style={{ color: '#DEC078' }}>One complete experience.</span>
          </h2>
        </ScrollReveal>

        {/* Carousel */}
        <div style={{ position: 'relative', height: '380px', overflow: 'visible' }}>
          {displayStages.map((stage, i) => (
            <div
              key={stage._id}
              style={getCardStyle(i)}
              onClick={() => setActive(i)}
            >
              <div
                style={{
                  background: i === active ? '#340F05' : '#2A0E05',
                  border: `1px solid ${i === active ? 'rgba(222,192,120,0.45)' : 'rgba(222,192,120,0.14)'}`,
                  borderRadius: '20px',
                  padding: '40px 32px',
                  height: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background 0.4s, border-color 0.4s',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#DEC078',
                    marginBottom: '16px',
                  }}
                >
                  Phase {String(stage.number ?? i + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 800,
                    color: '#F5EEE2',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}
                >
                  {stage.name}
                </div>
                {stage.durationLabel && (
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(222,192,120,0.6)',
                      background: 'rgba(222,192,120,0.08)',
                      borderRadius: '100px',
                      padding: '4px 12px',
                      display: 'inline-block',
                      marginBottom: '24px',
                      width: 'fit-content',
                    }}
                  >
                    {stage.durationLabel}
                  </div>
                )}
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#E0CEBD',
                    lineHeight: 1.65,
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {stage.description ?? ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '48px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous stage"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(222,192,120,0.1)',
              border: '1px solid rgba(222,192,120,0.24)',
              color: '#DEC078',
              cursor: active === 0 ? 'not-allowed' : 'pointer',
              opacity: active === 0 ? 0.4 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {displayStages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to stage ${i + 1}`}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '100px',
                  background:
                    i === active ? '#DEC078' : 'rgba(222,192,120,0.24)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setActive(Math.min(displayStages.length - 1, active + 1))
            }
            disabled={active === displayStages.length - 1}
            aria-label="Next stage"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(222,192,120,0.1)',
              border: '1px solid rgba(222,192,120,0.24)',
              color: '#DEC078',
              cursor:
                active === displayStages.length - 1 ? 'not-allowed' : 'pointer',
              opacity: active === displayStages.length - 1 ? 0.4 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
