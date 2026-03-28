import { useCallback, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/LoginForm"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { cn } from "@/lib/utils"

const LOADING_DELAY = 800
const TRANSITION_DURATION = 3500
const NAVIGATE_DELAY = TRANSITION_DURATION + 500

export function LoginPage() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [pageReady, setPageReady] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), LOADING_DELAY)
    return () => clearTimeout(timer)
  }, [])

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
      <LoadingOverlay visible={!pageReady} />

      <div
        className={cn(
          "absolute inset-y-0 right-0",
          isTransitioning ? "left-0" : "left-0 lg:left-[35%]",
        )}
        style={{
          transition: `left ${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        }}
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
          isTransitioning && "-translate-x-full",
        )}
        style={{
          transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        }}
      >
        <div className="w-full max-w-sm space-y-8">
          <div
            className={cn(
              "space-y-2 text-center opacity-0",
              pageReady && "animate-fade-up-card",
            )}
          >
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Onda Finance
            </h1>
            <p className="text-sm text-muted-foreground">
              Acesse sua conta para continuar
            </p>
          </div>

          <div
            className={cn("opacity-0", pageReady && "animate-fade-up-card")}
            style={pageReady ? { animationDelay: "150ms" } : undefined}
          >
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          <p
            className={cn(
              "text-center text-xs text-muted-foreground opacity-0",
              pageReady && "animate-fade-up-card",
            )}
            style={pageReady ? { animationDelay: "300ms" } : undefined}
          >
            Use: matheus@ondafinance.com / 123456
          </p>
        </div>
      </div>
    </div>
  )
}

function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
        "transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <h1 className="text-3xl font-bold tracking-tight text-primary">
        Onda Finance
      </h1>
      <div className="mt-6 h-0.5 w-16 overflow-hidden rounded-full bg-primary/10">
        <div className="h-full w-1/2 animate-loading-bar rounded-full bg-primary/60" />
      </div>
    </div>
  )
}
