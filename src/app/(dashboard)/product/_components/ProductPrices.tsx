'use client'

import { Paper, Typography, Box, TextField, Grid } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
import FormTextField from '@/components/ui/inputs/FormTextField'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'

export default function ProductPrices() {
  const {
    register,
    formState: { errors },
  } = useProductForm()
  const isLoading = useProductFormLoading()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Preços
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            label="Preço base"
            type="number"
            fullWidth
            size="small"
            {...register('price', {
              valueAsNumber: true,
              required: 'Preço é obrigatório',
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
            isLoading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            label="Preço promocional"
            type="number"
            fullWidth
            size="small"
            {...register('promotionalPrice', {
              valueAsNumber: true,
            })}
            error={!!errors.promotionalPrice}
            helperText={errors.promotionalPrice?.message}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
