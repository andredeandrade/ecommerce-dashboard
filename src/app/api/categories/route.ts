import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function GET(req: NextRequest) {
  try {
    const { profile } = await requireAuth()

    const { searchParams } = req.nextUrl

    const search = searchParams.get('search') || ''
    const rawPage = Number(searchParams.get('page'))
    const rawLimit = Number(searchParams.get('limit'))

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 10
    const skip = (page - 1) * limit

    const where = {
      ownerId: profile.id,
      name: { contains: search, mode: 'insensitive' },
    } as any

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.count({ where }),
    ])

    const items = categories.map((c) => ({
      id: c.id,
      name: c.name,
      status: c.isActive ? 'Ativo' : 'Inativo',
    }))

    return NextResponse.json({ items, total, page, limit })
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[GET_CATEGORIES_ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 },
    )
  }
}
