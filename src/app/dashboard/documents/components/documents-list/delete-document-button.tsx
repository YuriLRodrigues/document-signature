'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { useToast } from '@/hooks/use-toast'
import { Trash2 } from 'lucide-react'

type DeleteDocumentButtonProps = {
  documentId: string
}

export const DeleteDocumentButton = ({ documentId }: DeleteDocumentButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete() {
    const response = await fetch(`/api/documents/${documentId}/delete`, { method: 'DELETE' })

    if (response.ok) {
      toast({
        title: 'Successo',
        description: 'Documento deletado com sucesso.',
      })
      router.push('/dashboard/documents')
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar o documento.',
      })
    }
  }

  return (
    <Button variant="outline" size="sm" className="text-destructive" onClick={handleDelete}>
      <Trash2 className="mr-2 h-4 w-4" />
      Deletar
    </Button>
  )
}
