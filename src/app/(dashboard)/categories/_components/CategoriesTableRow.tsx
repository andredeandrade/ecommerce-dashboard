'use client'

import { TableCell, TableRow } from '@/components/ui/table/components'
import Link from 'next/link'
import { Category } from '@/types/category'
import CategoriesTableRowActionsMenu from './CategoriesTableRowActionsMenu'

type Props = { category: Category }

export default function CategoriesTableRow({ category }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/category/${category.id}/edit`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {category.name}
        </Link>
      </TableCell>

      <TableCell>{category.status}</TableCell>

      <TableCell>
        <CategoriesTableRowActionsMenu category={category} />
      </TableCell>
    </TableRow>
  )
}
