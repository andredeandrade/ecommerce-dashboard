'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBrand } from '@/services/brands/deleteBrand'

export function useDeleteBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] })
      queryClient.invalidateQueries({ queryKey: ['all-brands'] })
    },
  })
}
