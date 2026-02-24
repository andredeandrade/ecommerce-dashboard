'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchAllBrands } from '@/services/brands/fetchAllBrands'
import { Brand } from '@/types/brand'

export function useBrands() {
  return useQuery<Brand[]>({
    queryKey: ['all-brands'],
    queryFn: () => fetchAllBrands(),
    staleTime: 1000 * 60,
  })
}
