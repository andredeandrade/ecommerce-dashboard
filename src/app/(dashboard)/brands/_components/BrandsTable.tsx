'use client'

import { TableProvider } from '../../../../components/ui/table/providers/TableProvider'
import BrandsTableContent from './BrandsTableContent'

export default function BrandsTable() {
  return (
    <TableProvider>
      <BrandsTableContent />
    </TableProvider>
  )
}
