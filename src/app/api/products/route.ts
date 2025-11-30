import { NextResponse } from 'next/server'

const products = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  name: `Produto ${i + 1}`,
  image: i % 4 === 0 ? null : `https://picsum.photos/seed/${i}/200/200`,
  category: ['Eletrônicos', 'Roupas', 'Casa'][i % 3],
  brand: ['Adidas', 'Nike', 'Puma'][i % 3],
  quantity: Math.floor(Math.random() * 100),
  status: i % 2 === 0 ? 'Ativo' : 'Inativo',
  price: Number((Math.random() * 300).toFixed(2)),
}))

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get('search') || ''
  const models = searchParams.get('models')?.split(',') || []
  const page = Number(searchParams.get('page') || 0)
  const limit = Number(searchParams.get('limit') || 10)

  await new Promise((res) => setTimeout(res, 1200))

  let result = [...products]

  if (search.trim()) {
    const term = search.toLowerCase()
    result = result.filter(
      (p) => p.name.toLowerCase().includes(term) || String(p.id).includes(term),
    )
  }

  if (models.length > 0) {
    result = result.filter((p) =>
      models.some((m) => p.name.toLowerCase().includes(m.toLowerCase())),
    )
  }

  const total = result.length

  result = result.slice(page * limit, page * limit + limit)

  return NextResponse.json({
    items: result,
    total,
  })
}
