import { Order } from '@/types/order'

export async function deleteOrder(id: string): Promise<Order> {
  const res = await fetch(`/api/order/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Erro ao deletar pedido')
  return res.json()
}
