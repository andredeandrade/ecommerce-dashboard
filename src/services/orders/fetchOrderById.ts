import { Order } from '@/types/order'

export async function fetchOrderById(id: string): Promise<Order> {
  const res = await fetch(`/api/order/${id}`)
  if (!res.ok) throw new Error('Erro ao buscar pedido')

  const json = await res.json()

  // prisma returns Decimal values as strings; coerce to numbers
  if (json) {
    json.subtotal = Number(json.subtotal)
    json.tax = json.tax != null ? Number(json.tax) : null
    json.shipping = json.shipping != null ? Number(json.shipping) : null
    json.total = Number(json.total)

    if (Array.isArray(json.items)) {
      json.items = json.items.map((item: any) => ({
        ...item,
        price: Number(item.price),
      }))
    }
  }

  return json
}
