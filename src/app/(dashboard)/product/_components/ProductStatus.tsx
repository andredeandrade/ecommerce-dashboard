'use client'

import { Box, Switch, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useProductForm } from '../_hooks/useProductForm'

export default function ProductStatus() {
  const { control } = useProductForm()

  return (
    <Controller
      name="isActive"
      control={control}
      render={({ field }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Switch
            checked={field.value}
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
