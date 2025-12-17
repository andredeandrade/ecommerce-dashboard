import { ProductFormData } from '@/app/(dashboard)/product/_components/ProductFormProvider'

export async function updateProduct(id: number, data: ProductFormData) {
  const res = await fetch(`/api/product/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Erro ao atualizar produto')
  }

  return res.json()
}
