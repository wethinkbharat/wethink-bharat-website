import { NextRequest, NextResponse } from 'next/server'

const MOBILE_UA_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

export function proxy(req: NextRequest) {
  // Allow disabling via env flag
  if (process.env.ENABLE_DEVICE_REDIRECT === 'false') return NextResponse.next()

  const ua = req.headers.get('user-agent') || ''
  const isMobile = MOBILE_UA_REGEX.test(ua)
  const { pathname } = req.nextUrl

  // Redirect mobile users from / to /m
  if (isMobile && pathname === '/') {
    return NextResponse.redirect(new URL('/m', req.url))
  }

  // Redirect desktop users from /m to /
  if (!isMobile && pathname === '/m') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/m'],
}
