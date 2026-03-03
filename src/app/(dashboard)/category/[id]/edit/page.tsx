'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'next/navigation'
import CategoryFormProvider from '@/app/(dashboard)/category/_components/CategoryFormProvider'
import CategoryForm from '@/app/(dashboard)/category/_components/CategoryForm'

export default function EditCategoryPage() {
  const params = useParams()

  const categoryId = Array.isArray(params.id) ? params.id[0] : params.id

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Editar categoria
        </Typography>
      </Box>

      <CategoryFormProvider categoryId={categoryId}>
        <CategoryForm />
      </CategoryFormProvider>
    </Box>
  )
}
