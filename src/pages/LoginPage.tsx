import { Navigate } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/LoginForm"
import { useAuthStore } from "@/features/auth/store/auth.store"

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[40%]">
        <div className="w-full max-w-sm space-y-8">
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

      <div className="relative hidden lg:block lg:w-[60%]">
        <img
          src="/login-bg.jpg"
          alt="Edificios corporativos"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
