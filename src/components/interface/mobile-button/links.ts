import { icons } from 'lucide-react'

export type NavbarLinksProps = {
  iconName: keyof typeof icons
  href: string
  label: string
  hasPermissionLogged: boolean
  justLoggedAccess: boolean
}

export const navbarLinks: NavbarLinksProps[] = [
  {
    href: '/',
    label: 'Início',
    iconName: 'House',
    hasPermissionLogged: true,
    justLoggedAccess: false,
  },
  {
    href: '/dashboard',
    label: 'Painel',
    iconName: 'LayoutDashboard',
    hasPermissionLogged: true,
    justLoggedAccess: true,
  },
  {
    href: '/dashboard/documents',
    label: 'Documentos',
    iconName: 'Archive',
    hasPermissionLogged: true,
    justLoggedAccess: true,
  },
  {
    href: '/auth/login',
    label: 'Acessar',
    iconName: 'LogIn',
    hasPermissionLogged: false,
    justLoggedAccess: false,
  },
  {
    href: '/auth/register',
    label: 'Cadastrar',
    iconName: 'User',
    hasPermissionLogged: false,
    justLoggedAccess: false,
  },
]
