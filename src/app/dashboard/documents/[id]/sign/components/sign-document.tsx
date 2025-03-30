'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Check, Trash2 } from 'lucide-react'

import { useSignDocument } from './use-sign-document'

export const SignDocumentCard = () => {
  const { clearSignature, canvasRef, draw, hasSignature, isSigning, saveSignature, startDrawing, stopDrawing } =
    useSignDocument()

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>Desenhe sua assinatura</CardTitle>
        <CardDescription>Use o mouse ou a tela sensível ao toque para assinar abaixo.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-neutral-200 p-1 dark:bg-neutral-600">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={clearSignature} disabled={isSigning}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button type="button" onClick={saveSignature} disabled={!hasSignature || isSigning}>
          <Check className="mr-2 h-4 w-4" />
          {isSigning ? 'Assinando...' : 'Assinar documento'}
        </Button>
      </CardFooter>
    </Card>
  )
}
