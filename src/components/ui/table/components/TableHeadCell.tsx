'use client'

import { TableCell, Typography, TableCellProps } from '@mui/material'

interface TableHeadCellProps extends TableCellProps {
  children: React.ReactNode
}

export default function TableHeadCell({
  children,
  ...props
}: TableHeadCellProps) {
  return (
    <TableCell {...props}>
      <Typography variant="body2" color="#B5B7C0">
        {children}
      </Typography>
    </TableCell>
  )
}
