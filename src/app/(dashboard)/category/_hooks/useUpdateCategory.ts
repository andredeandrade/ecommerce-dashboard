'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCategory } from '@/services/categories/updateCategory'
import { CategoryFormData } from '@/app/(dashboard)/category/_components/CategoryFormProvider'

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CategoryFormData) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['all-categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', id] })
    },
  })
}
