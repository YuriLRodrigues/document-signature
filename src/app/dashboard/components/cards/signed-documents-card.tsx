import { Session } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { prisma } from '@/lib/prisma'
import { CheckSquare } from 'lucide-react'

type SignedDocumentsCardProps = {
  session: Session | null
}

export const SignedDocumentsCard = async ({ session }: SignedDocumentsCardProps) => {
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

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-green-500/10 p-4">
        <CardTitle className="text-sm font-medium">Documentos assinados</CardTitle>
        <CheckSquare className="h-5 w-5 text-green-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">{signedDocuments}</div>
        <p className="text-muted-foreground mt-1 text-xs">Seus documentos que já foram assinados.</p>
        <Progress
          value={signedDocuments > 0 ? (signedDocuments / totalDocuments) * 100 : 0}
          className="bg-muted h-2"
          color="bg-green-500"
        />
      </CardContent>
    </Card>
  )
}

export const SignedDocumentsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-green-500/10 p-4">
        <CardTitle className="text-sm font-medium">Documentos assinados</CardTitle>
        <CheckSquare className="h-5 w-5 text-green-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">
          <Skeleton className="h-4 w-18" />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Seus documentos que já foram assinados.</p>
        <Progress value={0} className="bg-muted h-2" color="bg-green-500" />
      </CardContent>
    </Card>
  )
}
