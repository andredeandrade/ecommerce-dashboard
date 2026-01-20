'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'next/navigation'
import { useProduct } from '../../_hooks/useProduct'
import ProductFormProvider from '../../_components/ProductFormProvider'
import ProductForm from '../../_components/ProductForm'

export default function EditProductPage() {
  const params = useParams()

  const productId = Array.isArray(params.id) ? params.id[0] : params.id

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Editar produto
        </Typography>
      </Box>

      <ProductFormProvider productId={productId}>
        <ProductForm />
      </ProductFormProvider>
    </Box>
  )
}
