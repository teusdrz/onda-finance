import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  transferSchema,
  type TransferFormData,
} from "../schemas/transfer.schema"
import { useTransfer } from "../hooks/useTransfer"

export function TransferForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useTransfer()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  async function onSubmit(data: TransferFormData) {
    try {
      await mutateAsync({
        recipient: data.recipient,
        amount: Number(data.amount),
        description: data.description,
      })
      toast.success("Transferência realizada com sucesso!")
      navigate("/dashboard")
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao realizar transferência",
      )
    }
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Nova transferência</CardTitle>
        <CardDescription>
          Preencha os dados para realizar uma transferência
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatário</Label>
            <Input
              id="recipient"
              placeholder="Nome ou chave Pix"
              {...register("recipient")}
            />
            {errors.recipient && (
              <p className="text-sm text-destructive">
                {errors.recipient.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Pagamento de aluguel"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Transferir
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
