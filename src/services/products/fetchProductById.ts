import { ProductFormData } from '@/app/(dashboard)/product/_components/ProductFormProvider'

export async function fetchProductById(id: number): Promise<ProductFormData> {
  const res = await fetch(`/api/product/${id}`)

  if (!res.ok) {
    throw new Error('Erro ao buscar produto')
  }

  return res.json()
}
