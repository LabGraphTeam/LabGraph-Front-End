import { NextResponse, type NextRequest } from 'next/server'

import { PRIVATE_ROUTES, PUBLIC_ROUTES, PUBLIC_ROUTES_LIST } from '@/features/shared/routes/routes'

export function middleware(request: NextRequest) {
  const TOKEN_JWT = request.cookies.get('tokenJWT')?.value
  const PATH_NAME = request.nextUrl.pathname

  if (PUBLIC_ROUTES_LIST.includes(PATH_NAME)) {
    if (TOKEN_JWT) {
      return NextResponse.redirect(new URL(PRIVATE_ROUTES.CHARTS.HEMATOLOGY, request.url))
    }
    return NextResponse.next()
  }

  if (!TOKEN_JWT && !PUBLIC_ROUTES_LIST.includes(PATH_NAME)) {
    request.cookies.delete('tokenJWT')
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.USERS.LOGIN, request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/signup', '/auth/login', '/charts/:path*', '/misc/:path*']
}
