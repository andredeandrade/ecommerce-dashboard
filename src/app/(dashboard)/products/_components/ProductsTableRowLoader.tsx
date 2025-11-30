'use client'

import { TableCell, TableRow } from '@/components/ui/table/components'
import { Skeleton, Stack, Box } from '@mui/material'

export default function ProductsTableRowLoader() {
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton
            variant="rounded"
            width={60}
            height={60}
            sx={{ borderRadius: 2 }}
          />

          <Box>
            <Skeleton variant="text" width={140} height={20} />

            <Skeleton variant="text" width={80} height={16} />
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={80} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={90} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={40} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="rounded" width={70} height={28} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={50} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  )
}
