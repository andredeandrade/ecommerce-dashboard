import { BrandFormData } from '@/types/brand'

export async function fetchBrandById(id: string): Promise<BrandFormData> {
  const response = await fetch(`/api/brand/${id}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar marca')
  }

  return response.json()
}
