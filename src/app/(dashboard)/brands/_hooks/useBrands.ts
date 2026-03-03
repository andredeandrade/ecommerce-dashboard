'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchBrands, UseBrandsParams } from '@/services/brands/fetchBrands'
import { BrandsResponse } from '@/types/brand'

export function useBrands(params: UseBrandsParams) {
  return useQuery<BrandsResponse>({
    queryKey: ['brands', params],
    queryFn: () => fetchBrands(params),
    staleTime: 1000 * 60,
  })
}
