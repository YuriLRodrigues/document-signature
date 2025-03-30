import { useParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { useToast } from '@/hooks/use-toast'

export const useSignDocument = () => {
  const params = useParams<{ id: string }>()
  const { id: documentId } = params
  const router = useRouter()
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    setHasSignature(true)

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const saveSignature = async () => {
    if (!hasSignature) {
      toast({
        title: 'Erro',
        description: 'Por favor, assine antes de enviar',
        variant: 'destructive',
      })
      return
    }

    setIsSigning(true)
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const signatureImg = canvas.toDataURL('image/png')

      const response = await fetch(`/api/documents/${documentId}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signatureImg }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Falha ao assinar o documento')
      }

      toast({
        title: 'Successo',
        description: 'Documento assinado com sucesso',
      })
      router.push(`/dashboard/documents/${documentId}`)
      router.refresh()
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsSigning(false)
    }
  }
  return {
    startDrawing,
    draw,
    stopDrawing,
    clearSignature,
    saveSignature,
    isSigning,
    canvasRef,
    hasSignature,
  }
}
