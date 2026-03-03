'use client'

import {
  Box,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'next/navigation'
import { useOrder } from '@/app/(dashboard)/orders/_hooks/useOrder'
import OrdersStatusBadge from '@/app/(dashboard)/orders/_components/OrdersStatusBadge'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id

  const { data: order, isLoading, error } = useOrder(orderId)

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight={600}>
          Pedido {orderId}
        </Typography>
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Typography color="error">Erro ao carregar pedido</Typography>}

      {order && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>
            Status: <OrdersStatusBadge status={order.status} />
          </Typography>

          <Typography>Subtotal: R$ {order.subtotal.toFixed(2)}</Typography>
          {order.tax != null && (
            <Typography>Taxa: R$ {order.tax.toFixed(2)}</Typography>
          )}
          {order.shipping != null && (
            <Typography>Frete: R$ {order.shipping.toFixed(2)}</Typography>
          )}
          <Typography>Total: R$ {order.total.toFixed(2)}</Typography>

          <Typography variant="h6" mt={2}>
            Itens
          </Typography>

          <Paper>
            <Table>
              <TableBody>
                {order.items?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>SKU: {item.sku}</TableCell>
                    <TableCell>Qtd: {item.quantity}</TableCell>
                    <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}
    </Box>
  )
}
