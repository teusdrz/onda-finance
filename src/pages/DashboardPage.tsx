import { useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowLeftRight, TrendingDown, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-fade-up-card">
          <h1 className="text-2xl font-bold tracking-tight">
            {getGreeting()}, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Aqui esta o resumo da sua conta
          </p>
        </div>
        <div className="animate-fade-up-card" style={{ animationDelay: "50ms" }}>
          <Link to="/transfer">
            <Button className="gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              Nova transferencia
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="animate-fade-up-card" style={{ animationDelay: "100ms" }}>
          <BalanceCard
            balance={account?.balance}
            isLoading={isBalanceLoading}
          />
        </div>

        <div className="animate-fade-up-card" style={{ animationDelay: "200ms" }}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Entradas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
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
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Saidas
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
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
