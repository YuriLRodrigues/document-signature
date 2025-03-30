import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { ArrowRight } from 'lucide-react'

export const LeftHeroSection = () => {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Simplifique o envio e assinatura de documentos
        </h1>
        <p className="text-muted-foreground max-w-[600px] md:text-xl">
          Plataforma completa para gerenciar, enviar e assinar documentos de forma segura e eficiente.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Link href="/auth/login">
          <Button size="lg" className="gap-2">
            Começar agora
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
