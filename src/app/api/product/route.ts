import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function POST(request: NextRequest) {
  try {
    const { profile } = await requireAuth()

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
        owner: {
          connect: { id: profile.id },
        },

        name,
        description: description || null,
        price,
        promotionalPrice: promotionalPrice ?? null,
        sku: sku || null,
        quantity: quantity ?? null,
        isActive: isActive ?? true,

        category: categoryId ? { connect: { id: categoryId } } : undefined,

        brand: brandId ? { connect: { id: brandId } } : undefined,

        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
    })

    return NextResponse.json(
      {
        id: product.id,
        name: product.name,
        image: null,
        category: product.category?.name ?? 'Sem categoria',
        brand: product.brand?.name ?? 'Sem marca',
        quantity: product.quantity ?? 0,
        status: product.isActive ? 'Ativo' : 'Inativo',
        price: Number(product.price),
      },
      { status: 201 },
    )
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

    console.error('[CREATE_PRODUCT_ERROR]', error)

    return NextResponse.json(
      { message: 'Erro ao criar produto' },
      { status: 500 },
    )
  }
}
