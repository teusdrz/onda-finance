import { useQuery } from "@tanstack/react-query"
import { fetchBalance } from "../services/dashboard.service"

export function useBalance() {
  return useQuery({
    queryKey: ["account", "balance"],
    queryFn: fetchBalance,
  })
}
