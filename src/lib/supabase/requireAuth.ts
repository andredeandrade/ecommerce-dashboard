import prisma from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function requireAuth() {
  const supabase = await createSupabaseServerClient()

  // Use getUser() which validates the stored session with the Supabase Auth server.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('UNAUTHORIZED')
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  })

  if (!profile) {
    throw new Error('PROFILE_NOT_FOUND')
  }

  return { user, profile }
}
