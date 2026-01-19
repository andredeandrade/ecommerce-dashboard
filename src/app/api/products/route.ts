import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

type ProductFindManyArgs = NonNullable<
  Parameters<typeof prisma.product.findMany>[0]
>

type ProductWhere = ProductFindManyArgs['where']

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    const search = searchParams.get('search') || ''
    const rawPage = Number(searchParams.get('page'))
    const rawLimit = Number(searchParams.get('limit'))

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 10

    const skip = (page - 1) * limit

    const statusParam = searchParams.get('status')
    const status =
      statusParam && statusParam !== 'all' ? statusParam : undefined

    const where: ProductWhere = {
      name: {
        contains: search,
        mode: 'insensitive',
      },
      ...(status ? { status } : {}),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: {
            select: {
              name: true,
            },
          },
          brand: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ])

    const items = products.map((product) => ({
      id: product.id,
      name: product.name,
      image: null,
      category: product.category?.name ?? 'Sem categoria',
      brand: product.brand?.name ?? 'Sem marca',
      quantity: product.quantity ?? 0,
      status: product.isActive ? 'Ativo' : 'Inativo',
      price: Number(product.price),
    }))

    return NextResponse.json({
      items,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 },
    )
  }
}
