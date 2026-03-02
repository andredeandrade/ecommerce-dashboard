import { useQuery } from '@tanstack/react-query'
import { fetchCustomerById } from '@/services/customers/fetchCustomerById'

export function useCustomer(id?: string) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => fetchCustomerById(id!),
    enabled: !!id,
  })
}
