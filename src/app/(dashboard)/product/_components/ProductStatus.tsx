'use client'

import { Box, Switch, Typography, Skeleton } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useProductForm } from '../_hooks/useProductForm'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'

export default function ProductStatus() {
  const { control } = useProductForm()
  const isLoading = useProductFormLoading()

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Skeleton variant="circular" width={34} height={20} />
        <Skeleton width={60} height={20} />
      </Box>
    )
  }

  return (
    <Controller
      name="isActive"
      control={control}
      render={({ field }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Switch
            checked={!!field.value}
            onChange={(_, checked) => field.onChange(checked)}
          />

          <Typography
            variant="body2"
            fontWeight={500}
            color={field.value ? 'success.main' : 'text.secondary'}
          >
            {field.value ? 'Ativo' : 'Inativo'}
          </Typography>
        </Box>
      )}
    />
  )
}
