'use client'

import { Paper, Typography, Box } from '@mui/material'
import ProductBrandSelect from './ProductBrandSelect'
import { useProductForm } from '../_hooks/useProductForm'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'
import { Controller } from 'react-hook-form'
import CategorySelect from '@/components/ui/inputs/categorySelect/CategorySelect'
import BrandSelect from '@/components/ui/inputs/brandSelect/BrandSelect'

export default function ProductClassification() {
  const { control } = useProductForm()
  const isLoading = useProductFormLoading()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Classificação
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Controller
          name="categoryId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CategorySelect {...field} isLoading={isLoading} />
          )}
        />
        <Controller
          name="brandId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <BrandSelect {...field} isLoading={isLoading} />
          )}
        />
      </Box>
    </Paper>
  )
}
