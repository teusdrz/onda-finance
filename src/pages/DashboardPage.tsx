import { BalanceCard } from "@/features/dashboard/components/BalanceCard"
import { TransactionList } from "@/features/dashboard/components/TransactionList"
import { useBalance } from "@/features/dashboard/hooks/useBalance"
import { useTransactions } from "@/features/dashboard/hooks/useTransactions"

export function DashboardPage() {
  const { data: account, isLoading: isBalanceLoading } = useBalance()
  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <BalanceCard balance={account?.balance} isLoading={isBalanceLoading} />
      <TransactionList
        transactions={transactions}
        isLoading={isTransactionsLoading}
      />
    </div>
  )
}
