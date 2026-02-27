import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { profile } = await requireAuth()
    const { id } = await params

    const order = await prisma.order.findFirst({
      where: {
        id,
        ownerId: profile.id,
      },
      include: { items: true },
    })

    if (!order) {
      return NextResponse.json(
        { message: 'Pedido não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('[GET_ORDER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar pedido' },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { profile } = await requireAuth()
    const { id } = await params
    const body = await request.json()

    const { status, subtotal, tax, shipping, total, items } = body

    const data: any = {}

    if (status) data.status = status
    if (subtotal != null) data.subtotal = subtotal
    if (tax !== undefined) data.tax = tax
    if (shipping !== undefined) data.shipping = shipping
    if (total != null) data.total = total

    if (items && Array.isArray(items)) {
      data.items = {
        deleteMany: {},
        create: items.map((item: any) => ({
          productId: item.productId,
          name: item.name,
          sku: item.sku ?? null,
          price: item.price,
          quantity: item.quantity,
        })),
      }
    }

    const order = await prisma.order.update({
      where: {
        id,
        ownerId: profile.id,
      },
      data,
      include: { items: true },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[UPDATE_ORDER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar pedido' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { profile } = await requireAuth()
    const { id } = await params

    const order = await prisma.order.delete({
      where: {
        id,
        ownerId: profile.id,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[DELETE_ORDER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao deletar pedido' },
      { status: 500 },
    )
  }
}
