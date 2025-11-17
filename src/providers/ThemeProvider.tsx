'use client'

import theme from '@/config/theme'
import { ThemeProvider, CssBaseline } from '@mui/material'

export function ThemeConfig({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
