import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { UploadDocumentForm } from './form'

export default function UploadPage() {
  return (
    <section className="space-y-6 pt-8">
      <h1 className="text-3xl font-bold">Enviar documento</h1>
      <div className="flex h-[80vh] flex-col justify-center py-8">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle>Envie um novo documento</CardTitle>
            <CardDescription>Envie um PDF para que o documento seja visualizado ou assinado</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadDocumentForm />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
