export const HowItWorks = () => {
  return (
    <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
      <div className="px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">Como Funciona</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Processo simples e eficiente</h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed">
              Em apenas três passos, você pode enviar, gerenciar e assinar seus documentos.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-12 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">Cadastre-se</h3>
            <p className="text-muted-foreground">
              Crie sua conta em menos de 2 minutos e acesse a plataforma imediatamente.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold">Envie Documentos</h3>
            <p className="text-muted-foreground">
              Faça upload dos seus documentos e defina os destinatários e requisitos de assinatura.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold">Assine e Gerencie</h3>
            <p className="text-muted-foreground">
              Acompanhe o status, receba assinaturas e gerencie todo o processo em um só lugar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
