import { Category } from '@/types/category'

export async function fetchAllCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories?all=true')

  if (!res.ok) throw new Error('Erro ao buscar categorias')

  const data = await res.json()

  if (Array.isArray(data)) return data

  if (data?.items && Array.isArray(data.items)) return data.items

  if (data?.categories && Array.isArray(data.categories)) return data.categories

  return []
}
