import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const tokenKey = process.env.NEXT_AUTH_TOKEN_VARIABLE || ''
  const token = req.cookies.get(tokenKey)?.value

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isLoggedIn = !!token

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!isLoggedIn && req.nextUrl.pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
}
