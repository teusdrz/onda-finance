import { Navigate } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/LoginForm"
import { useAuthStore } from "@/features/auth/store/auth.store"

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src="/login-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
      />

      <div className="relative z-10 flex min-h-screen">
        <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-[35%] lg:animate-slide-in-left">
          <div className="w-full max-w-sm space-y-8 lg:animate-fade-up">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                Onda Finance
              </h1>
              <p className="text-sm text-muted-foreground">
                Acesse sua conta para continuar
              </p>
            </div>

            <LoginForm />

            <p className="text-center text-xs text-muted-foreground">
              Use: matheus@ondafinance.com / 123456
            </p>
          </div>
        </div>

        <div className="hidden lg:block lg:flex-1" />
      </div>
    </div>
  )
}
