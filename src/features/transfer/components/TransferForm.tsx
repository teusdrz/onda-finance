import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileText, Loader2, Send, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="h-1.5 bg-gradient-to-r from-primary to-primary/50" />

      <CardHeader>
        <CardTitle>Nova transferência</CardTitle>
        <CardDescription>
          Preencha os dados para realizar uma transferência
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatário</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="recipient"
                placeholder="Nome ou chave Pix"
                className="pl-10"
                {...register("recipient")}
              />
            </div>
            {errors.recipient && (
              <p className="text-sm text-destructive">
                {errors.recipient.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                R$
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                className="pl-10"
                {...register("amount")}
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="description"
                placeholder="Ex: Pagamento de aluguel"
                className="pl-10"
                {...register("description")}
              />
            </div>
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full text-base"
            disabled={isPending}
          >
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
