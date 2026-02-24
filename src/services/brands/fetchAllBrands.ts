import { Brand } from '@/types/brand'

export async function fetchAllBrands(): Promise<Brand[]> {
  const res = await fetch('/api/brands?all=true')

  if (!res.ok) throw new Error('Erro ao buscar marcas')

  const data = await res.json()

  if (Array.isArray(data)) return data

  if (data?.items && Array.isArray(data.items)) return data.items

  if (data?.brands && Array.isArray(data.brands)) return data.brands

  return []
}
