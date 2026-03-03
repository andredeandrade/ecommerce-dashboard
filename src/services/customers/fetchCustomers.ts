import { CustomersResponse } from '@/types/customers'

export interface UseCustomersParams {
  page: number
  rowsPerPage: number
  search: string
  status?: string
}

export async function fetchCustomers(
  params: UseCustomersParams,
): Promise<CustomersResponse> {
  const query = new URLSearchParams()

  query.set('page', String(params.page))
  query.set('limit', String(params.rowsPerPage))

  if (params.search) query.set('search', params.search)
  if (params.status) query.set('status', params.status)

  const res = await fetch(`/api/customers?${query.toString()}`)
  if (!res.ok) throw new Error('Erro ao buscar clientes')

  return res.json()
}
