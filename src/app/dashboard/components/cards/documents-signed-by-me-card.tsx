import { Session } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { prisma } from '@/lib/prisma'
import { User } from 'lucide-react'

type DocumentsSignedByMeCardProps = {
  session: Session | null
}

export const DocumentsSignedByMeCard = async ({ session }: DocumentsSignedByMeCardProps) => {
  const documentsSignedByMe = await prisma.document.count({
    where: {
      status: 'SIGNED',
      signature: {
        userId: session?.user.id,
      },
    },
  })

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-red-500/10 p-4">
        <CardTitle className="text-sm font-medium">Documentos assinados</CardTitle>
        <User className="h-5 w-5 text-red-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">{documentsSignedByMe}</div>
        <p className="text-muted-foreground mt-1 text-xs">Documentos que você assinou.</p>
        <Progress value={documentsSignedByMe > 0 ? 100 : 0} className="bg-muted h-2" color="bg-red-500" />
      </CardContent>
    </Card>
  )
}

export const DocumentsSignedByMeCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-red-500/10 p-4">
        <CardTitle className="text-sm font-medium">Documentos assinados</CardTitle>
        <User className="h-5 w-5 text-red-500" />
      </CardHeader>
      <CardContent className="space-y-2 p-6">
        <div className="text-3xl font-bold">
          <Skeleton className="h-4 w-18" />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Seus documentos que já foram assinados..</p>
        <Progress value={0} className="bg-muted h-2" color="bg-red-500" />
      </CardContent>
    </Card>
  )
}
