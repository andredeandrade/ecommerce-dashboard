import React from 'react'
import { Box } from '@mui/material'
import RegisterCard from './_components/RegisterCard'

export default function Register() {
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
        <RegisterCard />
      </Box>
    </Box>
  )
}
