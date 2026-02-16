'use client'

import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const logout = async () => {
    await supabase.auth.signOut()

    queryClient.clear()

    router.push('/')
    router.refresh()
  }

  return { logout }
}
