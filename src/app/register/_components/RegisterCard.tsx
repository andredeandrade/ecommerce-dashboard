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
import PasswordInput from '@/components/ui/inputs/PasswordInput'
import { supabase } from '@/lib/supabase/client'
import { createProfile } from '@/services/profile/createProfile'

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
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) {
        if (error.message.toLowerCase().includes('already')) {
          setError('email', { message: 'Este email já está cadastrado' })
          return
        }

        setError('root', { message: error.message })
        return
      }

      await createProfile({
        userId: authData.user!.id,
        name: data.name,
      })

      reset()
      enqueueSnackbar(
        'Conta criada com sucesso! Verifique seu email para confirmar.',
        { variant: 'success' },
      )

      router.push('/')
    } catch {
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

        <PasswordInput
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Senha"
          sx={{ mb: 1 }}
          {...register('password', {
            required: 'Informe a senha',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres',
            },
          })}
          errorMessage={errors.password?.message}
        />

        <PasswordInput
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Confirmar senha"
          sx={{ mb: 2 }}
          {...register('confirmPassword', {
            required: 'Confirme sua senha',
            validate: (value) =>
              value === password || 'As senhas não coincidem',
          })}
          errorMessage={errors.confirmPassword?.message}
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
