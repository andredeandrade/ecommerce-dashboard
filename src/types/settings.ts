export interface Settings {
  id: string
  ownerId: string

  // Informações da loja
  storeName?: string | null
  storeDescription?: string | null
  storeEmail?: string | null
  storePhone?: string | null
  storeAddress?: string | null

  // Links sociais
  facebookUrl?: string | null
  instagramUrl?: string | null
  twitterUrl?: string | null
  whatsappUrl?: string | null

  // Configurações fiscais
  taxId?: string | null
  taxRate?: number | null

  // Configurações de envio
  freeShippingMinValue?: number | null
  defaultShippingCost?: number | null

  // Configurações de notificação
  enableOrderNotifications: boolean
  enableCustomerNotifications: boolean
  enableLowStockAlerts: boolean
  lowStockThreshold?: number | null

  // Configurações regionais
  currency: string
  timezone: string
  locale: string

  // Termos e políticas
  termsOfService?: string | null
  privacyPolicy?: string | null
  returnPolicy?: string | null

  createdAt?: string
  updatedAt?: string
}
