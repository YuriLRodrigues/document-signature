import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

import { jwtDecode } from 'jwt-decode' // Você precisará instalar esta biblioteca

export function middleware(req: NextRequest) {
  const tokenKey = process.env.NEXT_AUTH_TOKEN_KEY || 'next-auth.session-token'
  const token = req.cookies.get(tokenKey)?.value

  const isTokenValid = (token: string | undefined): boolean => {
    if (!token) return false

    try {
      const decoded = jwtDecode<{ exp?: number }>(token)

      if (decoded.exp) {
        const nowInSeconds = Math.floor(Date.now() / 1000)
        return decoded.exp > nowInSeconds
      }

      return true
    } catch {
      return false
    }
  }

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isLoggedIn = isTokenValid(token)

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!isLoggedIn && req.nextUrl.pathname.includes('/dashboard')) {
    const response = NextResponse.redirect(new URL('/auth/login', req.url))
    response.cookies.delete(tokenKey)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
}
