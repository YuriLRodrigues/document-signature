type NavbarItensProps = {
  name: string
  href: string
  hasPermissionLogged: boolean
  justLoggedAccess: boolean
}

export const navbarItems: NavbarItensProps[] = [
  {
    name: 'Início',
    href: '/',
    hasPermissionLogged: true,
    justLoggedAccess: false,
  },
  {
    name: 'Painel',
    href: '/dashboard',
    hasPermissionLogged: true,
    justLoggedAccess: true,
  },
  {
    name: 'Documentos',
    href: '/dashboard/documents',
    hasPermissionLogged: true,
    justLoggedAccess: true,
  },
  {
    name: 'Acessar',
    href: '/auth/login',
    hasPermissionLogged: false,
    justLoggedAccess: false,
  },
  {
    name: 'Cadastrar',
    href: '/auth/register',
    hasPermissionLogged: false,
    justLoggedAccess: false,
  },
]
