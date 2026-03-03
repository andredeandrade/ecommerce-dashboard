export interface Customer {
  id: string
  name: string
  email: string
  phone?: string | null
  status: 'Ativo' | 'Inativo'
  createdAt?: string
}
