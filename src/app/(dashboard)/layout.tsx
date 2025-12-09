'use client'

import { ReactNode, useState } from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Sidebar from './_components/SideBar'
import Topbar from './_components/TopBar'

const theme = createTheme()

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Topbar onToggleSidebar={toggleSidebar} />

      <Box
        sx={{ display: 'flex', flexGrow: 1, minHeight: 'calc(100vh - 64px)' }}
      >
        <Sidebar open={sidebarOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: '30px 40px',
            backgroundColor: 'grey.50',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
