import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

export function MuiCacheProvider({ children }: { children: React.ReactNode }) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
}
