import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import type { ReactNode } from "react"

import { queryClient } from "@/lib/query-client"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  )
}
