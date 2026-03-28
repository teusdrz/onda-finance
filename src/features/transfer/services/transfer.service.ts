import type { Transaction, TransferPayload } from "@/types"
import { delay } from "@/lib/utils"
import { mockDb } from "@/mocks/db"

export async function createTransfer(
  payload: TransferPayload,
): Promise<Transaction> {
  await delay(1000)

  const balance = mockDb.getBalance()

  if (payload.amount > balance) {
    throw new Error("Saldo insuficiente")
  }

  return mockDb.createTransfer(
    payload.recipient,
    payload.amount,
    payload.description,
  )
}
