'use client'

import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useProductForm } from '../_hooks/useProductForm'

export default function ProductFormActions() {
  const router = useRouter()
  const {
    formState: { isSubmitting, isValid },
  } = useProductForm()

  return (
    <Box display="flex" justifyContent="flex-end" gap={2}>
      <Button
        variant="outlined"
        onClick={() => router.back()}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>

      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting || !isValid}
      >
        Salvar
      </Button>
    </Box>
  )
}
