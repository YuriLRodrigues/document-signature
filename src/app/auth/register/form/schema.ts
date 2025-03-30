import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
    email: z.string().email({ message: 'Digite um endereço de e-mail válido' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
