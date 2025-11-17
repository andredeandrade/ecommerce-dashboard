'use client'

import React from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSnackbar } from 'notistack'

type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterCard() {
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<RegisterFormData>()

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // simula um delay de requisição
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // validação fake
      if (data.email === 'teste@email.com') {
        setError('email', { message: 'Este email já está cadastrado' })
        return
      }

      reset()
      enqueueSnackbar('Conta criada com sucesso!', { variant: 'success' })
      router.push('/')
    } catch (err) {
      setError('root', { message: 'Erro inesperado. Tente novamente.' })
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
        Criar conta
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Nome completo"
          sx={{ mb: 1 }}
          {...register('name', { required: 'Informe seu nome completo' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Email"
          sx={{ mb: 1 }}
          {...register('email', {
            required: 'Informe o email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email inválido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Senha"
          type="password"
          sx={{ mb: 1 }}
          {...register('password', {
            required: 'Informe a senha',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Confirmar senha"
          type="password"
          sx={{ mb: 2 }}
          {...register('confirmPassword', {
            required: 'Confirme sua senha',
            validate: (value) =>
              value === password || 'As senhas não coincidem',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {errors.root && (
          <Typography color="error" fontSize={13} sx={{ mb: 1 }}>
            {errors.root.message}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={22} sx={{ color: 'white' }} />
          ) : (
            'Cadastrar'
          )}
        </Button>
      </form>

      <Divider sx={{ my: 2 }}>OU</Divider>

      <Typography variant="body2">
        Já tem uma conta?{' '}
        <Link
          href="/"
          style={{
            color: '#1976d2',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Entrar
        </Link>
      </Typography>
    </Paper>
  )
}
