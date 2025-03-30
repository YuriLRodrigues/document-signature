import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { prisma } from '@/lib/prisma'
import { mappingActivityType, mappingActivityTypeBadge } from '@/utils/mappings'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, Download, PenTool } from 'lucide-react'

interface DocumentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params
  const document = await prisma.document.findUnique({
    where: {
      id,
    },
    include: {
      signature: {
        select: {
          signedAt: true,
          signatureImg: true,
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

  if (!document) {
    notFound()
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/documents">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold">{document.name}</h1>
          {mappingActivityTypeBadge[document.status]}
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <a href={`/api/documents/${document.id}/download`} download>
              <Download className="mr-2 h-4 w-4" />
              Baixar
            </a>
          </Button>
          {document.status === 'PENDING' && (
            <Link href={`/dashboard/documents/${document.id}/sign`}>
              <Button>
                <PenTool className="mr-2 h-4 w-4" />
                Assinar documento
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="flex h-full max-h-[600px] min-h-[500px] items-center justify-center p-4">
            <iframe src={`/api/documents/${document.id}/view`} className="h-full w-full" title={document.name} />
          </Card>
        </div>
        <div>
          <Card className="p-4">
            <h2 className="mb-4 text-xl font-semibold">Detalhes do documento</h2>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Nome</p>
                <p className="font-medium">{document.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Autor</p>
                <p className="font-medium">{document.user.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <p className="font-medium">{mappingActivityType[document.status]}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Data do envio</p>
                <p className="font-medium">{format(new Date(document.createdAt), 'PPP', { locale: ptBR })}</p>
              </div>
              {document.status === 'SIGNED' && document.signature && (
                <>
                  <div>
                    <p className="text-muted-foreground text-sm">Assinado</p>
                    <p className="font-medium">
                      {format(new Date(document.signature.signedAt), "PPP 'às' p", { locale: ptBR })} por{' '}
                      {document.signature.user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Assinatura</p>
                    <div className="mt-2 rounded-md border bg-neutral-200 p-2 dark:bg-neutral-600">
                      <img
                        src={document.signature.signatureImg || '/placeholder.svg'}
                        alt="Signature"
                        className="max-h-20"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
