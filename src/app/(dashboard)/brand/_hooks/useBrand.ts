'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchBrandById } from '@/services/brands/fetchBrandById'

export function useBrand(id?: string) {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => fetchBrandById(id!),
    enabled: !!id,
  })
}
