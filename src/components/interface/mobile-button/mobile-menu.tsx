import { getServerSession } from 'next-auth'

import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'

import { authOptions } from '@/lib/auth'
import { Menu } from 'lucide-react'

import { NavLink } from '../nav-link'
import { navbarLinks } from './links'
import { LogoutButton } from './logout-button'

export const MobileMenu = async () => {
  const session = await getServerSession(authOptions)
  const userAlreadyAuthenticated = Boolean(session?.user)

  return (
    <Sheet>
      <SheetTrigger className="flex cursor-pointer items-center justify-center gap-2 sm:hidden">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-6">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3">DocSign</SheetTitle>
          <ThemeToggle />
        </SheetHeader>
        <ul className="flex flex-1 flex-col gap-3">
          {navbarLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              iconName={link.iconName}
              label={link.label}
              hasPermissionLogged={link.hasPermissionLogged}
              justLoggedAccess={link.justLoggedAccess}
            />
          ))}
        </ul>
        {userAlreadyAuthenticated && (
          <div className="space-y-3">
            <Separator />
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={session?.user.image ?? '/assets/default-user-avatar.webp'}
                  className="object-cover object-center"
                />
                <AvatarFallback>
                  {session?.user.name
                    ? session?.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    : 'U'}
                </AvatarFallback>
              </Avatar>

              <div>
                <span className="text-foreground line-clamp-1 text-sm font-medium">{session?.user.name}</span>
                <span className="text-xs font-medium text-gray-500">{session?.user.email}</span>
              </div>
            </div>
            <LogoutButton />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export const MobileMenuSkeleton = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center gap-2 md:hidden">
        <Menu className="size-5" />
        <Avatar className="size-8">
          <AvatarFallback>
            <Skeleton className="h-full w-full"></Skeleton>
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-6">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3">DocSign</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-1 flex-col gap-3">
          {[...Array(5)].map((_, index) => (
            <Skeleton className="h-4 w-16" key={index} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
