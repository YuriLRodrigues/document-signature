import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { MoveLeft, UserPlus } from 'lucide-react'

import { RegisterUserForm } from './form/form'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8">
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <MoveLeft />
          Voltar
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="*:text-center">
            <div className="flex items-center justify-center gap-3">
              <UserPlus className="duration-300 hover:scale-110" />
              <CardTitle className="text-2xl">Registrar</CardTitle>
            </div>
            <CardDescription>Crie uma conta para começar</CardDescription>
          </CardHeader>
          <RegisterUserForm />
          <CardFooter className="flex flex-col items-center">
            <p className="text-muted-foreground text-center text-sm">
              Já possui uma conta?{' '}
              <Link href="/auth/login" className="hover:text-primary underline underline-offset-4">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
