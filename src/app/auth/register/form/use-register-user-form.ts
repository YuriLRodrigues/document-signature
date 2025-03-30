import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterFormValues, registerSchema } from './schema'

export const UseRegisterUserForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Falha ao registrar o usuário')
      }

      toast({
        title: 'Successo',
        description: 'Conta criada com sucesso. Por favor, faça seu login',
      })
      router.push('/auth/login')
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Falha ao fazer registro com o Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    form,
    onSubmit,
    handleGoogleSignIn,
  }
}
