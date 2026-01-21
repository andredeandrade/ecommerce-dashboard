'use client'

import { Paper, Typography, Grid, TextField } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
import FormTextField from '@/components/ui/inputs/FormTextField'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'

export default function ProductInventory() {
  const { register } = useProductForm()
  const isLoading = useProductFormLoading()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Inventário
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            label="SKU"
            fullWidth
            size="small"
            isLoading={isLoading}
            {...register('sku')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormTextField
            label="Quantidade"
            type="number"
            fullWidth
            size="small"
            isLoading={isLoading}
            {...register('quantity', {
              valueAsNumber: true,
              min: { value: 0, message: 'Quantidade inválida' },
            })}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
