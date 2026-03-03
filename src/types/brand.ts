export interface Brand {
  id: string
  name: string
  status: 'Ativo' | 'Inativo'
}

export interface BrandsResponse {
  items: Brand[]
  total: number
}

export type BrandFormData = {
  name: string
  isActive?: boolean
}
