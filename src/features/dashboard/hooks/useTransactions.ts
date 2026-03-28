import { useQuery } from "@tanstack/react-query"
import { fetchTransactions } from "../services/dashboard.service"

export function useTransactions() {
  return useQuery({
    queryKey: ["account", "transactions"],
    queryFn: fetchTransactions,
  })
}
