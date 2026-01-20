import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '@/services/products/updateProduct'
import { ProductFormData } from '../_components/ProductFormProvider'

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProductFormData) => updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    },
  })
}
