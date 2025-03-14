import { NextResponse, type NextRequest } from 'next/server'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from './features/shared/utils/constants/publicRoutes'

interface TokenPayload {
  exp: number
  [key: string]: unknown
}

const isTokenExpired = (token: string): boolean => {
  try {
    const [, payloadBase64] = token.split('.')
    if (!payloadBase64) return true

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString()) as TokenPayload
    const expirationDate = new Date(payload.exp * 1000)
    return new Date() > expirationDate
  } catch {
    return true
  }
}

export function middleware(request: NextRequest) {
  const TOKEN_JWT = request.cookies.get('tokenJWT')?.value
  const PATH_NAME = request.nextUrl.pathname

  if (LOGIN_ROUTE.includes(PATH_NAME) || SIGNUP_ROUTE.includes(PATH_NAME)) {
    if (TOKEN_JWT && !isTokenExpired(TOKEN_JWT)) {
      return NextResponse.redirect(new URL('/charts/hematology', request.url))
    }
    request.cookies.delete('tokenJWT')
    return NextResponse.next()
  }

  if (!TOKEN_JWT || (TOKEN_JWT && isTokenExpired(TOKEN_JWT))) {
    request.cookies.delete('tokenJWT')
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/signup', '/auth/login', '/charts/:path*', '/misc/:path*']
}
