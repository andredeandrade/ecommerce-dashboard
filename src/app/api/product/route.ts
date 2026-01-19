import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
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

    if (!name || price == null) {
      return NextResponse.json(
        { message: 'Nome e preço são obrigatórios' },
        { status: 400 },
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price,
        promotionalPrice: promotionalPrice ?? null,
        sku: sku || null,
        quantity: quantity ?? null,
        isActive: isActive ?? true,

        categoryId: categoryId || null,
        brandId: brandId || null,

        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
    })

    const response = {
      id: product.id,
      name: product.name,
      image: null,
      category: product.category?.name ?? 'Sem categoria',
      brand: product.brand?.name ?? 'Sem marca',
      quantity: product.quantity ?? 0,
      status: product.isActive ? 'Ativo' : 'Inativo',
      price: Number(product.price),
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('[CREATE_PRODUCT_ERROR]', error)

    return NextResponse.json(
      { message: 'Erro ao criar produto' },
      { status: 500 },
    )
  }
}
