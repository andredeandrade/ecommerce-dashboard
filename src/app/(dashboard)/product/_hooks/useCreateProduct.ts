import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/services/products/createProduct'
import { ProductFormData } from '../_components/ProductFormProvider'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })
}
