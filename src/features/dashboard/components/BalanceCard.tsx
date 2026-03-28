import { ArrowLeftRight, Eye, EyeOff, QrCode, Receipt } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

interface BalanceCardProps {
  balance: number | undefined
  isLoading: boolean
}

export function BalanceCard({ balance, isLoading }: BalanceCardProps) {
  const [visible, setVisible] = useState(true)

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-primary-foreground/80">
            Saldo disponível
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <Skeleton className="h-9 w-48 bg-white/20" />
        ) : (
          <p className="text-3xl font-bold tracking-tight text-primary-foreground">
            {visible ? formatCurrency(balance ?? 0) : "R$ ••••••"}
          </p>
        )}

        <div className="flex gap-2">
          <Link to="/transfer">
            <Button
              size="sm"
              className="gap-1.5 border-0 bg-white/15 text-primary-foreground hover:bg-white/25"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Transferir
            </Button>
          </Link>
          <Button
            size="sm"
            className="gap-1.5 border-0 bg-white/15 text-primary-foreground hover:bg-white/25"
          >
            <QrCode className="h-3.5 w-3.5" />
            Pix
          </Button>
          <Button
            size="sm"
            className="gap-1.5 border-0 bg-white/15 text-primary-foreground hover:bg-white/25"
          >
            <Receipt className="h-3.5 w-3.5" />
            Extrato
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
