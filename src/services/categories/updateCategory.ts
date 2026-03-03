import { CategoryFormData } from '@/app/(dashboard)/category/_components/CategoryFormProvider'

export async function updateCategory(id: string, data: CategoryFormData) {
  const res = await fetch(`/api/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Erro ao atualizar categoria')
  }

  return res.json()
}
