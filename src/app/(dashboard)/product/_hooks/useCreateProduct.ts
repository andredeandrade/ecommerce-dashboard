import { useMutation } from '@tanstack/react-query'
import { createProduct } from '@/services/products/createProduct'
import { ProductFormData } from '../_components/ProductFormProvider'

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(data),
  })
}
