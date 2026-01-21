'use client'

import { Paper, Typography, Box, Skeleton } from '@mui/material'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'

export default function ProductMedia() {
  const isLoading = useProductFormLoading()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Mídia do produto
      </Typography>

      {isLoading ? (
        <Skeleton variant="rounded" height={140} sx={{ borderRadius: 2 }} />
      ) : (
        <Box
          border="1px dashed"
          borderColor="divider"
          borderRadius={2}
          p={3}
          textAlign="center"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" color="text.secondary">
            Clique para enviar ou arraste e solte
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
