'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { navbarItems } from './navbar-itens'

interface HomeNavbarProps {
  className?: string
}

export function HomeNavbar({ className }: HomeNavbarProps) {
  const { data: user } = useSession()
  const userHasLogged = Boolean(user?.user)
  const pathname = usePathname()

  return (
    <nav className={cn('hidden items-center space-x-4 sm:flex lg:space-x-6', className)}>
      {navbarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'hover:text-primary text-sm font-medium',
            item.href === pathname ? 'text-primary' : 'text-muted-foreground',
            !item.hasPermissionLogged && userHasLogged && 'hidden',
            !userHasLogged && item.justLoggedAccess && 'hidden',
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
