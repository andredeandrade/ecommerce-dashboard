import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const productId = Number(id)

  await new Promise((r) => setTimeout(r, 1000))

  console.log('Produto deletado:', productId)

  return Response.json({ ok: true })
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id)

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
