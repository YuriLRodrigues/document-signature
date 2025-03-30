import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDatePtBR } from '@/utils/format-date-pt-br'
import { ArrowRight, FileText, Upload } from 'lucide-react'

import { RecentDocument } from './type'

export const RecentDocumentsTab = async () => {
  const session = await getServerSession(authOptions)
  const userIsAdmin = session?.user.role === 'ADMIN'
  const userId = session?.user.id

  const recentDocuments = await prisma.document.findMany({
    where: {
      userId: !userIsAdmin ? userId : undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      signature: true,
    },
  })

  return (
    <section className="grid">
      <ScrollArea className="h-full max-h-[500px] duration-300 md:max-h-[200px] md:hover:px-3" scrollHideDelay={100}>
        {recentDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-8 py-6 text-center transition-none duration-initial">
            <div className="bg-primary/10 rounded-full p-3">
              <FileText className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Nenhum documento enviado até o momento</h3>
            <p className="text-muted-foreground text-sm">Faça o upload de um documento para começar.</p>
            <Link href="/dashboard/documents/upload" className="mt-3">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Enviar documento
              </Button>
            </Link>
          </div>
        )}
        {recentDocuments.length > 0 && (
          <div className="flex min-h-full flex-col justify-between space-y-4 transition-none duration-initial">
            {recentDocuments.map((doc: RecentDocument) => (
              <div key={doc.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-muted-foreground text-xs">{formatDatePtBR(new Date(doc.createdAt))}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={doc.status === 'SIGNED' ? 'default' : 'outline'}>
                    {doc.status === 'SIGNED' ? 'Assinado' : 'Pendente'}
                  </Badge>
                  <Link href={`/dashboard/documents/${doc.id}`}>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            <div className="mt-auto flex justify-end">
              <Link href="/dashboard/documents">
                <Button variant="outline" size="sm">
                  Ver todos os documentos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </ScrollArea>
    </section>
  )
}

export const RecentDocumentsTabSkeleton = () => {
  return (
    <section className="grid">
      <ScrollArea className="h-full max-h-[500px] duration-300 md:max-h-[200px] md:hover:px-3" scrollHideDelay={100}>
        <div className="flex min-h-full flex-col justify-between space-y-4 transition-none duration-initial">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <FileText className="text-primary h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-26" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          ))}
          <div className="mt-auto flex justify-end pb-3">
            <Skeleton className="h-8 w-26" />
          </div>
        </div>
      </ScrollArea>
    </section>
  )
}
