'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchCategories,
  UseCategoriesParams,
} from '@/services/categories/fetchCategories'
import { CategoriesResponse } from '@/types/category'

export function useCategories(params: UseCategoriesParams) {
  return useQuery<CategoriesResponse>({
    queryKey: ['categories', params],
    queryFn: () => fetchCategories(params),
    staleTime: 1000 * 60,
  })
}
