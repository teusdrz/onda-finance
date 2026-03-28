import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, beforeEach } from "vitest"
import { MemoryRouter } from "react-router-dom"

import { LoginForm } from "../components/LoginForm"
import { useAuthStore } from "../store/auth.store"

function renderLoginForm() {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )
}

describe("LoginForm", () => {
  beforeEach(() => {
    useAuthStore.getState().logout()
  })

  it("renderiza campos de email e senha", () => {
    renderLoginForm()

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument()
  })

  it("exibe erros de validacao ao submeter formulario vazio", async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/e-mail e obrigatorio/i)).toBeInTheDocument()
      expect(screen.getByText(/senha e obrigatoria/i)).toBeInTheDocument()
    })
  })

  it("exibe erro para senha curta", async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByLabelText(/e-mail/i), "teste@email.com")
    await user.type(screen.getByLabelText(/senha/i), "123")
    await user.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/senha deve ter pelo menos 6 caracteres/i),
      ).toBeInTheDocument()
    })
  })

  it("exibe erro para credenciais incorretas", async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByLabelText(/e-mail/i), "errado@email.com")
    await user.type(screen.getByLabelText(/senha/i), "senhaerrada")
    await user.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(
      () => {
        expect(screen.getByText(/credenciais invalidas/i)).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it("autentica com credenciais validas e atualiza o store", async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(
      screen.getByLabelText(/e-mail/i),
      "matheus@ondafinance.com",
    )
    await user.type(screen.getByLabelText(/senha/i), "123456")
    await user.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(
      () => {
        const state = useAuthStore.getState()
        expect(state.isAuthenticated).toBe(true)
        expect(state.user?.name).toBe("Matheus Reis")
      },
      { timeout: 3000 },
    )
  })
})
