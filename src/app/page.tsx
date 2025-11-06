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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError('Email ou senha incorretos')
      setLoading(false)
      return
    }

    router.push('/dashboard')
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
            Dashboard
          </Typography>

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
            sx={{ mb: 2, bgcolor: '#fafafa' }}
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
            onClick={handleLogin}
            sx={{
              bgcolor: '#0095f6',
              textTransform: 'none',
              fontWeight: 'bold',
              mb: 2,
              '&:hover': { bgcolor: '#1877f2' },
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Entrar'
            )}
          </Button>

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
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: 'pointer', fontWeight: '500' }}
            >
              Cadastre-se
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
