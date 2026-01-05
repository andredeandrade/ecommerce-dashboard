import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, context: any) {
  const id = Number(context.params.id)

  const product = {
    id,
    name: `Produto ${id}`,
    image: null,
    category: 'Eletrônicos',
    brand: 'Nike',
    quantity: 20,
    status: 'active',
    price: 100.5,
  }

  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest, context: any) {
  const productId = Number(context.params.id)

  await new Promise((r) => setTimeout(r, 1000))

  console.log('Produto deletado:', productId)

  return NextResponse.json({ ok: true })
}
