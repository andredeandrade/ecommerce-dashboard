'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchOrders, UseOrdersParams } from '@/services/orders/fetchOrders'
import { OrdersResponse } from '@/types/orders'

export function useOrders(params: UseOrdersParams) {
  return useQuery<OrdersResponse>({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    staleTime: 1000 * 60, // 1 min
  })
}
