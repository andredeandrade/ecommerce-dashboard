import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { createClient } from '@supabase/supabase-js'
import slugify from 'slugify'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, name, storeName } = body

    if (!userId) {
      return NextResponse.json(
        { message: 'userId é obrigatório' },
        { status: 400 },
      )
    }

    const { data: user, error } =
      await supabaseAdmin.auth.admin.getUserById(userId)

    if (error || !user) {
      return NextResponse.json({ message: 'Usuário inválido' }, { status: 400 })
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    })

    if (existingProfile) {
      return NextResponse.json({ message: 'Perfil já existe' }, { status: 409 })
    }

    const storeSlug = storeName
      ? slugify(storeName, { lower: true, strict: true })
      : null

    const profile = await prisma.profile.create({
      data: {
        userId,
        name,
        storeName,
        storeSlug,
        role: 'USER',
        isActive: true,
      },
    })

    return NextResponse.json(profile, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Nome da loja já está em uso' },
        { status: 409 },
      )
    }

    console.error('[CREATE_PROFILE_ERROR]', error)

    return NextResponse.json(
      { message: 'Erro ao criar perfil' },
      { status: 500 },
    )
  }
}
