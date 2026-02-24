'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBrand } from '@/services/brands/updateBrand'
import { BrandFormData } from '@/types/brand'

export function useUpdateBrand(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BrandFormData) => updateBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] })
      queryClient.invalidateQueries({ queryKey: ['all-brands'] })
      queryClient.invalidateQueries({ queryKey: ['brand', id] })
    },
  })
}
