'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Search, X } from 'lucide-react'

import { UseFilterDocumentsForm } from './use-filter-documents-form'

type User = {
  id: string
  name: string
}

type FilterDocumentsFormProps = {
  users: User[]
}

export const FilterDocumentsForm = ({ users }: FilterDocumentsFormProps) => {
  const { form, onSubmit, clear } = UseFilterDocumentsForm()

  return (
    <CardContent className="min-h-[100px] p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-3">
          {users.length > 0 && (
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Usuário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="grid">
                        <ScrollArea className="max-h-[110px] pr-3">
                          {users.map((user: User) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </div>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    <SelectItem value="PENDING">Pendente</SelectItem>
                    <SelectItem value="SIGNED">Assinado</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="!mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="sm" className="w-fit max-w-full" variant="outline" type="button" onClick={clear}>
              <X className="mr-2 flex-none" />
              Limpar filtros
            </Button>
            <Button size="sm" className="w-fit max-w-full">
              <Search className="mr-2" />
              Filtrar resultados
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  )
}
