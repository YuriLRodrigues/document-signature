import { Session } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { prisma } from '@/lib/prisma'
import { Clock } from 'lucide-react'

type PendingDocumentsCardProps = {
  session: Session | null
}

export const PendingDocumentsCard = async ({ session }: PendingDocumentsCardProps) => {
  const [pendingDocuments, totalDocuments] = await prisma.$transaction([
    prisma.document.count({
      where: {
        userId: session?.user.id,
        status: 'PENDING',
      },
    }),
    prisma.document.count({
      where: {
        userId: session?.user.id,
      },
    }),
  ])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-amber-500/10 p-4">
        <CardTitle className="text-sm font-medium">Documentos pendentes</CardTitle>
        <Clock className="h-5 w-5 text-amber-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">{pendingDocuments}</div>
        <p className="text-muted-foreground mt-1 text-xs">Documentos que você enviou em espera para serem assinados.</p>
        <Progress
          value={pendingDocuments > 0 ? (pendingDocuments / totalDocuments) * 100 : 0}
          className="bg-muted h-2"
          color="bg-amber-500"
        />
      </CardContent>
    </Card>
  )
}

export const PendingDocumentsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-amber-500/10 p-4">
        <CardTitle className="text-sm font-medium">Documentos pendentes</CardTitle>
        <Clock className="h-5 w-5 text-amber-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">
          <Skeleton className="h-4 w-18" />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Documentos que você enviou em espera para serem assinados.</p>
        <Progress value={0} className="bg-muted h-2" />
      </CardContent>
    </Card>
  )
}
