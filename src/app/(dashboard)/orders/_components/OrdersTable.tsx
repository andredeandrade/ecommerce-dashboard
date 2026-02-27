'use client'

import { TableProvider } from '../../../../components/ui/table/providers/TableProvider'
import OrdersTableContent from './OrdersTableContent'

export default function OrdersTable() {
  return (
    <TableProvider>
      <OrdersTableContent />
    </TableProvider>
  )
}
