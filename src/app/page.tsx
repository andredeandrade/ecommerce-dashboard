'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Box, Button, CircularProgress, Typography, Paper } from '@mui/material'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!session) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Você não está logado
          </Typography>
          <Typography variant="body1" gutterBottom>
            Faça login para acessar sua conta
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              signIn('credentials', {
                email: 'teste@email.com',
                password: '123456',
                redirect: false,
              })
            }
          >
            Login de Teste
          </Button>
        </Paper>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={2}
    >
      <Paper elevation={4} sx={{ p: 4, textAlign: 'center', minWidth: 300 }}>
        <Typography variant="h4" gutterBottom>
          Minha página Home
        </Typography>

        <Typography variant="h6" gutterBottom>
          Bem-vindo, {session.user?.name || session.user?.email}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Email: {session.user?.email}
        </Typography>

        <Button variant="outlined" color="secondary" onClick={() => signOut()}>
          Sair
        </Button>
      </Paper>
    </Box>
  )
}
