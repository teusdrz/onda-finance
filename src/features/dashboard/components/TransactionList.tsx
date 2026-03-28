import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import type { Transaction } from "@/types"

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-orange-100 text-orange-700",
]

function getInitials(text: string): string {
  return text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

function getAvatarColor(text: string): string {
  const hash = text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

interface TransactionListProps {
  transactions: Transaction[] | undefined
  isLoading: boolean
}

export function TransactionList({
  transactions,
  isLoading,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transações recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  const hasTransactions = transactions && transactions.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {hasTransactions ? (
          <div className="space-y-1">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    getAvatarColor(transaction.description),
                  )}
                >
                  {getInitials(transaction.description)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <p
                  className={cn(
                    "whitespace-nowrap text-sm font-semibold",
                    transaction.type === "credit"
                      ? "text-emerald-600"
                      : "text-red-500",
                  )}
                >
                  {transaction.type === "credit" ? "+" : "-"}{" "}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma transação encontrada
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
