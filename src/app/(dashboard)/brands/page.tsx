import { Box, Typography, Button } from '@mui/material'
import BrandsTable from './_components/BrandsTable'
import Link from 'next/link'

export default function BrandsPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Marcas
        </Typography>

        <Link href="/brand/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained" size="large">
            Adicionar Marca
          </Button>
        </Link>
      </Box>

      <BrandsTable />
    </Box>
  )
}
