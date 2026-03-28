import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthGuard } from "@/features/auth/guards/AuthGuard"
import { AppLayout } from "@/components/layouts/AppLayout"
import { LoginPage } from "@/pages/LoginPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { TransferPage } from "@/pages/TransferPage"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/transfer",
            element: <TransferPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
])
