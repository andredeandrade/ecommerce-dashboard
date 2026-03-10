import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth()
    const { id } = await params

    const customer = await prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) {
      return NextResponse.json(
        { message: 'Cliente não encontrado' },
        { status: 404 },
      )
    }

    const response = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.isActive ? 'Ativo' : 'Inativo',
      createdAt: customer.createdAt,
    }

    return NextResponse.json(response)
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

    console.error('[GET_CUSTOMER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar cliente' },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()
    const { name, email, phone, isActive } = body

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        phone: phone ?? null,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(customer)
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

    console.error('[UPDATE_CUSTOMER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar cliente' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth()
    const { id } = await params

    const customer = await prisma.customer.delete({
      where: { id },
    })

    return NextResponse.json(customer)
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

    console.error('[DELETE_CUSTOMER_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao deletar cliente' },
      { status: 500 },
    )
  }
}
