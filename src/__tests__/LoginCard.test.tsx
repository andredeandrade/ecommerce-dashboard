import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import LoginCard from '@/app/_login/_components/LoginCard'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

describe('LoginCard', () => {
  const push = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push })
    jest.clearAllMocks()
  })

  it('renderiza os campos de email e senha', () => {
    render(<LoginCard />)
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument()
  })

  it('mostra erros de validação se campos estiverem vazios', async () => {
    render(<LoginCard />)
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Informe o email')).toBeInTheDocument()
    expect(await screen.findByText('Informe a senha')).toBeInTheDocument()
  })

  it('mostra erro se o login falhar', async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({
      error: 'Invalid credentials',
    })

    render(<LoginCard />)
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'teste@email.com' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(
      await screen.findByText('Email ou senha incorretos'),
    ).toBeInTheDocument()
  })

  it('redireciona para /dashboard se login for bem-sucedido', async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({ ok: true })

    render(<LoginCard />)
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'teste@email.com' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/dashboard')
    })
  })
})
