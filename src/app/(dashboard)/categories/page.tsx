import { Box, Typography, Button } from '@mui/material'
import CategoriesTable from './_components/CategoriesTable'
import Link from 'next/link'

export default function CategoriesPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Categorias
        </Typography>

        <Button
          component={Link}
          href="/category/create"
          variant="contained"
          size="large"
        >
          Adicionar Categoria
        </Button>
      </Box>

      <CategoriesTable />
    </Box>
  )
}
