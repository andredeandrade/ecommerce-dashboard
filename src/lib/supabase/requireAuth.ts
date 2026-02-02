import prisma from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function requireAuth() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('UNAUTHORIZED')
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  })

  if (!profile) {
    throw new Error('PROFILE_NOT_FOUND')
  }

  return { session, user: session.user, profile }
}
