'use client'

import { TableProvider } from '../../../../components/ui/table/providers/TableProvider'
import CustomersTableContent from './CustomersTableContent'

export default function CustomersTable() {
  return (
    <TableProvider>
      <CustomersTableContent />
    </TableProvider>
  )
}
