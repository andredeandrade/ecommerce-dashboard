import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'
import { OrderStatus } from '@/generated/prisma/enums'

type OrderFindManyArgs = NonNullable<
  Parameters<typeof prisma.order.findMany>[0]
>

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

    const statusParam = searchParams.get('status')

    const status: OrderStatus | undefined = statusParam
      ? (statusParam.toUpperCase() as OrderStatus)
      : undefined

    const where: any = {
      ownerId: profile.id,
      ...(status ? { status } : {}),
    }

    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        {
          items: {
            some: {
              name: { contains: search, mode: 'insensitive' },
            },
          },
        },
      ]
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ])

    const items = orders.map((order) => ({
      id: order.id,
      status: order.status,
      subtotal: Number(order.subtotal),
      total: Number(order.total),
      createdAt: order.createdAt,
    }))

    return NextResponse.json({
      items,
      total,
      page,
      limit,
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
      }

      if (error.message === 'PROFILE_NOT_FOUND') {
        return NextResponse.json(
          { error: 'Perfil não encontrado' },
          { status: 404 },
        )
      }
    }

    console.error('[GET_ORDERS_ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
      { status: 500 },
    )
  }
}
