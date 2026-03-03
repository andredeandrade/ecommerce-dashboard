'use client'

import { Stack, Typography, Box } from '@mui/material'
import Link from 'next/link'
import OrdersStatusBadge from './OrdersStatusBadge'
import OrdersTableRowActionsMenu from './OrdersTableRowActionsMenu'
import { TableCell, TableRow } from '@/components/ui/table/components'
import { Order } from '@/types/order'

type Props = {
  order: Order
}

export default function OrdersTableRow({ order }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/order/${order.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {order.id}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>
        <OrdersStatusBadge status={order.status} />
      </TableCell>

      <TableCell>R$ {order.subtotal.toFixed(2)}</TableCell>

      <TableCell>R$ {order.total.toFixed(2)}</TableCell>

      <TableCell>
        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
      </TableCell>

      <TableCell>
        <OrdersTableRowActionsMenu order={order} />
      </TableCell>
    </TableRow>
  )
}
