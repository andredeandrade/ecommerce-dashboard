import {
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ReactNode } from 'react'

interface SidebarItemProps {
  href?: string
  label: string
  icon: ReactNode
  open: boolean
  ListItemButtonProps?: ListItemButtonProps
}

export default function SidebarItem({
  href,
  label,
  icon,
  open,
  ListItemButtonProps,
}: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const ButtonComponent = href ? Link : 'button'

  const button = (
    <ListItemButton
      component={ButtonComponent as any}
      href={href}
      sx={{
        borderRadius: 2,
        justifyContent: open ? 'initial' : 'center',
        padding: open ? '5px 10px' : '10px 5px',
        color: isActive ? 'primary.contrastText' : 'grey.900',
        backgroundColor: isActive ? 'primary.dark' : 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
        '&:hover': {
          backgroundColor: isActive
            ? 'primary.dark'
            : !open
              ? 'primary.main'
              : 'transparent',
          color: isActive
            ? 'primary.contrastText'
            : !open
              ? 'primary.contrastText'
              : 'primary.main',
          boxShadow: !isActive
            ? '0 2px 8px rgba(0,0,0,0.2)'
            : '0 2px 10px rgba(0,0,0,0.4)',
          '& .MuiListItemIcon-root': {
            transform: !open ? 'scale(1.15)' : 'none',
            transition: 'transform 0.3s ease',
            color: isActive
              ? 'primary.contrastText'
              : !open
                ? 'primary.contrastText'
                : 'primary.main',
          },
        },
      }}
      {...ListItemButtonProps}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? '10px' : '0',
          justifyContent: 'center',
          color: 'inherit',
          transition: 'all 0.3s ease',
        }}
      >
        {icon}
      </ListItemIcon>

      {open && <ListItemText primary={label} />}
    </ListItemButton>
  )

  return open ? (
    button
  ) : (
    <Tooltip title={label} placement="right">
      {button}
    </Tooltip>
  )
}
