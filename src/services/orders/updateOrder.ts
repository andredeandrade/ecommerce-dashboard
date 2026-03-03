import { Order } from '@/types/order'

export interface UpdateOrderParams {
  id: string
  status?: string
  subtotal?: number
  tax?: number
  shipping?: number
  total?: number
  items?: Array<{
    productId: string
    name: string
    sku?: string
    price: number
    quantity: number
  }>
}

export async function updateOrder(params: UpdateOrderParams): Promise<Order> {
  const { id, ...body } = params
  const res = await fetch(`/api/order/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error('Erro ao atualizar pedido')
  return res.json()
}
