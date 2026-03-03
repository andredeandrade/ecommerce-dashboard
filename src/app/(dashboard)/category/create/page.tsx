'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import CategoryFormProvider from '@/app/(dashboard)/category/_components/CategoryFormProvider'
import CategoryForm from '@/app/(dashboard)/category/_components/CategoryForm'

export default function CreateCategoryPage() {
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Criar categoria
        </Typography>
      </Box>

      <CategoryFormProvider>
        <CategoryForm />
      </CategoryFormProvider>
    </Box>
  )
}
