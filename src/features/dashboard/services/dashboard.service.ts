import type { Account, Transaction } from "@/types"
import { delay } from "@/lib/utils"
import { mockDb } from "@/mocks/db"

export async function fetchBalance(): Promise<Account> {
  await delay(500)
  return { balance: mockDb.getBalance() }
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(600)
  return mockDb.getTransactions()
}
