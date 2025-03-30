import { Session } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { prisma } from '@/lib/prisma'
import { FileText } from 'lucide-react'

type TotalDocumentsCardProps = {
  session: Session | null
}

export const TotalDocumentsCard = async ({ session }: TotalDocumentsCardProps) => {
  const totalDocuments = await prisma.document.count({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-sm font-medium">Total de documentos</CardTitle>
        <FileText className="text-primary h-5 w-5" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">{totalDocuments}</div>
        <p className="text-muted-foreground mt-1 text-xs">Seus documentos enviados.</p>
        <Progress value={totalDocuments > 0 ? 100 : 0} className="h-2" color="bg-gray-300" />
      </CardContent>
    </Card>
  )
}

export const TotalDocumentsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-sm font-medium">Total de documentos</CardTitle>
        <FileText className="text-primary h-5 w-5" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">
          <Skeleton className="h-4 w-18" />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Seus documentos enviados.</p>
        <Progress value={0} className="h-2" color="bg-gray-300" />
      </CardContent>
    </Card>
  )
}
