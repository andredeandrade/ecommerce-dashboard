import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    const createdProduct = await createProductInDatabase(productData)

    return NextResponse.json(createdProduct, { status: 201 })
  } catch (error) {
    console.error('[CREATE_PRODUCT_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao criar produto' },
      { status: 500 },
    )
  }
}

async function createProductInDatabase(productData: any) {
  const newProduct = { id: Date.now(), ...productData }
  console.log('Produto criado:', newProduct)
  return newProduct
}
