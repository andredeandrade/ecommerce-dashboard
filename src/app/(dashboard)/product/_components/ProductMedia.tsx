'use client'

import { Paper, Typography, Box } from '@mui/material'

export default function ProductMedia() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Mídia do produto
      </Typography>

      <Box
        border="1px dashed"
        borderColor="divider"
        borderRadius={2}
        p={3}
        textAlign="center"
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="body2" color="text.secondary">
          Click to upload or drag and drop
        </Typography>
      </Box>
    </Paper>
  )
}
