import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

interface BalanceCardProps {
  balance: number | undefined
  isLoading: boolean
}

export function BalanceCard({ balance, isLoading }: BalanceCardProps) {
  const [visible, setVisible] = useState(true)

  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Saldo disponível
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
        >
          {visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <p className="text-3xl font-bold tracking-tight">
            {visible ? formatCurrency(balance ?? 0) : "R$ ******"}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
