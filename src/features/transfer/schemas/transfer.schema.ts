import { z } from "zod"

export const transferSchema = z.object({
  recipient: z
    .string()
    .min(3, "Destinatario deve ter pelo menos 3 caracteres"),
  amount: z
    .string()
    .min(1, "Valor e obrigatorio")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Valor deve ser maior que zero",
    ),
  description: z.string().min(1, "Descricao e obrigatoria"),
})

export type TransferFormData = z.infer<typeof transferSchema>
