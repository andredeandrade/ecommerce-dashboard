'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'next/navigation'
import BrandFormProvider from '@/app/(dashboard)/brand/_components/BrandFormProvider'
import BrandForm from '@/app/(dashboard)/brand/_components/BrandForm'

export default function EditBrandPage() {
  const params = useParams()

  const brandId = Array.isArray(params.id) ? params.id[0] : params.id

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Editar marca
        </Typography>
      </Box>

      <BrandFormProvider brandId={brandId}>
        <BrandForm />
      </BrandFormProvider>
    </Box>
  )
}
