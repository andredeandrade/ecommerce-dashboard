'use client'

import { useQuery } from '@tanstack/react-query'
import type { ProductsResponse } from '@/app/api/products/types'
import {
  fetchProducts,
  UseProductsParams,
} from '@/services/products/fetchProducts'

export function useProducts(params: UseProductsParams) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60, // 1 min
  })
}
