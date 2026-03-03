import { OrdersResponse } from '@/types/orders'

export interface UseOrdersParams {
  page: number
  rowsPerPage: number
  search: string
  status?: string
}

export async function fetchOrders(
  params: UseOrdersParams,
): Promise<OrdersResponse> {
  const query = new URLSearchParams()

  query.set('page', String(params.page))
  query.set('limit', String(params.rowsPerPage))

  if (params.search) query.set('search', params.search)
  if (params.status) query.set('status', params.status)

  const res = await fetch(`/api/orders?${query.toString()}`)

  if (!res.ok) throw new Error('Erro ao buscar pedidos')

  return res.json()
}
