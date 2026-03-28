import type { Transaction, User } from "@/types"

interface MockUser extends User {
  password: string
}

const users: MockUser[] = [
  {
    id: "1",
    name: "Matheus Reis",
    email: "matheus@ondafinance.com",
    password: "123456",
  },
]

let balance = 15750.42

const transactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    description: "Salario",
    amount: 8500.0,
    date: "2026-03-25",
  },
  {
    id: "2",
    type: "debit",
    description: "Supermercado Extra",
    amount: 347.82,
    date: "2026-03-24",
  },
  {
    id: "3",
    type: "credit",
    description: "Pix recebido - Joao Silva",
    amount: 1200.0,
    date: "2026-03-22",
  },
  {
    id: "4",
    type: "debit",
    description: "Conta de energia",
    amount: 189.5,
    date: "2026-03-20",
  },
  {
    id: "5",
    type: "debit",
    description: "Netflix",
    amount: 55.9,
    date: "2026-03-18",
  },
  {
    id: "6",
    type: "credit",
    description: "Freelance - Projeto web",
    amount: 3500.0,
    date: "2026-03-15",
  },
  {
    id: "7",
    type: "debit",
    description: "Farmacia",
    amount: 87.3,
    date: "2026-03-14",
  },
  {
    id: "8",
    type: "debit",
    description: "Restaurante",
    amount: 125.0,
    date: "2026-03-12",
  },
]

export const mockDb = {
  findUser(email: string, password: string) {
    return users.find((u) => u.email === email && u.password === password) ?? null
  },

  getBalance() {
    return balance
  },

  getTransactions() {
    return [...transactions]
  },

  createTransfer(recipient: string, amount: number, description: string) {
    balance -= amount

    const newTransaction: Transaction = {
      id: String(transactions.length + 1),
      type: "debit",
      description: description || `Transferencia para ${recipient}`,
      amount,
      date: new Date().toISOString().split("T")[0],
      recipient,
    }

    transactions.unshift(newTransaction)
    return newTransaction
  },
}
