import type { AuthResponse } from "@/types"
import { delay } from "@/lib/utils"
import { mockDb } from "@/mocks/db"

export async function authenticate(
  email: string,
  password: string,
): Promise<AuthResponse> {
  await delay(800)

  const user = mockDb.findUser(email, password)

  if (!user) {
    throw new Error("Credenciais inválidas")
  }

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: `mock-jwt-${user.id}-${Date.now()}`,
  }
}
