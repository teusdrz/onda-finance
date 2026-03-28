import { useCallback, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { Logo } from "@/components/Logo"
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
              "flex flex-col items-center gap-3 opacity-0",
              pageReady && "animate-fade-up-card",
            )}
          >
            <Logo size="md" />
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
  const dots = [0, 160, 320]

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
        "transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Logo size="lg" />
      <p className="mt-3 text-sm text-muted-foreground">
        Preparando sua conta...
      </p>
      <div className="mt-8 flex gap-1.5">
        {dots.map((delay) => (
          <div
            key={delay}
            className="h-2 w-2 animate-bounce-dot rounded-full bg-primary"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
