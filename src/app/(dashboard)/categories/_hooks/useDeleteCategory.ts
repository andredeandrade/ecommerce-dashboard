'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategory } from '@/services/categories/deleteCategory'

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['all-categories'] })
    },
  })
}
