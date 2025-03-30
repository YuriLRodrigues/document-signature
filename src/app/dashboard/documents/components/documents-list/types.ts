import { Prisma } from '@prisma/client'

export type Document = Prisma.DocumentGetPayload<{
  select: {
    id: true
    status: true
    name: true
    createdAt: true
    user: {
      select: {
        name: true
      }
    }
  }
}>
