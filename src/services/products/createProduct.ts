import { ProductFormData } from '@/app/(dashboard)/product/_components/ProductFormProvider'

export async function createProduct(data: ProductFormData) {
  const response = await fetch('/api/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar produto')
  }

  return response.json()
}
