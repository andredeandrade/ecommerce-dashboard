import { auth } from '@/config/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl

  const publicRoutes = ['/', '/register']
  const isPublic = publicRoutes.includes(pathname)
  const isLoggedIn = !!req.auth

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
