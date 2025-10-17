'use client'

import { List, styled } from '@mui/material'
import SidebarItem from './SidebarItem'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { appRoutes } from '@/config/routes'

const iconMap = {
  Analytics: AnalyticsIcon,
  StorefrontOutlined: StorefrontOutlinedIcon,
  CategoryOutlined: CategoryOutlinedIcon,
  ShoppingCartOutlined: ShoppingCartOutlinedIcon,
  PeopleOutlineOutlined: PeopleOutlineOutlinedIcon,
  SettingsOutlined: SettingsOutlinedIcon,
  LogoutOutlined: LogoutOutlinedIcon,
}

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
        {appRoutes.map((route) => {
          const IconComponent = route.iconName
            ? iconMap[route.iconName as keyof typeof iconMap]
            : null
          return (
            <SidebarItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={IconComponent ? <IconComponent /> : undefined}
              open={open}
              ListItemButtonProps={
                route.onClick ? { onClick: route.onClick } : undefined
              }
            />
          )
        })}
      </List>
    </SidebarContainer>
  )
}
