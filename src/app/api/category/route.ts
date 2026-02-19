import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

export async function POST(request: NextRequest) {
  try {
    const { profile } = await requireAuth()

    const body = await request.json()
    const { name, isActive } = body

    if (!name) {
      return NextResponse.json(
        { message: 'Nome é obrigatório' },
        { status: 400 },
      )
    }

    const category = await prisma.category.create({
      data: {
        owner: { connect: { id: profile.id } },
        name,
        slug: slugify(name),
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[CREATE_CATEGORY_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao criar categoria' },
      { status: 500 },
    )
  }
}
