import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { profile } = await requireAuth()
    const { id } = await params

    const brand = await prisma.brand.findFirst({
      where: { id, ownerId: profile.id },
    })

    if (!brand) {
      return NextResponse.json(
        { message: 'Marca não encontrada' },
        { status: 404 },
      )
    }

    return NextResponse.json(brand)
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

    console.error('[GET_BRAND_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar marca' },
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

    const { name, isActive } = body

    const brand = await prisma.brand.update({
      where: { id, ownerId: profile.id },
      data: {
        name,
        slug: name ? name.toLowerCase().trim().replace(/\s+/g, '-') : undefined,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(brand)
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

    console.error('[UPDATE_BRAND_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar marca' },
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

    const brand = await prisma.brand.delete({
      where: { id, ownerId: profile.id },
    })

    return NextResponse.json(brand)
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

    console.error('[DELETE_BRAND_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao deletar marca' },
      { status: 500 },
    )
  }
}
