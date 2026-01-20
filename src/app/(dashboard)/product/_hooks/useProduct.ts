import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '@/services/products/fetchProductById'

export function useProduct(id?: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })
}
