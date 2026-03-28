import { useCallback, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/LoginForm"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { cn } from "@/lib/utils"

const TRANSITION_DURATION = 1200
const NAVIGATE_DELAY = TRANSITION_DURATION + 200

export function LoginPage() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleLoginSuccess = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  useEffect(() => {
    if (!isTransitioning) return

    const timer = setTimeout(() => navigate("/dashboard"), NAVIGATE_DELAY)
    return () => clearTimeout(timer)
  }, [isTransitioning, navigate])

  if (isAuthenticated && !isTransitioning) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className={cn(
          "absolute inset-y-0 right-0 transition-[left] duration-login ease-smooth",
          isTransitioning ? "left-0" : "left-0 lg:left-[35%]",
        )}
      >
        <img
          src="/login-bg.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex min-h-screen w-full items-center justify-center bg-white px-6 py-12 lg:w-[35%]",
          "transition-transform duration-login ease-smooth",
          isTransitioning && "-translate-x-full",
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
    </div>
  )
}
