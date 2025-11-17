import { MuiCacheProvider } from './MuiCacheProvider'
import { SnackbarConfig } from './SnackbarProvider'
import { ThemeConfig } from './ThemeProvider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MuiCacheProvider>
      <ThemeConfig>
        <SnackbarConfig>{children}</SnackbarConfig>
      </ThemeConfig>
    </MuiCacheProvider>
  )
}
