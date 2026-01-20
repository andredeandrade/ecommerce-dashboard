import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        promotionalPrice: true,
        sku: true,
        quantity: true,
        isActive: true,
        categoryId: true,
        brandId: true,
        seoTitle: true,
        seoDescription: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      promotionalPrice: product.promotionalPrice
        ? Number(product.promotionalPrice)
        : undefined,
      sku: product.sku,
      quantity: product.quantity ?? undefined,
      isActive: product.isActive,
      categoryId: product.categoryId ?? undefined,
      brandId: product.brandId ?? undefined,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
    })
  } catch (error) {
    console.error('[GET_PRODUCT_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar produto' },
      { status: 500 },
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params
    const body = await req.json()

    const { name, price, ...rest } = body

    if (!name || price == null) {
      return NextResponse.json(
        { message: 'Nome e preço são obrigatórios' },
        { status: 400 },
      )
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        ...rest,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[UPDATE_PRODUCT_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar produto' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[DELETE_PRODUCT_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao deletar produto' },
      { status: 500 },
    )
  }
}
