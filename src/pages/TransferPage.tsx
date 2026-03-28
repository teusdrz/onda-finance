import { TransferForm } from "@/features/transfer/components/TransferForm"
import { useBalance } from "@/features/dashboard/hooks/useBalance"
import { formatCurrency } from "@/lib/utils"

export function TransferPage() {
  const { data: account } = useBalance()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="animate-fade-up-card text-2xl font-bold tracking-tight">
          Transferência
        </h1>
        {account && (
          <p
            className="animate-fade-up-card text-sm text-muted-foreground"
            style={{ animationDelay: "100ms" }}
          >
            Saldo disponível:{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(account.balance)}
            </span>
          </p>
        )}
      </div>
      <div className="animate-fade-up-card" style={{ animationDelay: "150ms" }}>
        <TransferForm />
      </div>
    </div>
  )
}
