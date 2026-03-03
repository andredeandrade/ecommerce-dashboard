import { Order } from '@/types/order'

export interface CreateOrderParams {
  status?: string
  subtotal: number
  tax?: number
  shipping?: number
  total: number
  items: Array<{
    productId: string
    name: string
    sku?: string
    price: number
    quantity: number
  }>
}

export async function createOrder(params: CreateOrderParams): Promise<Order> {
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!res.ok) throw new Error('Erro ao criar pedido')
  return res.json()
}
