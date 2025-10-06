'use client'

import { ReactNode, useState } from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Sidebar from './components/SideBar'
import Topbar from './components/TopBar'

const theme = createTheme()

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar open={sidebarOpen} />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar onToggleSidebar={toggleSidebar} />
          <Box component="main" sx={{ p: 3, mt: '64px' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
