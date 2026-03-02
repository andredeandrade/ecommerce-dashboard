'use client'

import { TableCell, TableRow } from '@/components/ui/table/components'
import { Skeleton } from '@mui/material'

export default function CustomersTableRowLoader() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" width={140} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={180} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="rounded" width={70} height={28} />
      </TableCell>

      <TableCell>
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  )
}
