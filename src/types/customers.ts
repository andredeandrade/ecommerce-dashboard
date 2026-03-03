import { Customer } from './customer'

export interface CustomersResponse {
  items: Customer[]
  total: number
}
