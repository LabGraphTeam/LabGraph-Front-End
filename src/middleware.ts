import { NextResponse, type NextRequest } from 'next/server';
import { isTokenExpired } from './middleware-utils/constants/isTokenExpired';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from './middleware-utils/constants/publicRoutes';

export async function middleware(request: NextRequest) {
  const TOKEN_JWT = request.cookies.get('tokenJWT')?.value;
  const PATH_NAME = request.nextUrl.pathname;

  if (LOGIN_ROUTE.includes(PATH_NAME) || SIGNUP_ROUTE.includes(PATH_NAME)) {
    if (TOKEN_JWT && !isTokenExpired(TOKEN_JWT))
      return NextResponse.redirect(new URL('/charts/hematology', request.url));
    request.cookies.delete('tokenJWT');
    return NextResponse.next();
  }

  if (!TOKEN_JWT || (TOKEN_JWT && isTokenExpired(TOKEN_JWT))) {
    request.cookies.delete('tokenJWT');
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/signup', '/auth/login', '/charts/:path*','/misc/:path*']
  // matcher: [
  //   '/((?!api|_next/static|_next/image|next/public|_next/data|_next/image|favicon.ico|auth/signup|health-check|about-us|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.webp).*)',
  // ],
};
