import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { DocumentStatusType } from '@/@types/document'
import { useToast } from '@/hooks/use-toast'
import { QueryParams } from '@/utils/query-params'
import { zodResolver } from '@hookform/resolvers/zod'

import { FilterDocumentsFormValues, filterDocumentsSchema } from './schema'

export const UseFilterDocumentsForm = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const status = searchParams.get('status') as DocumentStatusType
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FilterDocumentsFormValues>({
    resolver: zodResolver(filterDocumentsSchema),
    defaultValues: {
      userId: userId ?? '',
      status: status ?? undefined,
    },
  })

  async function onSubmit(data: FilterDocumentsFormValues) {
    const url = QueryParams.baseUrl('/dashboard/documents')

    if (data.userId !== undefined || data.userId !== '') {
      url.query({ query: 'userId', value: data.userId })
    }

    if (data.status !== undefined || data.status !== '') {
      url.query({ query: 'status', value: data.status })
    }

    toast({
      title: 'Successo',
      description: 'Filtros de busca pelo usuário adicionados.',
    })
    router.push(url.value())
    return
  }

  const clear = () => {
    form.reset({
      userId: undefined,
      status: undefined,
    })

    toast({
      title: 'Successo',
      description: 'Filtros de busca limpos.',
    })

    router.push('/dashboard/documents')
    return
  }

  return {
    form,
    onSubmit,
    clear,
  }
}
