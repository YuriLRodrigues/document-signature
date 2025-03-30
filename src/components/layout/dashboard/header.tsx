import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Suspense } from 'react'

import { MobileMenu, MobileMenuSkeleton } from '@/components/interface/mobile-button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { authOptions } from '@/lib/auth'
import { FileSignature } from 'lucide-react'

import { ThemeToggle } from '../theme-toggle'
import { UserProfileSettings } from '../user-profile-settings'
import { DashboardNavbar } from './navbar'

export const DashboardHeader = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-background sticky top-0 z-50 flex min-h-16 w-full items-center justify-between gap-6 border-b px-4 py-4">
      <span className="flex items-center gap-2">
        <FileSignature className="text-primary h-6 w-6" />
        <Link href={'/'}>DocSign</Link>
      </span>
      <DashboardNavbar />
      <Suspense fallback={<MobileMenuSkeleton />}>
        <MobileMenu />
      </Suspense>
      <div className="hidden items-center gap-6 sm:flex">
        <ThemeToggle />
        <UserProfileSettings user={session!.user} />
      </div>
    </header>
  )
}

export const DashboardHeaderSkeleton = () => {
  return (
    <header className="bg-background sticky top-0 z-50 flex min-h-16 w-full items-center justify-between gap-6 border-b px-4 py-4">
      <Link href={'/'}>DocSign</Link>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </nav>
      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-20" />
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <Skeleton className="size-full" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}
