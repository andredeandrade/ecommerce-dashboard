'use client'

import { Paper, Typography, Box, TextField } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'

export default function ProductClassification() {
  const { register } = useProductForm()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Classificação
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Categoria"
          fullWidth
          size="small"
          {...register('category')}
        />

        <TextField
          label="Marca"
          fullWidth
          size="small"
          {...register('brand')}
        />
      </Box>
    </Paper>
  )
}
