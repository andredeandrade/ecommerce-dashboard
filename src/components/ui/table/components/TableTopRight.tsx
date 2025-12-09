'use client'

import { Box, styled } from '@mui/material'

export const TableSearchAndChips = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  width: '20%',
}))

export default function TableTopRight({ children }: any) {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="flex-start"
      width="100%"
      gap={2}
      mb={2}
    >
      {children}
    </Box>
  )
}
