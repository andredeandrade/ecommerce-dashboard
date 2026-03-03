import { Box, Typography } from '@mui/material'
import OrdersTable from './_components/OrdersTable'

export default function OrdersPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Pedidos
        </Typography>
      </Box>

      <OrdersTable />
    </Box>
  )
}
