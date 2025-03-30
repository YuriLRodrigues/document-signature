import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

import { authOptions } from '@/lib/auth'

import { LogoutButton } from './logout-button'

export const UserProfile = async () => {
  const session = await getServerSession(authOptions)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session?.user.image || '/assets/default-user-avatar.webp'}
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton className="h-7" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserProfileSkeleton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarFallback>
            <Skeleton className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <DropdownMenuItem asChild key={index}>
            <Link href="#" className="text-gray-500 hover:text-gray-600">
              Loading...
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
