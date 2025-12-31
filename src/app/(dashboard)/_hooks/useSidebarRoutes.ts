'use client'

import { useMemo } from 'react'
import { signOut } from 'next-auth/react'

import AnalyticsIcon from '@mui/icons-material/Analytics'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'

type SidebarRoute = {
  label: string
  href?: string
  iconName?: string
  onClick?: () => void
  IconComponent?: React.ElementType
}

export function useSidebarRoutes(): SidebarRoute[] {
  const routes = useMemo(() => {
    const iconsMap = {
      Analytics: AnalyticsIcon,
      StorefrontOutlined: StorefrontOutlinedIcon,
      CategoryOutlined: CategoryOutlinedIcon,
      ShoppingCartOutlined: ShoppingCartOutlinedIcon,
      PeopleOutlineOutlined: PeopleOutlineOutlinedIcon,
      SettingsOutlined: SettingsOutlinedIcon,
      LogoutOutlined: LogoutOutlinedIcon,
      LoyaltyOutlined: LoyaltyOutlinedIcon,
    }

    const appRoutes: SidebarRoute[] = [
      { label: 'Dashboard', href: '/dashboard', iconName: 'Analytics' },
      { label: 'Produtos', href: '/products', iconName: 'StorefrontOutlined' },
      {
        label: 'Categorias',
        href: '/categories',
        iconName: 'CategoryOutlined',
      },
      { label: 'Marcas', href: '/brands', iconName: 'LoyaltyOutlined' },
      {
        label: 'Pedidos',
        href: '/orders',
        iconName: 'ShoppingCartOutlined',
      },
      {
        label: 'Clientes',
        href: '/customers',
        iconName: 'PeopleOutlineOutlined',
      },
      {
        label: 'Configurações',
        href: '/settings',
        iconName: 'SettingsOutlined',
      },
      {
        label: 'Sair',
        iconName: 'LogoutOutlined',
        onClick: () => signOut({ callbackUrl: '/' }),
      },
    ]

    return appRoutes.map((route) => ({
      ...route,
      IconComponent: route.iconName
        ? iconsMap[route.iconName as keyof typeof iconsMap]
        : undefined,
    }))
  }, [])

  return routes
}
