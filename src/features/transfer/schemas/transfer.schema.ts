import { z } from "zod"

export const transferSchema = z.object({
  recipient: z
    .string()
    .min(3, "Destinatário deve ter pelo menos 3 caracteres"),
  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Valor deve ser maior que zero",
    ),
  description: z.string().min(1, "Descrição é obrigatória"),
})

export type TransferFormData = z.infer<typeof transferSchema>
