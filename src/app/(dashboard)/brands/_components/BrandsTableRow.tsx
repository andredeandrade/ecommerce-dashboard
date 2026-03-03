'use client'

import { TableCell, TableRow } from '@/components/ui/table/components'
import Link from 'next/link'
import { Brand } from '@/types/brand'
import BrandsTableRowActionsMenu from './BrandsTableRowActionsMenu'

type Props = { brand: Brand }

export default function BrandsTableRow({ brand }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/brand/${brand.id}/edit`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {brand.name}
        </Link>
      </TableCell>

      <TableCell>{brand.status}</TableCell>

      <TableCell>
        <BrandsTableRowActionsMenu brand={brand} />
      </TableCell>
    </TableRow>
  )
}
