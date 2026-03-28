import { useMemo } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
        <div className="animate-fade-up-card" style={{ animationDelay: "100ms" }}>
          <BalanceCard
            balance={account?.balance}
            isLoading={isBalanceLoading}
          />
        </div>

        <div className="animate-fade-up-card" style={{ animationDelay: "200ms" }}>
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

        <div className="animate-fade-up-card" style={{ animationDelay: "300ms" }}>
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

      <div className="animate-fade-up-card" style={{ animationDelay: "400ms" }}>
        <TransactionList
          transactions={transactions}
          isLoading={isTransactionsLoading}
        />
      </div>
    </div>
  )
}
