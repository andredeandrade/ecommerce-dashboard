'use client'

import { List, styled } from '@mui/material'
import SidebarItem from './SidebarItem'
import { useSidebarRoutes } from '../_hooks/useSidebarRoutes'

interface SidebarProps {
  open: boolean
}

const SidebarContainer = styled('aside')<{ open: boolean }>(
  ({ open, theme }) => ({
    position: 'sticky',
    top: 64,
    alignSelf: 'flex-start',
    width: open ? 240 : 60,
    overflowX: 'hidden',
    height: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.background.paper,
    transition: 'width 0.3s ease, padding 0.3s ease',
    padding: open ? '10px' : '10px 4px',
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
  }),
)

export default function Sidebar({ open }: SidebarProps) {
  const routes = useSidebarRoutes()

  return (
    <SidebarContainer open={open}>
      <List
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: open ? '7px' : '5px',
        }}
      >
        {routes.map(({ label, href, onClick, IconComponent }) => (
          <SidebarItem
            key={label}
            href={href}
            label={label}
            icon={IconComponent ? <IconComponent /> : undefined}
            open={open}
            ListItemButtonProps={onClick ? { onClick } : undefined}
          />
        ))}
      </List>
    </SidebarContainer>
  )
}
