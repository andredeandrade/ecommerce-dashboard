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

    const category = await prisma.category.findFirst({
      where: { id, ownerId: profile.id },
    })

    if (!category) {
      return NextResponse.json(
        { message: 'Categoria não encontrada' },
        { status: 404 },
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('[GET_CATEGORY_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar categoria' },
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

    const category = await prisma.category.update({
      where: { id, ownerId: profile.id },
      data: {
        name,
        slug: name ? name.toLowerCase().trim().replace(/\s+/g, '-') : undefined,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[UPDATE_CATEGORY_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar categoria' },
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

    const category = await prisma.category.delete({
      where: { id, ownerId: profile.id },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[DELETE_CATEGORY_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao deletar categoria' },
      { status: 500 },
    )
  }
}
