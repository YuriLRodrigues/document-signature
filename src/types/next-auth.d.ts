import type { DefaultSession } from 'next-auth'

import { UserRoleType } from '@/@types/user'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRoleType | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: UserRoleType | null
  }

  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: UserRoleType | null
  }
}
