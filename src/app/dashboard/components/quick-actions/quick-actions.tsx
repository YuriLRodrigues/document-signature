import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { FileText, Upload } from 'lucide-react'

import { PendingDocumentsLink } from './pending-documents-link'

export const QuickActions = () => {
  return (
    <Card className="col-span-7 md:col-span-3">
      <CardHeader>
        <CardTitle>Ações rápidas</CardTitle>
        <CardDescription>Tarefas comuns que você pode executar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Link href="/dashboard/documents/upload">
            <Button className="bg-background flex h-auto w-full items-center justify-start gap-4 p-4" variant="outline">
              <div className="bg-primary/10 flex h-10 w-10 flex-none items-center justify-center rounded-full">
                <Upload className="text-primary h-5 w-5" />
              </div>
              <div className="flex flex-col items-start text-wrap">
                <span className="font-semibold">Enviar um documento</span>
                <span className="text-muted-foreground text-left text-xs">
                  Adicione um novo documento à sua conta com facilidade.
                </span>
              </div>
            </Button>
          </Link>

          <Link href="/dashboard/documents">
            <Button variant="outline" className="flex h-auto w-full items-center justify-start gap-4 p-4">
              <div className="bg-muted flex h-10 w-10 flex-none items-center justify-center rounded-full">
                <FileText className="text-muted-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col items-start text-wrap">
                <span className="font-semibold">Ver documentos</span>
                <span className="text-muted-foreground text-left text-xs">
                  Navegue por todos os seus documentos carregados.
                </span>
              </div>
            </Button>
          </Link>

          <PendingDocumentsLink />
        </div>
      </CardContent>
    </Card>
  )
}
