import { Box, Button, Typography } from '@mui/material'
import ProductsTable from './_components/ProductsTable'

export default function ProductsPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Produtos
        </Typography>

        <Button variant="contained" color="primary" size="large">
          Adicionar Produto
        </Button>
      </Box>
      <ProductsTable />
    </Box>
  )
}
