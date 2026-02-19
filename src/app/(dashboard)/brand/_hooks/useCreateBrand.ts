'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBrand } from '@/services/brands/createBrand'
import { BrandFormData } from '@/types/brand'

export function useCreateBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BrandFormData) => createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },
  })
}
