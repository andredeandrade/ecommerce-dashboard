import { Customer } from '@/types/customer'

export interface CustomerFormData {
  name: string
  email: string
  phone?: string
  isActive?: boolean
}

export async function createCustomer(
  data: CustomerFormData,
): Promise<Customer> {
  const response = await fetch('/api/customer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar cliente')
  }

  return response.json()
}
