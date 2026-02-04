'use client'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Skeleton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import UserMenu from './UserMenu'
import Link from 'next/link'
import { useAuthUser } from '../_hooks/useAuthUser'

interface TopbarProps {
  onToggleSidebar: () => void
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const { user, loading } = useAuthUser()

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

        {loading ? (
          <Skeleton variant="text" width={320} height={40} />
        ) : (
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
            {user?.storeName} Dashboard
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}
