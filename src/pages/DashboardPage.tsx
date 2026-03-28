import { useMemo } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { BalanceCard } from "@/features/dashboard/components/BalanceCard"
import { TransactionList } from "@/features/dashboard/components/TransactionList"
import { useBalance } from "@/features/dashboard/hooks/useBalance"
import { useTransactions } from "@/features/dashboard/hooks/useTransactions"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { formatCurrency } from "@/lib/utils"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Bom dia"
  if (hour < 18) return "Boa tarde"
  return "Boa noite"
}

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const { data: account, isLoading: isBalanceLoading } = useBalance()
  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions()

  const { totalIncome, totalExpenses } = useMemo(() => {
    if (!transactions) return { totalIncome: 0, totalExpenses: 0 }

    return transactions.reduce(
      (acc, t) => {
        if (t.type === "credit") acc.totalIncome += t.amount
        else acc.totalExpenses += t.amount
        return acc
      },
      { totalIncome: 0, totalExpenses: 0 },
    )
  }, [transactions])

  const userInitials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="space-y-6">
      <div className="animate-fade-up-card">
        <h1 className="text-2xl font-bold tracking-tight">
          {getGreeting()}, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Aqui está o resumo da sua conta
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          className="animate-fade-up-card"
          style={{ animationDelay: "100ms" }}
        >
          <BalanceCard
            balance={account?.balance}
            isLoading={isBalanceLoading}
          />
        </div>

        <div
          className="animate-fade-up-card"
          style={{ animationDelay: "200ms" }}
        >
          <Card className="h-full transition-shadow duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Entradas
                </CardTitle>
                <p className="text-xs text-muted-foreground/60">Este mês</p>
              </div>
              <div className="rounded-full bg-emerald-50 p-2.5">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isTransactionsLoading ? (
                <Skeleton className="h-8 w-36" />
              ) : (
                <p className="text-2xl font-bold text-emerald-600">
                  + {formatCurrency(totalIncome)}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div
          className="animate-fade-up-card"
          style={{ animationDelay: "300ms" }}
        >
          <Card className="h-full transition-shadow duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saídas
                </CardTitle>
                <p className="text-xs text-muted-foreground/60">Este mês</p>
              </div>
              <div className="rounded-full bg-red-50 p-2.5">
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              {isTransactionsLoading ? (
                <Skeleton className="h-8 w-36" />
              ) : (
                <p className="text-2xl font-bold text-red-500">
                  - {formatCurrency(totalExpenses)}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div
          className="animate-fade-up-card lg:col-span-2"
          style={{ animationDelay: "400ms" }}
        >
          <TransactionList
            transactions={transactions}
            isLoading={isTransactionsLoading}
          />
        </div>

        <div
          className="animate-fade-up-card"
          style={{ animationDelay: "500ms" }}
        >
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Minha conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {userInitials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user?.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">Conta corrente</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transações</span>
                  <span className="font-medium">
                    {transactions?.length ?? 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ativa
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-center pt-1">
                <img
                  src="/finance-illustration.png"
                  alt=""
                  aria-hidden="true"
                  className="w-36 opacity-70"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
