'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchAllCategories } from '@/services/categories/fetchAllCategories'
import { Category } from '@/types/category'

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['all-categories'],
    queryFn: () => fetchAllCategories(),
    staleTime: 1000 * 60,
  })
}
