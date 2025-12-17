import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const productData = await request.json()

    // Lógica de criação do produto (exemplo)
    const createdProduct = await createProductInDatabase(productData)

    // Retorna resposta
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
  // Mock de banco de dados
  const newProduct = { id: Date.now(), ...productData }
  console.log('Produto criado', newProduct)
  return newProduct
}
