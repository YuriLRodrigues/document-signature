import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import { UploadFormValues, uploadSchema } from './schema'

export const UseUploadDocumentForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(data: UploadFormValues) {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('file', data.file)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Falha ao enviar o documento')
      }

      toast({
        title: 'Successo',
        description: 'Documento enviado com sucesso',
      })
      router.push('/dashboard/documents')
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      form.setValue('file', file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    form.setValue('file', undefined as any)
  }
  return {
    form,
    onSubmit,
    handleFileChange,
    selectedFile,
    removeFile,
    isUploading,
  }
}
