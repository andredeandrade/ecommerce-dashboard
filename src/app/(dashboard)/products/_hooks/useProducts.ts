'use client'

import { useQuery } from '@tanstack/react-query'
import type { ProductsResponse } from '@/app/api/products/types'

interface UseProductsParams {
  page: number
  rowsPerPage: number
  search: string
  status?: string
}

async function fetchProducts(
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

export function useProducts(params: UseProductsParams) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60, // 1 min
  })
}
