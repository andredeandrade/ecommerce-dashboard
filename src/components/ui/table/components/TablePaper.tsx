'use client'

import { Paper as MuiPaper, PaperProps } from '@mui/material'

export default function TablePaper({ children, sx, ...props }: PaperProps) {
  return (
    <MuiPaper
      elevation={0}
      {...props}
      sx={{
        padding: '30px 20px 15px 20px',
        borderRadius: 3,
        ...(sx || {}),
      }}
    >
      {children}
    </MuiPaper>
  )
}
