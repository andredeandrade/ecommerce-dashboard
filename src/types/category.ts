export interface Category {
  id: string
  name: string
  status: 'Ativo' | 'Inativo'
}

export interface CategoriesResponse {
  items: Category[]
  total: number
}
