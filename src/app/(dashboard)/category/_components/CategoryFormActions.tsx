'use client'

import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCategoryForm } from '../_hooks/useCategoryForm'
import { useCategoryFormLoading } from '../_contexts/CategoryFormLoadingContext'

export default function CategoryFormActions() {
  const router = useRouter()
  const {
    formState: { isSubmitting, isValid },
  } = useCategoryForm()
  const isLoading = useCategoryFormLoading()

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
