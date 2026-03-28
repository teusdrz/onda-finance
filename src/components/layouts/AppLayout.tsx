import { Link, Outlet, useLocation } from "react-router-dom"
import { LayoutDashboard, ArrowLeftRight, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transfer", label: "Transferência", icon: ArrowLeftRight },
] as const

export function AppLayout() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const userInitials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-xl font-bold text-primary"
            >
              Onda Finance
            </Link>

            <Separator orientation="vertical" className="hidden h-6 sm:block" />

            <nav className="hidden items-center gap-1 sm:flex">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}>
                  <Button
                    variant={location.pathname === to ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      location.pathname === to && "bg-secondary",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary sm:flex">
              {userInitials}
            </div>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user?.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <nav className="border-b bg-background sm:hidden">
        <div className="container flex gap-1 py-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="flex-1">
              <Button
                variant={location.pathname === to ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full gap-2",
                  location.pathname === to && "bg-secondary",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  )
}
