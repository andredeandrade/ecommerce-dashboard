import { MuiCacheProvider } from './MuiCacheProvider'
import { SnackbarConfig } from './SnackbarProvider'
import { ThemeConfig } from './ThemeProvider'
import { ReactQueryProvider } from './ReactQueryProvider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MuiCacheProvider>
      <ThemeConfig>
        <SnackbarConfig>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SnackbarConfig>
      </ThemeConfig>
    </MuiCacheProvider>
  )
}
