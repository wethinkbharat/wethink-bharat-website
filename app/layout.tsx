import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import './globals.css'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-league-spartan',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "WeThink Bharat — Experiential Learning for India's Students",
  description:
    'WeThink Bharat brings real industry into schools — through domain simulators, live projects, and a permanent digital footprint for every student.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
      </head>
      <body>
        <noscript>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: '#2A0E05',
              color: '#F5EEE2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              textAlign: 'center',
              padding: '24px',
              zIndex: 9999,
            }}
          >
            WeThink Bharat requires JavaScript. Please enable it in your browser settings.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
