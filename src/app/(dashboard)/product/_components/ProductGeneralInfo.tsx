'use client'

import { Paper, Typography, Box, TextField } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
import ProductStatus from './ProductStatus'
import FormTextField from '@/components/ui/inputs/FormTextField'

export default function ProductGeneralInfo() {
  const {
    register,
    formState: { errors },
  } = useProductForm()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Informações gerais
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <ProductStatus />

        <FormTextField
          label="Nome do produto"
          fullWidth
          size="small"
          {...register('name', {
            required: 'Nome do produto é obrigatório',
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <FormTextField
          label="Descrição"
          multiline
          rows={4}
          fullWidth
          size="small"
          {...register('description')}
        />
      </Box>
    </Paper>
  )
}
