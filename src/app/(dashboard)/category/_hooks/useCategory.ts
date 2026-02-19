'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchCategoryById } from '@/services/categories/fetchCategoryById'

export function useCategory(id?: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id!),
    enabled: !!id,
  })
}
