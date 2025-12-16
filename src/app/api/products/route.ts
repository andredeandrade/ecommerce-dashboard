import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Query params
  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page') || 0)
  const limit = Number(searchParams.get('limit') || 10)
  const status = searchParams.get('status') || null

  // Dados fake
  const all = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Produto ${i + 1}`,
    image: i % 4 === 0 ? null : `https://picsum.photos/seed/${i}/200/200`,
    category: ['Eletrônicos', 'Roupas', 'Casa'][i % 3],
    brand: ['Adidas', 'Nike', 'Puma'][i % 3],
    quantity: Math.floor(Math.random() * 100),
    status: i % 2 === 0 ? 'active' : 'inactive',
    price: Number((Math.random() * 300).toFixed(2)),
  }))

  await new Promise((r) => setTimeout(r, 1000))

  // FILTRO: search
  let filtered = all
  if (search.trim()) {
    const t = search.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(t) || String(p.id).includes(t),
    )
  }

  // FILTRO: status
  if (status) {
    filtered = filtered.filter((p) => p.status === status)
  }

  // PAGINAÇÃO
  const start = page * limit
  const paginated = filtered.slice(start, start + limit)

  return NextResponse.json({
    items: paginated,
    total: filtered.length,
  })
}

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
