'use client'

import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email === 'teste@email.com') {
        throw new Error('Este email já está cadastrado')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fafafa"
    >
      <Box
        width={{ xs: '100%', md: '40%' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
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

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 1, bgcolor: '#fafafa' }}
          />

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1, bgcolor: '#fafafa' }}
          />

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1, bgcolor: '#fafafa' }}
          />

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2, bgcolor: '#fafafa' }}
          />

          {error && (
            <Typography color="error" fontSize={13} sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success.main" fontSize={13} sx={{ mb: 1 }}>
              Conta criada com sucesso! Redirecionando...
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleRegister}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Cadastrar'
            )}
          </Button>

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
      </Box>
    </Box>
  )
}
