import { Order } from './order'

export interface OrdersResponse {
  items: Order[]
  total: number
}
