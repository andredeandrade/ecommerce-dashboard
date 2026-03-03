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
    const rawAll = searchParams.get('all')

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 10
    const skip = (page - 1) * limit
    const all = rawAll === 'true'

    const where = {
      ownerId: profile.id,
      name: { contains: search, mode: 'insensitive' },
    } as any

    if (all) {
      const brands = await prisma.brand.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })

      const items = brands.map((c) => ({
        id: c.id,
        name: c.name,
        status: c.isActive ? 'Ativo' : 'Inativo',
      }))

      return NextResponse.json(items)
    }

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.brand.count({ where }),
    ])

    const items = brands.map((c) => ({
      id: c.id,
      name: c.name,
      status: c.isActive ? 'Ativo' : 'Inativo',
    }))

    return NextResponse.json({ items, total, page, limit })
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[GET_BRANDS_ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao buscar marcas' },
      { status: 500 },
    )
  }
}
