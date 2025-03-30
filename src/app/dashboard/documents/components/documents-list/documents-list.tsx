import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { DocumentStatusType } from '@/@types/document'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { mappingActivityTypeBadge } from '@/utils/mappings'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, Upload, Eye } from 'lucide-react'

import { DeleteDocumentButton } from './delete-document-button'
import { Document } from './types'

type DocumentsListProps = {
  searchedUserId?: string
  status?: DocumentStatusType
}

export const DocumentsList = async ({ searchedUserId, status }: DocumentsListProps) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const userIsAdmin = session?.user.role === 'ADMIN'

  const documents = await prisma.document.findMany({
    where: {
      userId: searchedUserId && userIsAdmin ? searchedUserId : !userIsAdmin ? userId : undefined,
      status: status ? status : undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      status: true,
      name: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <section>
      {documents.length === 0 && (
        <div className="flex h-[75vh] w-full flex-col items-center justify-center">
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <FileText className="text-muted-foreground mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">Nenhum documento encontrado</h2>
            <p className="text-muted-foreground mb-6">
              Envie um documento para que ele possa ser visualizado na lista.
            </p>
            <Link href="/dashboard/documents/upload">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Enviar um documento
              </Button>
            </Link>
          </Card>
        </div>
      )}
      {documents.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((document: Document) => (
            <Card key={document.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{document.name}</CardTitle>
                  {mappingActivityTypeBadge[document.status]}
                </div>
                <CardDescription>
                  <p>Autor do documento: {document.user.name}</p>
                  <p>Enviado {formatDistanceToNow(new Date(document.createdAt), { addSuffix: true, locale: ptBR })}</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <FileText className="text-muted-foreground h-10 w-10" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/documents/${document.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Button>
                </Link>
                <DeleteDocumentButton documentId={document.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export const DocumentsListSkeleton = () => {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
              <CardDescription>
                <span className="flex items-center gap-2">
                  Autor do documento: <Skeleton className="h-4 w-20" />
                </span>
                <span className="flex items-center gap-2">
                  Enviado <Skeleton className="h-4 w-30" />
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <FileText className="text-muted-foreground h-10 w-10" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-8 w-30" />
              <Skeleton className="h-8 w-30" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
