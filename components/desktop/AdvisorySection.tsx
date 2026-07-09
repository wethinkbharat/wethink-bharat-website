'use client'
import { useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SanityImage } from '@/components/shared/SanityImage'
import type { AdvisoryIntro, AdvisoryMember } from '@/sanity/types'
import type { PortableTextBlock } from '@portabletext/types'

interface Props {
  intro: AdvisoryIntro | null
  members: AdvisoryMember[]
}

type PortableTextSpan = {
  _type: 'span'
  text: string
  marks?: string[]
}

function extractBioText(bio: PortableTextBlock[]): string {
  return bio
    .map((block) => {
      const children = (block.children ?? []) as PortableTextSpan[]
      return children.map((c) => c.text).join('')
    })
    .join(' ')
}

function AnnouncingCard({ member }: { member: AdvisoryMember }) {
  return (
    <div
      style={{
        background: 'rgba(222,192,120,0.04)',
        border: '1px dashed rgba(222,192,120,0.2)',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '280px',
        textAlign: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(222,192,120,0.4)',
        }}
      >
        Seat {String(member.number ?? 0).padStart(2, '0')}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(224,206,189,0.5)' }}>
        {member.categoryLabel}
      </div>
      <div
        style={{
          fontSize: '11px',
          color: 'rgba(224,206,189,0.3)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Announcing ahead of Season 1
      </div>
    </div>
  )
}

function MemberCard({ member }: { member: AdvisoryMember }) {
  const [flipped, setFlipped] = useState(false)

  if (member.status === 'announcing') {
    return <AnnouncingCard member={member} />
  }

  const bioText = extractBioText(member.bio)
  const initial = member.initial ?? (member.name ? member.name.charAt(0) : 'A')

  return (
    <div
      className={`flip-card${flipped ? ' flipped' : ''}`}
      style={{ height: '280px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className="flip-card-front"
          style={{
            background: '#340F05',
            border: '1px solid rgba(222,192,120,0.18)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Avatar / initial */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(222,192,120,0.12)',
              border: '1px solid rgba(222,192,120,0.24)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 800,
              color: '#DEC078',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {member.headshot ? (
              <SanityImage
                image={member.headshot as unknown as Record<string, unknown>}
                alt={member.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>

          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(222,192,120,0.5)',
                marginBottom: '8px',
              }}
            >
              Seat {String(member.number ?? 0).padStart(2, '0')}
            </div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#F5EEE2',
                marginBottom: '6px',
              }}
            >
              {member.name}
            </h3>
            {member.roleOrg && (
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#E0CEBD',
                  lineHeight: 1.4,
                }}
              >
                {member.roleOrg}
              </p>
            )}
          </div>

          <div
            style={{
              fontSize: '12px',
              color: 'rgba(222,192,120,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Hover to read bio
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back"
          style={{
            background: '#2A0E05',
            border: '1px solid rgba(222,192,120,0.3)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#DEC078',
              marginBottom: '8px',
            }}
          >
            {member.name}
          </h3>
          {member.roleOrg && (
            <p
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(224,206,189,0.7)',
                marginBottom: '16px',
                lineHeight: 1.4,
              }}
            >
              {member.roleOrg}
            </p>
          )}
          {bioText && (
            <p
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#E0CEBD',
                lineHeight: 1.65,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {bioText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const DEFAULT_MEMBERS: AdvisoryMember[] = [
  {
    _id: 'a1',
    _type: 'advisoryMember',
    number: 1,
    name: 'Dr. Aditi Misra',
    roleOrg: 'Director · DPS Intl — Gurgaon, Jaipur & Dharav High School',
    status: 'member',
    initial: 'A',
    bio: [],
  },
  {
    _id: 'a2',
    _type: 'advisoryMember',
    number: 2,
    name: 'Dr. Amrita Burman',
    roleOrg: 'Director · Sunbeam Group · Education Management Expert',
    status: 'member',
    initial: 'A',
    bio: [],
  },
  {
    _id: 'a3',
    _type: 'advisoryMember',
    number: 3,
    name: 'Dr. Arunabh Singh',
    roleOrg: 'Director · Nehru World School · Healthy Planet & Cogent',
    status: 'member',
    initial: 'A',
    bio: [],
  },
  {
    _id: 'a4',
    _type: 'advisoryMember',
    number: 4,
    name: 'Lina Ashar',
    roleOrg: 'Founder · Dreamtime Learning, Kangaroo Kids Education Ltd',
    status: 'member',
    initial: 'L',
    bio: [],
  },
  {
    _id: 'a5',
    _type: 'advisoryMember',
    number: 5,
    name: 'Lt. Gen. Surendra Kulkarni',
    roleOrg: 'Former Director · Mayo College, Ajmer',
    status: 'member',
    initial: 'S',
    bio: [],
  },
  {
    _id: 'a6',
    _type: 'advisoryMember',
    number: 6,
    name: 'Dr. Nandini Srivastava',
    roleOrg: 'Dean · Manav Rachna International Institute of Research',
    status: 'member',
    initial: 'N',
    bio: [],
  },
  {
    _id: 'a7',
    _type: 'advisoryMember',
    number: 7,
    name: '',
    status: 'announcing',
    categoryLabel: 'Industry & Startups',
    bio: [],
  },
  {
    _id: 'a8',
    _type: 'advisoryMember',
    number: 8,
    name: '',
    status: 'announcing',
    categoryLabel: 'Media & Storytelling',
    bio: [],
  },
  {
    _id: 'a9',
    _type: 'advisoryMember',
    number: 9,
    name: '',
    status: 'announcing',
    categoryLabel: 'Design & Innovation',
    bio: [],
  },
]

export function AdvisorySection({ intro, members }: Props) {
  const displayMembers = members.length ? members : DEFAULT_MEMBERS

  return (
    <section id="advisory" className="section-py" style={{ background: '#340F05' }}>
      <div className="wtb-container">
        <ScrollReveal>
          <span className="kicker" style={{ display: 'inline-flex', marginBottom: '32px' }}>
            {intro?.kicker ?? 'Advisory board'}
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
              maxWidth: '680px',
              marginBottom: '64px',
              marginTop: '16px',
            }}
          >
            Shaped by India&apos;s most respected{' '}
            <span style={{ color: '#DEC078' }}>education leaders.</span>
          </h2>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {displayMembers.map((member, i) => (
            <ScrollReveal key={member._id} delay={i * 0.06}>
              <MemberCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
