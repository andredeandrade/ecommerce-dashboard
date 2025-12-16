'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ProductForm from '../_components/ProductForm'
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProductFormProvider from '../_components/ProductFormProvider'

export default function NewProductPage() {
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Criar produto
        </Typography>
      </Box>

      <ProductFormProvider>
        <ProductForm />
      </ProductFormProvider>
    </Box>
  )
}
