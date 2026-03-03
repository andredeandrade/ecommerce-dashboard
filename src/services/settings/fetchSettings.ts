import { Settings } from '@/types/settings'

export async function fetchSettings(): Promise<Settings | null> {
  const res = await fetch('/api/settings')

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error('Erro ao buscar configurações')
  }

  const data = await res.json()

  // Convert Decimal fields to numbers
  if (data) {
    if (data.taxRate != null) data.taxRate = Number(data.taxRate)
    if (data.freeShippingMinValue != null)
      data.freeShippingMinValue = Number(data.freeShippingMinValue)
    if (data.defaultShippingCost != null)
      data.defaultShippingCost = Number(data.defaultShippingCost)
  }

  return data
}
