'use client'

import { SnackbarProvider } from 'notistack'

export function SnackbarConfig({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
