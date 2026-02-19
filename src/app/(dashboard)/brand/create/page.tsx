'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import BrandFormProvider from '@/app/(dashboard)/brand/_components/BrandFormProvider'
import BrandForm from '@/app/(dashboard)/brand/_components/BrandForm'

export default function CreateBrandPage() {
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Criar marca
        </Typography>
      </Box>

      <BrandFormProvider>
        <BrandForm />
      </BrandFormProvider>
    </Box>
  )
}
