import { useQuery } from '@tanstack/react-query'
import { fetchOrderById } from '@/services/orders/fetchOrderById'

export function useOrder(id?: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
  })
}
