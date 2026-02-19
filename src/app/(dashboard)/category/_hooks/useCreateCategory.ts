'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '@/services/categories/createCategory'
import { CategoryFormData } from '@/app/(dashboard)/category/_components/CategoryFormProvider'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CategoryFormData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
