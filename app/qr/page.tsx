import QRCode from 'qrcode'
import Link from 'next/link'

export default async function QRPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  // TODO(deploy): real domain
  const mobileUrl = `${siteUrl}/m`

  // Generate QR as data URL
  const qrDataUrl = await QRCode.toDataURL(mobileUrl, {
    width: 400,
    margin: 3,
    color: { dark: '#3B1407', light: '#F5EEE2' },
    errorCorrectionLevel: 'M',
  })

  return (
    <div style={{
      minHeight: '100vh', background: '#2A0E05',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '32px', padding: '40px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#F5EEE2', marginBottom: '8px' }}>
          WeThink Bharat — Mobile QR Code
        </h1>
        <p style={{ fontSize: '16px', color: '#E0CEBD' }}>
          Scan to visit the mobile site at:{' '}
          <code style={{ color: '#DEC078' }}>{mobileUrl}</code>
        </p>
      </div>

      <div style={{
        background: '#F5EEE2', padding: '24px', borderRadius: '16px',
        border: '4px solid rgba(222,192,120,0.4)',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt={`QR code linking to ${mobileUrl}`} width={320} height={320} />
      </div>

      <a
        href={qrDataUrl}
        download="wethink-bharat-qr.png"
        style={{
          background: '#DEC078', color: '#3B1407',
          fontWeight: 700, fontSize: '15px',
          padding: '13px 28px', borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Download QR Code PNG ↓
      </a>

      <Link href="/" style={{ fontSize: '14px', color: '#E0CEBD', textDecoration: 'none' }}>
        ← Back to desktop site
      </Link>
    </div>
  )
}
