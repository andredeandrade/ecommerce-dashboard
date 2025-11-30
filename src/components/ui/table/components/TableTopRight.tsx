'use client'

import { Box, BoxProps } from '@mui/material'

export default function TableTopRight({ children, sx, ...props }: BoxProps) {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      gap={2}
      alignItems="flex-start"
      mb={3}
      {...props}
      sx={{ ...sx }}
    >
      {children}
    </Box>
  )
}
