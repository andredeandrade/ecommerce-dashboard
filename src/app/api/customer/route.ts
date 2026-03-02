import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { name, email, phone, isActive } = body

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Nome e email são obrigatórios' },
        { status: 400 },
      )
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(customer, { status: 201 })
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[CREATE_CUSTOMER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao criar cliente' },
      { status: 500 },
    )
  }
}
