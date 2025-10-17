export interface AppRoute {
  label: string
  href?: string
  iconName?: string
  onClick?: () => void
}

export const appRoutes: AppRoute[] = [
  { label: 'Dashboard', href: '/dashboard', iconName: 'Analytics' },
  { label: 'Produtos', href: '/products', iconName: 'StorefrontOutlined' },
  { label: 'Categorias', href: '/categories', iconName: 'CategoryOutlined' },
  { label: 'Pedidos', href: '/orders', iconName: 'ShoppingCartOutlined' },
  { label: 'Clientes', href: '/customers', iconName: 'PeopleOutlineOutlined' },
  { label: 'Configurações', href: '/settings', iconName: 'SettingsOutlined' },
  {
    label: 'Sair',
    iconName: 'LogoutOutlined',
    onClick: () => console.log('Logout clicked'),
  },
]
