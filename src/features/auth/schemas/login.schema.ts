import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail e obrigatorio")
    .email("E-mail invalido"),
  password: z
    .string()
    .min(1, "Senha e obrigatoria")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export type LoginFormData = z.infer<typeof loginSchema>
