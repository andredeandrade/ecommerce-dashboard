import { BrandsResponse } from '@/types/brand'

export interface UseBrandsParams {
  page: number
  rowsPerPage: number
  search: string
}

export async function fetchBrands(
  params: UseBrandsParams,
): Promise<BrandsResponse> {
  const query = new URLSearchParams()

  query.set('page', String(params.page))
  query.set('limit', String(params.rowsPerPage))

  if (params.search) query.set('search', params.search)

  const res = await fetch(`/api/brands?${query.toString()}`)

  if (!res.ok) throw new Error('Erro ao buscar marcas')

  return res.json()
}
