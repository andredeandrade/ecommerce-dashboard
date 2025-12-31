import { Box, Typography } from '@mui/material'

export default function CategoriesPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Categorias
        </Typography>
      </Box>
    </Box>
  )
}
