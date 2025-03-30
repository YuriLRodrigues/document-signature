'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'

type LogoutButtonProps = ComponentProps<'button'>

export const LogoutButton = ({ className, ...props }: LogoutButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
    toast({
      title: 'Sucesso',
      description: 'Você foi desconectado com sucesso.',
    })
  }

  return (
    <Button onClick={handleSignOut} className={cn('flex h-8 w-full items-center gap-2', className)} {...props}>
      <LogOut />
      Sair
    </Button>
  )
}
