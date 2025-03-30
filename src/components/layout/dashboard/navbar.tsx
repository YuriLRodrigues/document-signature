'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { navbarItems } from './navbar-itens'

interface DashboardNavbarProps {
  className?: string
}

export function DashboardNavbar({ className }: DashboardNavbarProps) {
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
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
