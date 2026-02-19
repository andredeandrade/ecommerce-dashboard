import { BrandFormData } from '@/types/brand'

export async function createBrand(data: BrandFormData) {
  const response = await fetch('/api/brand', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar marca')
  }

  return response.json()
}
