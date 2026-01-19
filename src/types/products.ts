import { Product } from './product'

export interface ProductsResponse {
  items: Product[]
  total: number
}
