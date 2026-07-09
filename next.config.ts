import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // TODO(deploy): tighten CSP for production
  async headers() {
    return [
      {
        source: '/((?!studio).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
              "img-src 'self' data: blob: https://cdn.sanity.io",
              "connect-src 'self' https://*.sanity.io https://api.sanity.io",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          // TODO(deploy): add HSTS header in production
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
