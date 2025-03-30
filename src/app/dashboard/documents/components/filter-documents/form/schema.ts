import { z } from 'zod'

export const filterDocumentsSchema = z.object({
  userId: z.string().optional(),
  status: z.enum(['PENDING', 'SIGNED']).optional(),
})

export type FilterDocumentsFormValues = z.infer<typeof filterDocumentsSchema>
