import { Prisma } from '@prisma/client'

export type RecentActivity = Prisma.DocumentGetPayload<{
  include: {
    signature: {
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    }
    user: {
      select: {
        name: true
      }
    }
  }
}>

export type RecentDocument = Prisma.DocumentGetPayload<{
  include: {
    signature: true
  }
}>
