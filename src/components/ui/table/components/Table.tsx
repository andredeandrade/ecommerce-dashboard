'use client'

import { Table as MuiTable, TableProps } from '@mui/material'

export default function Table({ children, ...props }: TableProps) {
  return <MuiTable {...props}>{children}</MuiTable>
}
