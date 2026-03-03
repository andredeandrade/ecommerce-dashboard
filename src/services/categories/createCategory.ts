import { CategoryFormData } from '@/app/(dashboard)/category/_components/CategoryFormProvider'

export async function createCategory(data: CategoryFormData) {
  const response = await fetch('/api/category', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar categoria')
  }

  return response.json()
}
