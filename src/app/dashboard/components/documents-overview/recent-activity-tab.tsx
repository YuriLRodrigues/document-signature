import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { mappingActivityTypeIcon, mappingActivityTypeLabel, mappingGetActivityDate } from '@/utils/mappings'
import { subDays } from 'date-fns'
import { AlertCircle, ArrowRight } from 'lucide-react'

export const RecentActivityTab = async () => {
  const session = await getServerSession(authOptions)
  const userName = session?.user.name
  const userIsAdmin = session?.user.role === 'ADMIN'
  const userId = session?.user.id
  const recentActivity = await prisma.document.findMany({
    where: {
      userId: !userIsAdmin ? userId : undefined,
      OR: [
        { createdAt: { gte: subDays(new Date(), 7) } },
        { updatedAt: { gte: subDays(new Date(), 7) } },
        { signature: { signedAt: { gte: subDays(new Date(), 7) } } },
      ],
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 8,
    include: {
      signature: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <section className="grid">
      <ScrollArea className="h-full max-h-[500px] duration-300 md:max-h-[200px] md:hover:px-3" scrollHideDelay={100}>
        {recentActivity.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="bg-primary/10 rounded-full p-3">
              <AlertCircle className="text-primary h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Nenhuma atividade recente</h3>
            <p className="text-muted-foreground mt-2 text-sm">Atividades recentes de documentos aparecerão aqui.</p>
          </div>
        )}
        {recentActivity.length > 0 && (
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              return (
                <div key={activity.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                      {mappingActivityTypeIcon[activity.status]}
                    </div>
                    <div>
                      <p className="flex items-center gap-1 font-medium">
                        {activity.user.name === userName
                          ? 'Você'
                          : activity?.signature?.user.name === userName && activity.status === 'SIGNED'
                            ? 'Você'
                            : activity.user.name}{' '}
                        {mappingActivityTypeLabel[activity.status]}{' '}
                        <span className="font-semibold">{activity.name}</span>
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {mappingGetActivityDate(activity.status, {
                          createdAt: activity.createdAt,
                          signature: activity.signature ? { signedAt: activity.signature.signedAt } : undefined,
                        })}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/documents/${activity.id}`}>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </section>
  )
}

export const RecentActivityTabSkeleton = () => {
  return (
    <section className="grid">
      <ScrollArea className="h-full max-h-[500px] duration-300 md:max-h-[200px] md:hover:px-3" scrollHideDelay={100}>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => {
            return (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <Skeleton className="h-8 w-10" />
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </section>
  )
}
