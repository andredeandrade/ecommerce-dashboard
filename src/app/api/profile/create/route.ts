import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  const { userId, name } = body

  if (!userId) {
    return NextResponse.json({ error: 'UserId é obrigatório' }, { status: 400 })
  }

  const profile = await prisma.profile.create({
    data: {
      userId,
      name,
      role: 'USER',
    },
  })

  return NextResponse.json(profile)
}
