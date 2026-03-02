import { Settings } from '@/types/settings'

export interface UpdateSettingsParams {
  storeName?: string
  storeDescription?: string
  storeEmail?: string
  storePhone?: string
  storeAddress?: string
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  whatsappUrl?: string
  taxId?: string
  taxRate?: number
  freeShippingMinValue?: number
  defaultShippingCost?: number
  enableOrderNotifications?: boolean
  enableCustomerNotifications?: boolean
  enableLowStockAlerts?: boolean
  lowStockThreshold?: number
  currency?: string
  timezone?: string
  locale?: string
  termsOfService?: string
  privacyPolicy?: string
  returnPolicy?: string
}

export async function updateSettings(
  data: UpdateSettingsParams,
): Promise<Settings> {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Erro ao atualizar configurações')
  }

  const result = await res.json()

  // Convert Decimal fields to numbers
  if (result.taxRate != null) result.taxRate = Number(result.taxRate)
  if (result.freeShippingMinValue != null)
    result.freeShippingMinValue = Number(result.freeShippingMinValue)
  if (result.defaultShippingCost != null)
    result.defaultShippingCost = Number(result.defaultShippingCost)

  return result
}
