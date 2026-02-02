'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type AuthUser = {
  id: string
  email: string | null
  name: string | null
  role: 'USER' | 'ADMIN'
  storeName: string | null
  storeSlug: string | null
  isActive: boolean
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadUser = async () => {
      setLoading(true)

      const { data, error: userError } = await supabase.auth.getUser()

      if (userError) {
        console.error('[AUTH_USER_ERROR]', userError)
      }

      const authUser = data?.user

      if (!authUser) {
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, name, role, storeName, storeSlug, isActive')
        .eq('userId', authUser.id)
        .single()

      if (profileError) {
        console.error('[PROFILE_ERROR]', profileError)
      }

      if (mounted) {
        if (!profile) {
          setUser(null)
        } else {
          setUser({
            id: profile.id,
            name: profile.name,
            role: profile.role,
            storeName: profile.storeName,
            storeSlug: profile.storeSlug,
            isActive: profile.isActive,
            email: authUser.email ?? null,
          })
        }
        setLoading(false)
      }
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
  }
}
