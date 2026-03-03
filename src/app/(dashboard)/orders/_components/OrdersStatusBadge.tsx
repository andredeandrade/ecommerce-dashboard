import React from 'react'
import { Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'

// map order status to label and color/icon
const statusMap: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  PENDING: {
    label: 'Pendente',
    color: '#FFA000',
    icon: <HourglassEmptyIcon sx={{ fontSize: 20, color: '#FFA000' }} />,
  },
  PROCESSING: {
    label: 'Processando',
    color: '#1976D2',
    icon: <HourglassEmptyIcon sx={{ fontSize: 20, color: '#1976D2' }} />,
  },
  PAID: {
    label: 'Pago',
    color: '#4CAF50',
    icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#4CAF50' }} />,
  },
  SHIPPED: {
    label: 'Enviado',
    color: '#1976D2',
    icon: <HourglassEmptyIcon sx={{ fontSize: 20, color: '#1976D2' }} />,
  },
  COMPLETED: {
    label: 'Concluído',
    color: '#4CAF50',
    icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#4CAF50' }} />,
  },
  CANCELLED: {
    label: 'Cancelado',
    color: '#F44336',
    icon: <CancelIcon sx={{ fontSize: 20, color: '#F44336' }} />,
  },
  REFUNDED: {
    label: 'Reembolsado',
    color: '#F44336',
    icon: <CancelIcon sx={{ fontSize: 20, color: '#F44336' }} />,
  },
}

export default function OrdersStatusBadge({ status }: { status: string }) {
  const info = statusMap[status] || {
    label: status,
    color: '#757575',
    icon: <HourglassEmptyIcon sx={{ fontSize: 20, color: '#757575' }} />,
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {info.icon}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: info.color,
        }}
      >
        {info.label}
      </Typography>
    </Stack>
  )
}
