'use client'

import { TableProvider } from '../../../../components/ui/table/providers/TableProvider'
import ProductsTableContent from './ProductsTableContent'

export default function ProductsTable() {
  return (
    <TableProvider>
      <ProductsTableContent />
    </TableProvider>
  )
}
