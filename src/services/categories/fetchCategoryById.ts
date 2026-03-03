import { CategoryFormData } from '@/app/(dashboard)/category/_components/CategoryFormProvider'

export async function fetchCategoryById(id: string): Promise<CategoryFormData> {
  const res = await fetch(`/api/category/${id}`)

  if (!res.ok) {
    throw new Error('Erro ao buscar categoria')
  }

  return res.json()
}
