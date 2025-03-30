import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginFormValues, loginSchema } from './schema'

export const UseLoginUserForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: 'Erro',
          description: 'E-mail ou senha incorretos',
          variant: 'destructive',
        })
        return
      }

      router.push('/dashboard')
      toast({
        title: 'Sucesso',
        description: 'Login efetuado com sucesso',
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('github', { callbackUrl: '/dashboard' })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao se conectar com o github',
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
    handleGithubSignIn,
  }
}
