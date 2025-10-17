'use client'

import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import UserMenu from './UserMenu'
import Link from 'next/link'

interface TopbarProps {
  onToggleSidebar: () => void
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2, borderRadius: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component={Link}
          href="/dashboard"
          sx={{
            fontWeight: 600,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 },
          }}
        >
          Meu Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}
