export interface Product {
  id: string
  name: string
  image: string | null
  category: string
  brand: string
  quantity: number
  status: 'Ativo' | 'Inativo'
  price: number
}
