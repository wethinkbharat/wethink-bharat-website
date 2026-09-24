import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MOBILE_UA = /android|iphone|ipod|blackberry|iemobile|opera mini/i

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /training is a standalone responsive page — never device-redirect it.
  // Keep this check first so it holds even if a device-redirect toggle is added below.
  if (pathname === '/training' || pathname.startsWith('/training/')) return NextResponse.next()

  // Already on the mobile route — don't redirect again
  if (pathname.startsWith('/m')) return NextResponse.next()

  const ua = request.headers.get('user-agent') ?? ''
  if (MOBILE_UA.test(ua)) {
    return NextResponse.redirect(new URL('/m', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Run on all page routes; skip static files, images, api, studio
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|studio).*)'],
}
