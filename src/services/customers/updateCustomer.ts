import { Customer } from '@/types/customer'

export interface UpdateCustomerParams {
  id: string
  name?: string
  email?: string
  phone?: string
  isActive?: boolean
}

export async function updateCustomer(
  params: UpdateCustomerParams,
): Promise<Customer> {
  const { id, ...body } = params
  const res = await fetch(`/api/customer/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Erro ao atualizar cliente')
  }

  return res.json()
}
