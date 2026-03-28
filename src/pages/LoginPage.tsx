import { useCallback, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/LoginForm"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { cn } from "@/lib/utils"

export function LoginPage() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleLoginSuccess = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  useEffect(() => {
    if (!isTransitioning) return

    const timer = setTimeout(() => navigate("/dashboard"), 800)
    return () => clearTimeout(timer)
  }, [isTransitioning, navigate])

  if (isAuthenticated && !isTransitioning) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-center bg-white py-12 transition-all duration-700 ease-in-out",
          isTransitioning
            ? "opacity-0 lg:w-0 lg:min-w-0 lg:overflow-hidden lg:px-0"
            : "w-full px-6 lg:w-[35%]",
        )}
      >
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Onda Finance
            </h1>
            <p className="text-sm text-muted-foreground">
              Acesse sua conta para continuar
            </p>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />

          <p className="text-center text-xs text-muted-foreground">
            Use: matheus@ondafinance.com / 123456
          </p>
        </div>
      </div>

      <div className="relative hidden flex-1 lg:block">
        <img
          src="/login-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
