import { Box, Typography } from '@mui/material'

export default function BrandsPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Marcas
        </Typography>
      </Box>
    </Box>
  )
}
