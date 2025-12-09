'use client'

import { Typography, Box } from '@mui/material'
import TableRow from './TableRow'
import TableCell from './TableCell'

interface TableRowEmptyProps {
  message?: string
  colSpan: number
}

export default function TableRowEmpty({
  message = 'Nenhum item encontrado',
  colSpan,
}: TableRowEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ py: 6 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={1}
        >
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  )
}
