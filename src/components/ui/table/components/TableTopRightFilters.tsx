'use client'

import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function TableTopRightFilters({ children }: PropsWithChildren) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={1}
      sx={{ width: '20%' }}
    >
      {children}
    </Box>
  )
}
