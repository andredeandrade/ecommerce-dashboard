import { createServerClient } from '@supabase/ssr'
import type { NextRequest, NextResponse } from 'next/server'

export function createSupabaseMiddlewareClient(
  req: NextRequest,
  res: NextResponse,
) {
  return createServerClient(
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
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'implicit',
      },
      global: {
        headers: {
          'x-client-info': 'auth-js-server',
        },
      },
    },
  )
}
