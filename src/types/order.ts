export interface OrderItem {
  id: string
  productId: string
  name: string
  sku?: string | null
  price: number
  quantity: number
}

export interface Order {
  id: string
  status: string
  subtotal: number
  tax?: number | null
  shipping?: number | null
  total: number
  items?: OrderItem[]
  createdAt?: string
}
