import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import RegisterCard from '@/app/register/_components/RegisterCard'

// Mock do Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('RegisterCard', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  // it('mostra erro se o email já estiver cadastrado', async () => {
  //   render(<RegisterCard />)

  //   fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
  //     target: { value: 'André Andrade' },
  //   })
  //   fireEvent.change(screen.getByPlaceholderText('Email'), {
  //     target: { value: 'teste@email.com' },
  //   })
  //   fireEvent.change(screen.getByPlaceholderText('Senha'), {
  //     target: { value: '123456' },
  //   })
  //   fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
  //     target: { value: '123456' },
  //   })

  //   fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  //   // simula o delay de 1.5s
  //   await act(async () => {
  //     jest.runAllTimers()
  //   })

  //   expect(
  //     await screen.findByText('Este email já está cadastrado'),
  //   ).toBeInTheDocument()
  // })

  it('mostra erro se as senhas não coincidirem', async () => {
    render(<RegisterCard />)

    fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
      target: { value: 'André Andrade' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'andre@email.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: '654321' },
    })

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(
      await screen.findByText('As senhas não coincidem'),
    ).toBeInTheDocument()
  })

  // it('envia o formulário corretamente quando os dados são válidos', async () => {
  //   const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
  //   const pushMock = jest.fn()

  //   jest.mocked(require('next/navigation').useRouter).mockReturnValue({
  //     push: pushMock,
  //   })

  //   render(<RegisterCard />)

  //   fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
  //     target: { value: 'André Andrade' },
  //   })
  //   fireEvent.change(screen.getByPlaceholderText('Email'), {
  //     target: { value: 'novo@email.com' },
  //   })
  //   fireEvent.change(screen.getByPlaceholderText('Senha'), {
  //     target: { value: '123456' },
  //   })
  //   fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
  //     target: { value: '123456' },
  //   })

  //   fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  //   await act(async () => {
  //     jest.runAllTimers()
  //   })

  //   expect(alertMock).toHaveBeenCalledWith('Conta criada com sucesso!')
  //   expect(pushMock).toHaveBeenCalledWith('/')

  //   alertMock.mockRestore()
  // })
})
