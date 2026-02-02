import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createSupabaseMiddlewareClient(req, res)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  const publicRoutes = ['/', '/register']
  const isPublicRoute = publicRoutes.includes(pathname)

  // 🔒 rota privada
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🔁 logado tentando acessar login/register
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
