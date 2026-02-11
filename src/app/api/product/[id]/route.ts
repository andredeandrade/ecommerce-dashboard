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

    const product = await prisma.product.findFirst({
      where: {
        id,
        ownerId: profile.id,
      },
      include: {
        category: true,
        brand: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('[GET_PRODUCT_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar produto' },
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

    const {
      name,
      description,
      price,
      promotionalPrice,
      sku,
      quantity,
      isActive,
      categoryId,
      brandId,
      seoTitle,
      seoDescription,
    } = body

    const product = await prisma.product.update({
      where: {
        id,
        ownerId: profile.id,
      },
      data: {
        name,
        description: description ?? null,
        price,
        promotionalPrice: promotionalPrice ?? null,
        sku: sku ?? null,
        quantity: quantity ?? null,
        isActive: isActive ?? true,

        category: categoryId
          ? { connect: { id: categoryId } }
          : { disconnect: true },

        brand: brandId ? { connect: { id: brandId } } : { disconnect: true },

        seoTitle: seoTitle ?? null,
        seoDescription: seoDescription ?? null,
      },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[UPDATE_PRODUCT_ERROR]', error)

    return NextResponse.json(
      { message: 'Erro ao atualizar produto' },
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

    const product = await prisma.product.delete({
      where: {
        id,
        ownerId: profile.id,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[DELETE_PRODUCT_ERROR]', error)

    return NextResponse.json(
      { message: 'Erro ao deletar produto' },
      { status: 500 },
    )
  }
}
