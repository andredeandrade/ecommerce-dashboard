import { BrandFormData } from '@/types/brand'

export async function updateBrand(id: string, data: BrandFormData) {
  const response = await fetch(`/api/brand/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao atualizar marca')
  }

  return response.json()
}
