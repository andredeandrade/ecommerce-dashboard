export interface Product {
  id: number
  name: string
  image: string | null
  category: string
  brand: string
  quantity: number
  status: 'Ativo' | 'Inativo'
  price: number
}

export interface ProductsResponse {
  items: Product[]
  total: number
}
