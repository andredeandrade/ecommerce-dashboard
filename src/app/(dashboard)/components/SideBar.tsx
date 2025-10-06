'use client'

import Link from 'next/link'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/dashboard/profile">
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/dashboard/settings">
            <ListItemText primary="Configurações" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
