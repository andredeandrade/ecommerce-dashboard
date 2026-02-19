import { CategoriesResponse } from '@/types/category'

export interface UseCategoriesParams {
  page: number
  rowsPerPage: number
  search: string
}

export async function fetchCategories(
  params: UseCategoriesParams,
): Promise<CategoriesResponse> {
  const query = new URLSearchParams()

  query.set('page', String(params.page))
  query.set('limit', String(params.rowsPerPage))

  if (params.search) query.set('search', params.search)

  const res = await fetch(`/api/categories?${query.toString()}`)

  if (!res.ok) throw new Error('Erro ao buscar categorias')

  return res.json()
}
