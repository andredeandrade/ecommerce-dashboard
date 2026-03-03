import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSettings } from '@/services/settings/updateSettings'

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}
