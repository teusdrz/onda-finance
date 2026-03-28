import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TransferPayload } from "@/types"
import { createTransfer } from "../services/transfer.service"

export function useTransfer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TransferPayload) => createTransfer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] })
    },
  })
}
