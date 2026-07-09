'use client'
import { useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { DomainsIntro, Domain, DomainLevel } from '@/sanity/types'

interface Props {
  intro: DomainsIntro | null
  domains: Domain[]
  onSchoolFormOpen: () => void
}

const DEFAULT_DOMAINS: Domain[] = [
  {
    _id: 'd1',
    _type: 'domain',
    number: 1,
    name: 'Entrepreneurship',
    partnerName: 'NASSCOM 10,000 Startups',
    simulatorName: 'Startup Studio',
    status: 'live',
    levels: [
      { _key: 'l1a', levelLabel: 'Level 1', title: 'The Brief', description: 'Students receive a real startup challenge brief from NASSCOM mentors.' },
      { _key: 'l1b', levelLabel: 'Level 2', title: 'The Build', description: 'Teams develop their solution with weekly mentor check-ins.' },
      { _key: 'l1c', levelLabel: 'Level 3', title: 'The Pitch', description: 'Students pitch to a panel of investors and founders.' },
      { _key: 'l1d', levelLabel: 'Level 4', title: 'The Summit', description: 'Top teams compete at the WeThink Summit.' },
    ] as DomainLevel[],
    outcomes: [
      'A complete startup pitch deck',
      'A validated business model canvas',
      'Experience presenting to a real jury',
      'A permanent WeThink Digital Footprint entry',
    ],
  },
  {
    _id: 'd2',
    _type: 'domain',
    number: 2,
    name: 'Media & Communication',
    partnerName: 'Brut',
    simulatorName: 'The Newsroom',
    status: 'live',
    levels: [
      { _key: 'l2a', levelLabel: 'Level 1', title: 'The Story', description: 'Students identify a real issue worth covering with Brut mentors.' },
      { _key: 'l2b', levelLabel: 'Level 2', title: 'The Craft', description: 'Research, interviews, scripting, and storytelling.' },
      { _key: 'l2c', levelLabel: 'Level 3', title: 'The Publish', description: 'Teams produce a final media piece judged at school level.' },
      { _key: 'l2d', levelLabel: 'Level 4', title: 'The Summit', description: 'Best pieces showcased at the WeThink Summit.' },
    ] as DomainLevel[],
    outcomes: [
      'A published media piece',
      'Editorial and production skills',
      'Experience with a real news brief',
      'A permanent WeThink Digital Footprint entry',
    ],
  },
  {
    _id: 'd3',
    _type: 'domain',
    number: 3,
    name: 'Design & Innovation',
    partnerName: 'Canva',
    simulatorName: 'Design Lab',
    status: 'live',
    levels: [
      { _key: 'l3a', levelLabel: 'Level 1', title: 'The Problem', description: 'Students frame a design problem with Canva mentors.' },
      { _key: 'l3b', levelLabel: 'Level 2', title: 'The Concept', description: 'From wireframes to mockups using Canva tools.' },
      { _key: 'l3c', levelLabel: 'Level 3', title: 'The Critique', description: 'Live design critique with industry designers.' },
      { _key: 'l3d', levelLabel: 'Level 4', title: 'The Summit', description: 'Best designs showcased at the national Summit.' },
    ] as DomainLevel[],
    outcomes: [
      'A complete design portfolio piece',
      'Visual thinking and problem-framing skills',
      'Experience with professional design tools',
      'A permanent WeThink Digital Footprint entry',
    ],
  },
]

export function DomainsSection({ intro, domains, onSchoolFormOpen }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const displayDomains = domains.length ? domains : DEFAULT_DOMAINS

  return (
    <section id="domains" className="section-py" style={{ background: '#340F05' }}>
      <div className="wtb-container">
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            {intro?.kicker ?? 'The domains'}
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
            Real industries. Real simulators.{' '}
            <span style={{ color: '#DEC078' }}>Real mentors.</span>
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
              'Three live domains — each with an industry partner, a simulator, and a structured journey from exposure to national showcase.'}
          </p>
        </ScrollReveal>

        <div style={{ borderTop: '1px solid rgba(222,192,120,0.14)' }}>
          {displayDomains.map((domain, i) => (
            <ScrollReveal key={domain._id} delay={i * 0.1}>
              <div style={{ borderBottom: '1px solid rgba(222,192,120,0.14)' }}>
                {/* Domain header row */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setExpanded(expanded === domain._id ? null : domain._id)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpanded(expanded === domain._id ? null : domain._id)
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.paddingLeft = '16px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.paddingLeft = '0px'
                  }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    alignItems: 'center',
                    gap: '32px',
                    padding: '40px 0',
                    cursor: 'pointer',
                    transition: 'padding-left 0.35s ease',
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(222,192,120,0.4)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {String(domain.number ?? i + 1).padStart(2, '0')}
                  </span>

                  {/* Name + meta */}
                  <div>
                    <h3
                      style={{
                        fontSize: 'clamp(22px, 3vw, 36px)',
                        fontWeight: 800,
                        color: '#F5EEE2',
                        letterSpacing: '-0.02em',
                        marginBottom: '8px',
                      }}
                    >
                      {domain.name}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#E0CEBD',
                        }}
                      >
                        {domain.simulatorName} · with {domain.partnerName}
                      </span>
                      {domain.status === 'live' ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#4ade80',
                            background: 'rgba(74,222,128,0.1)',
                            border: '1px solid rgba(74,222,128,0.2)',
                            borderRadius: '100px',
                            padding: '3px 10px',
                          }}
                        >
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              background: '#4ade80',
                              flexShrink: 0,
                            }}
                          />
                          Live now
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#E0CEBD',
                            background: 'rgba(224,206,189,0.1)',
                            border: '1px solid rgba(224,206,189,0.2)',
                            borderRadius: '100px',
                            padding: '3px 10px',
                          }}
                        >
                          Phase 2
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand chevron */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#DEC078"
                    strokeWidth="2"
                    style={{
                      transition: 'transform 0.3s',
                      transform:
                        expanded === domain._id ? 'rotate(180deg)' : 'none',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* Expanded content */}
                {expanded === domain._id && (
                  <div style={{ paddingBottom: '40px', paddingLeft: '112px' }}>
                    {/* 4 levels */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '16px',
                        marginBottom: '32px',
                      }}
                    >
                      {(domain.levels ?? []).map((level, li) => (
                        <div
                          key={level._key}
                          style={{
                            background: 'rgba(222,192,120,0.05)',
                            border: '1px solid rgba(222,192,120,0.14)',
                            borderRadius: '12px',
                            padding: '20px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              color: '#DEC078',
                              marginBottom: '8px',
                            }}
                          >
                            {level.levelLabel ?? `Level ${li + 1}`}
                          </div>
                          <div
                            style={{
                              fontSize: '15px',
                              fontWeight: 700,
                              color: '#F5EEE2',
                              marginBottom: '8px',
                            }}
                          >
                            {level.title ?? ''}
                          </div>
                          <p
                            style={{
                              fontSize: '13px',
                              color: '#E0CEBD',
                              lineHeight: 1.6,
                              margin: 0,
                            }}
                          >
                            {level.description ?? ''}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Outcomes */}
                    {domain.outcomes?.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(222,192,120,0.5)',
                            marginBottom: '12px',
                          }}
                        >
                          Students walk away with
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                          }}
                        >
                          {domain.outcomes.map((outcome, oi) => (
                            <li
                              key={oi}
                              style={{
                                fontSize: '13px',
                                color: '#E0CEBD',
                                background: 'rgba(222,192,120,0.08)',
                                borderRadius: '8px',
                                padding: '6px 14px',
                              }}
                            >
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
            <button className="btn-gold" onClick={onSchoolFormOpen}>
              Bring domains to my school ↗
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
