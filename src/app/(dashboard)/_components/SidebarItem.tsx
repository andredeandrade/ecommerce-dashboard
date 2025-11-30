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
        color: isActive ? 'primary.main' : 'grey.900',
        transition: 'all 0.3s ease',
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
