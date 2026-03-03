import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCustomer } from '@/services/customers/updateCustomer'

export function useUpdateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => updateCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}
