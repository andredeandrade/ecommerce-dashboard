import { ProductsResponse } from '@/app/api/products/types'

export interface UseProductsParams {
  page: number
  rowsPerPage: number
  search: string
  status?: string
}

export async function fetchProducts(
  params: UseProductsParams,
): Promise<ProductsResponse> {
  const query = new URLSearchParams()

  query.set('page', String(params.page))
  query.set('limit', String(params.rowsPerPage))

  if (params.search) query.set('search', params.search)
  if (params.status) query.set('status', params.status)

  const res = await fetch(`/api/products?${query.toString()}`)

  if (!res.ok) throw new Error('Erro ao buscar produtos')

  return res.json()
}
