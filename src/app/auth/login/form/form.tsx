'use client'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { UseLoginUserForm } from './use-login-user-form'

export const LoginUserForm = () => {
  const { form, handleGoogleSignIn, handleGitHubSignIn, isLoading, onSubmit } = UseLoginUserForm()

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-0.5">
                <FormLabel>E-mail:</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-0.5">
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Acessando...' : 'Acessar'}
          </Button>
        </form>
      </Form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Ou continue com</span>
        </div>
      </div>
      <div className="space-y-2">
        <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
          <FaGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full" onClick={handleGitHubSignIn} disabled={isLoading}>
          <FaGithub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </CardContent>
  )
}
