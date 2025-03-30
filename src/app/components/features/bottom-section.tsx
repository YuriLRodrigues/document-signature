import { Card, CardContent } from '@/components/ui/card'

import { FileSignature, Upload, UserPlus } from 'lucide-react'

export const BottomFeaturesSection = () => {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 *:h-full md:grid-cols-2 lg:grid-cols-3">
      <Card className="duration-300 hover:scale-105">
        <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <Upload className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Envio de Documentos</h3>
          <p className="text-muted-foreground">
            Envie documentos para múltiplos destinatários com apenas alguns cliques. Suporte para diversos formatos.
          </p>
        </CardContent>
      </Card>
      <Card className="duration-300 hover:scale-105">
        <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <UserPlus className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Cadastro Simplificado</h3>
          <p className="text-muted-foreground">
            Cadastre-se agora e comece a utilizar imediatamente. Processo rápido e sem burocracia.
          </p>
        </CardContent>
      </Card>
      <Card className="duration-300 hover:scale-105">
        <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <FileSignature className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Assinatura Digital</h3>
          <p className="text-muted-foreground">
            Assine documentos digitalmente com validade jurídica. Compatível com certificados digitais.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
