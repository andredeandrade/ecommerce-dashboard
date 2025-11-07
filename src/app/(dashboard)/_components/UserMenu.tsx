'use client'

import { useState, MouseEvent } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccountClick = () => {
    handleClose()
  }

  const handleLogoutClick = () => {
    handleClose()
  }

  const name = 'Andre'
  const avatarUrl = ''

  return (
    <Box>
      <IconButton
        onClick={handleOpen}
        sx={{
          ml: 1,
          p: 0.5,
          borderRadius: 2,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.04)',
          },
        }}
      >
        {avatarUrl ? (
          <Avatar src={avatarUrl} alt={name} sx={{ width: 36, height: 36 }} />
        ) : (
          <Avatar sx={{ width: 36, height: 36 }}>
            <AccountCircle />
          </Avatar>
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30,30,30,0.9)'
                : 'background.paper',
            backdropFilter: 'blur(8px)',
          },
        }}
      >
        <MenuItem onClick={handleAccountClick}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Minha Conta" />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sair" sx={{ fontWeight: 500 }} />
        </MenuItem>
      </Menu>
    </Box>
  )
}
