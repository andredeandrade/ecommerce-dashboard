import { useQuery } from '@tanstack/react-query'
import { fetchSettings } from '@/services/settings/fetchSettings'

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  })
}
