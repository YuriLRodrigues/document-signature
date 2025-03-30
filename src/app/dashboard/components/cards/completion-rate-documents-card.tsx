import { Session } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { prisma } from '@/lib/prisma'
import { BarChart3 } from 'lucide-react'

type CompletionRateDocumentsCardProps = {
  session: Session | null
}

export const CompletionRateDocumentsCard = async ({ session }: CompletionRateDocumentsCardProps) => {
  const [signedDocuments, totalDocuments] = await prisma.$transaction([
    prisma.document.count({
      where: {
        userId: session?.user.id,
        status: 'SIGNED',
      },
    }),
    prisma.document.count({
      where: {
        userId: session?.user.id,
      },
    }),
  ])

  const completionPercentage = totalDocuments > 0 ? Math.round((signedDocuments / totalDocuments) * 100) : 0

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-blue-500/10 p-4">
        <CardTitle className="text-sm font-medium">Taxa de conclusão</CardTitle>
        <BarChart3 className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">{completionPercentage}%</div>
        <p className="text-muted-foreground mt-1 text-xs">Porcentagem da conclusão de seus documentos.</p>
        <Progress value={completionPercentage} className="bg-muted h-2" color="bg-blue-500" />
      </CardContent>
    </Card>
  )
}

export const CompletionRateDocumentsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-blue-500/10 p-4">
        <CardTitle className="text-sm font-medium">Taxa de conclusão</CardTitle>
        <BarChart3 className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">
          <Skeleton className="h-4 w-18" />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Porcentagem da conclusão geral de seus documentos.</p>
        <Progress value={0} className="bg-muted h-2" color="bg-blue-500" />
      </CardContent>
    </Card>
  )
}
