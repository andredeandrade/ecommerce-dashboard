'use client'

import { TableProvider } from '../../../../components/ui/table/providers/TableProvider'
import CategoriesTableContent from './CategoriesTableContent'

export default function CategoriesTable() {
  return (
    <TableProvider>
      <CategoriesTableContent />
    </TableProvider>
  )
}
