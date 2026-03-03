import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function POST(request: NextRequest) {
  try {
    const { profile } = await requireAuth()

    const body = await request.json()

    const { status, subtotal, tax, shipping, total, items } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Itens do pedido são obrigatórios' },
        { status: 400 },
      )
    }

    // basic validation of totals
    if (subtotal == null || total == null) {
      return NextResponse.json(
        { message: 'Subtotal e total são obrigatórios' },
        { status: 400 },
      )
    }

    const order = await prisma.order.create({
      data: {
        owner: { connect: { id: profile.id } },
        status: status || undefined,
        subtotal,
        tax: tax ?? null,
        shipping: shipping ?? null,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            sku: item.sku ?? null,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    if (error.message === 'PROFILE_NOT_FOUND') {
      return NextResponse.json(
        { error: 'Perfil não encontrado' },
        { status: 404 },
      )
    }

    console.error('[CREATE_ORDER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao criar pedido' },
      { status: 500 },
    )
  }
}
