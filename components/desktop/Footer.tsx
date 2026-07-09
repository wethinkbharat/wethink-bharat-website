import type { SiteSettings } from '@/sanity/types'

interface Props {
  settings: SiteSettings | null
}

const DEFAULT_EXPLORE_LINKS = [
  { _key: 'e1', label: 'Who we build', link: '#ecosystem' },
  { _key: 'e2', label: 'Domains', link: '#domains' },
  { _key: 'e3', label: 'WeThink Summit', link: '#summit' },
  { _key: 'e4', label: 'The journey', link: '#journey' },
]

const DEFAULT_CONNECT_LINKS = [
  { _key: 'c1', label: 'School enquiry', link: '#school-form' },
  { _key: 'c2', label: 'Partner with us', link: '#partner-form' },
  { _key: 'c3', label: 'Advisory board', link: '#advisory' },
]

export function Footer({ settings }: Props) {
  const exploreLinks =
    settings?.footerExploreLinks?.length ? settings.footerExploreLinks : DEFAULT_EXPLORE_LINKS
  const connectLinks =
    settings?.footerConnectLinks?.length ? settings.footerConnectLinks : DEFAULT_CONNECT_LINKS

  return (
    <footer
      style={{
        background: '#240A03',
        borderTop: '1px solid rgba(222,192,120,0.12)',
        padding: 'clamp(48px, 8vw, 80px) 0 32px',
      }}
    >
      <div className="wtb-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '60px',
            marginBottom: '60px',
          }}
        >
          {/* Logo + tagline */}
          <div>
            <a
              href="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'baseline',
                gap: '2px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#F5EEE2',
                  letterSpacing: '-0.02em',
                }}
              >
                wethink
              </span>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#DEC078',
                  letterSpacing: '-0.02em',
                }}
              >
                bharat
              </span>
            </a>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#E0CEBD',
                lineHeight: 1.7,
                maxWidth: '360px',
              }}
            >
              {settings?.footerTagline ??
                "A capability-building movement for students, educators, and schools — built with the world's leading organisations. An initiative of Viksit Bharat Foundation."}
            </p>
          </div>

          {/* Explore */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(222,192,120,0.5)',
                marginBottom: '20px',
              }}
            >
              Explore
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {exploreLinks.map((link) => (
                <li key={link._key}>
                  <a
                    href={link.link}
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#E0CEBD',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#DEC078')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#E0CEBD')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(222,192,120,0.5)',
                marginBottom: '20px',
              }}
            >
              Connect
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {connectLinks.map((link) => (
                <li key={link._key}>
                  <a
                    href={link.link}
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#E0CEBD',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#DEC078')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#E0CEBD')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(222,192,120,0.1)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'rgba(224,206,189,0.4)' }}>
            {settings?.copyrightText ?? '© 2026 WeThink Bharat. All rights reserved.'}
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(224,206,189,0.3)' }}>
            A national experiential learning movement.
          </span>
        </div>
      </div>
    </footer>
  )
}
