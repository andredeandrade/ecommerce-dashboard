import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => req.cookies.get(key)?.value,
        set: (key, value, options) => {
          res.cookies.set({
            name: key,
            value,
            ...options,
          })
        },
        remove: (key, options) => {
          res.cookies.set({
            name: key,
            value: '',
            ...options,
          })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  const publicRoutes = ['/', '/register']
  const isPublicRoute = publicRoutes.includes(pathname)

  // 🔒 rota privada sem login
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🔁 usuário logado tentando acessar login/register
  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}
