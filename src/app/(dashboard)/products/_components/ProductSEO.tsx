'use client'

import { Paper, Typography, Box, TextField } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'

export default function ProductSEO() {
  const { register } = useProductForm()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        SEO básico
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Título SEO"
          fullWidth
          size="small"
          {...register('seoTitle')}
        />

        <TextField
          label="Descrição SEO"
          multiline
          rows={3}
          fullWidth
          size="small"
          {...register('seoDescription')}
        />
      </Box>
    </Paper>
  )
}
