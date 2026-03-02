import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function GET(req: NextRequest) {
  try {
    await requireAuth() // just ensure user is authenticated

    const { searchParams } = req.nextUrl

    const search = searchParams.get('search') || ''
    const rawPage = Number(searchParams.get('page'))
    const rawLimit = Number(searchParams.get('limit'))
    const rawAll = searchParams.get('all')

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 10
    const skip = (page - 1) * limit
    const all = rawAll === 'true'

    const statusParam = searchParams.get('status')
    const isActive =
      statusParam === 'active'
        ? true
        : statusParam === 'inactive'
          ? false
          : undefined

    const where: any = {}

    if (typeof isActive === 'boolean') {
      where.isActive = isActive
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (all) {
      const customers = await prisma.customer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })

      const items = customers.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        status: c.isActive ? 'Ativo' : 'Inativo',
        createdAt: c.createdAt,
      }))

      return NextResponse.json(items)
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.customer.count({ where }),
    ])

    const items = customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      status: c.isActive ? 'Ativo' : 'Inativo',
      createdAt: c.createdAt,
    }))

    return NextResponse.json({ items, total, page, limit })
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[GET_CUSTOMERS_ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao buscar clientes' },
      { status: 500 },
    )
  }
}
