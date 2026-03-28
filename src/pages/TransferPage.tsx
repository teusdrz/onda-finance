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

      <div
        className="animate-fade-up-card grid items-start gap-8 lg:grid-cols-2"
        style={{ animationDelay: "150ms" }}
      >
        <TransferForm />

        <div className="hidden flex-col items-center justify-center rounded-xl border bg-muted/30 p-8 lg:flex">
          <img
            src="/finance-illustration.png"
            alt=""
            aria-hidden="true"
            className="w-64 opacity-80"
          />
          <div className="mt-6 space-y-1 text-center">
            <p className="text-sm font-medium text-foreground">
              Transferências seguras
            </p>
            <p className="text-xs text-muted-foreground">
              Envie e receba dinheiro com rapidez e segurança
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
