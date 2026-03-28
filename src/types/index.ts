export interface User {
  id: string
  name: string
  email: string
}

export interface Transaction {
  id: string
  type: "credit" | "debit"
  description: string
  amount: number
  date: string
  recipient?: string
}

export interface TransferPayload {
  recipient: string
  amount: number
  description: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Account {
  balance: number
}
