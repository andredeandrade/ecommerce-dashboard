'use client'

import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import PasswordInput from '@/components/ui/inputs/PasswordInput'

type LoginFormData = {
  email: string
  password: string
}

export default function LoginCard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: 'teste@email.com', password: '123456' }, //mock defaults
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Email ou senha incorretos')
      return
    }

    console.log('result', result)

    if (result?.ok) {
      console.log('Redirecionando...')
      router.push('/dashboard')
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #dbdbdb',
        p: 4,
        width: 350,
        textAlign: 'center',
        bgcolor: 'white',
      }}
    >
      <Typography variant="h4" fontWeight="400" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Informe o email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email inválido',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Email"
              sx={{ mb: 1 }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Informe a senha' }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Senha"
              sx={{ mb: 2 }}
              errorMessage={errors.password?.message}
            />
          )}
        />

        {error && (
          <Typography color="error" fontSize={13} sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          type="submit"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: 'white' }} />
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <Divider sx={{ my: 2 }}>OU</Divider>

      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: 'pointer', mb: 1 }}
      >
        Esqueceu a senha?
      </Typography>

      <Typography variant="body2">
        Não tem uma conta?{' '}
        <Link
          href="/register"
          style={{
            color: '#1976d2',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Cadastre-se
        </Link>
      </Typography>
    </Paper>
  )
}
