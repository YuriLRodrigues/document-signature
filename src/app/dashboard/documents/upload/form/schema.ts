import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const uploadSchema = z.object({
  name: z.string().min(1, { message: 'Nome do documento é obrigatório' }),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo é obrigatório')
    .refine((file) => file.size <= MAX_FILE_SIZE, `O tamanho do arquivo deve ser inferior a 5 MB`)
    .refine((file) => file.type === 'application/pdf', 'Somente arquivos PDF são aceitos'),
})

export type UploadFormValues = z.infer<typeof uploadSchema>
