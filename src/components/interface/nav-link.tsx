'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { NavbarLinksProps } from './mobile-button/links'

export const NavLink = ({ label, href, hasPermissionLogged, justLoggedAccess }: NavbarLinksProps) => {
  const { data } = useSession()
  const userHasLogged = Boolean(data)
  const currentPathname = usePathname()
  const isActive = currentPathname === href

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        'hover:text-primary text-sm font-medium',
        isActive ? 'text-primary' : 'text-muted-foreground',
        !hasPermissionLogged && userHasLogged && 'hidden',
        !userHasLogged && justLoggedAccess && 'hidden',
      )}
    >
      {label}
    </Link>
  )
}
