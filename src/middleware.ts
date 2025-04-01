import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const tokenSecretKey = process.env.NEXTAUTH_SECRET as string
  const token = await getToken({ req, secret: tokenSecretKey })

  const isTokenValid = async (): Promise<boolean> => {
    if (!token) return false
    const exp = token.exp as number
    const now = Math.floor(Date.now() / 1000)

    if (exp && exp < now) {
      return false
    }

    return true
  }

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isLoggedIn = await isTokenValid()

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!isLoggedIn && req.nextUrl.pathname.includes('/dashboard')) {
    const response = NextResponse.redirect(new URL('/auth/login', req.url))
    response.cookies.delete(tokenSecretKey)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
}
