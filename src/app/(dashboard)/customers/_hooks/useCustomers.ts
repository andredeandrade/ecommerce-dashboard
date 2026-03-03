import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '@/services/customers/fetchCustomers'

export function useCustomers(params: {
  page: number
  rowsPerPage: number
  search: string
  status?: string
}) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
    placeholderData: (previousData) => previousData,
  })
}
