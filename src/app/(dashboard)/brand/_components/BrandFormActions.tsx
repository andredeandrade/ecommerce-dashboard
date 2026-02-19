'use client'

import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useBrandFormLoading } from '../_contexts/BrandFormLoadingContext'

export default function BrandFormActions() {
  const router = useRouter()
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext()
  const isLoading = useBrandFormLoading()

  return (
    <Box display="flex" justifyContent="flex-end" gap={2}>
      <Button
        variant="outlined"
        onClick={() => router.back()}
        disabled={isSubmitting || isLoading}
      >
        Cancelar
      </Button>

      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting || isLoading || !isValid}
      >
        Salvar
      </Button>
    </Box>
  )
}
