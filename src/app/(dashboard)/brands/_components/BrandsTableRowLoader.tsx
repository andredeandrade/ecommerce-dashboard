'use client'

import { TableCell, TableRow } from '@/components/ui/table/components'
import { Skeleton } from '@mui/material'

export default function BrandsTableRowLoader() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" width={160} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={80} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  )
}
