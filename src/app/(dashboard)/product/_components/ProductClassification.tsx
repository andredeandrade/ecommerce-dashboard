'use client'

import { Paper, Typography, Box, TextField } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
import ProductCategorySelect from './ProductCategorySelect'
import ProductBrandSelect from './ProductBrandSelect'

export default function ProductClassification() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Classificação
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <ProductCategorySelect />
        <ProductBrandSelect />
      </Box>
    </Paper>
  )
}
