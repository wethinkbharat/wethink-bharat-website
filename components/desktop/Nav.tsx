'use client'
import { useEffect, useState } from 'react'
import type { SiteSettings } from '@/sanity/types'

interface Props {
  settings: SiteSettings | null
  onSchoolFormOpen: () => void
}

export function Nav({ settings, onSchoolFormOpen }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (anchor: string) => {
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '0 clamp(24px, 6vw, 64px)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(42, 14, 5, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(222,192,120,0.14)'
          : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px',
        }}
      >
        <span
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#F5EEE2',
            letterSpacing: '-0.02em',
          }}
        >
          wethink
        </span>
        <span
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#DEC078',
            letterSpacing: '-0.02em',
          }}
        >
          bharat
        </span>
      </a>

      {/* Nav links */}
      <ul
        style={{
          display: 'flex',
          gap: '36px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {(settings?.navLinks ?? []).map((link) => (
          <li key={link._key}>
            <button
              onClick={() => handleNavClick(link.anchor)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(224,206,189,0.8)',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'inherit',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                padding: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#DEC078')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(224,206,189,0.8)')
              }
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Primary CTA */}
      <button className="btn-gold" onClick={onSchoolFormOpen}>
        {settings?.primaryCtaLabel ?? 'Bring to my school'}
      </button>
    </nav>
  )
}
