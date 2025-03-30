'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Upload, FileText, X } from 'lucide-react'

import { UseUploadDocumentForm } from './use-upload-document-form'

export const UploadDocumentForm = () => {
  const { form, handleFileChange, isUploading, onSubmit, removeFile, selectedFile } = UseUploadDocumentForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do documento</FormLabel>
              <FormControl>
                <Input placeholder="Insira o nome do documento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Arquivo (PDF)</FormLabel>
              <FormControl>
                {!selectedFile ? (
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                    <Upload className="text-muted-foreground mb-4 h-8 w-8" />
                    <p className="mb-2 text-sm font-medium">Arraste e solte seu arquivo aqui ou clique para navegar</p>
                    <p className="text-muted-foreground text-xs">Apenas arquivos PDF, máximo de 5MB</p>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="mt-4 w-full max-w-xs"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center">
                      <FileText className="text-muted-foreground mr-2 h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? 'Enviando...' : 'Enviar documento'}
        </Button>
      </form>
    </Form>
  )
}
