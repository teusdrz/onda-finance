import { CircleDollarSign, Shield, Zap } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { TransferForm } from "@/features/transfer/components/TransferForm"
import { useBalance } from "@/features/dashboard/hooks/useBalance"
import { formatCurrency } from "@/lib/utils"

const TRANSFER_INFO = [
  {
    icon: Zap,
    label: "Pix instantâneo",
    description: "Transferência em segundos",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Shield,
    label: "Transação segura",
    description: "Criptografia de ponta a ponta",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: CircleDollarSign,
    label: "Sem taxas",
    description: "Transferências gratuitas",
    color: "bg-amber-50 text-amber-600",
  },
] as const

export function TransferPage() {
  const { data: account, isLoading } = useBalance()

  return (
    <div className="space-y-6">
      <h1 className="animate-fade-up-card text-2xl font-bold tracking-tight">
        Transferência
      </h1>

      <div className="grid items-start gap-6 lg:grid-cols-5">
        <div
          className="animate-fade-up-card lg:col-span-3"
          style={{ animationDelay: "100ms" }}
        >
          <TransferForm />
        </div>

        <div
          className="animate-fade-up-card lg:col-span-2"
          style={{ animationDelay: "200ms" }}
        >
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Saldo disponível
                </p>
                {isLoading ? (
                  <Skeleton className="mt-1 h-7 w-36" />
                ) : (
                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    {formatCurrency(account?.balance ?? 0)}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                {TRANSFER_INFO.map(({ icon: Icon, label, description, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`shrink-0 rounded-full p-2 ${color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-center pt-1">
                <img
                  src="/finance-illustration.png"
                  alt=""
                  aria-hidden="true"
                  className="w-32 opacity-60"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
