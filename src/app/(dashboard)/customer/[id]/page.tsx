'use client'

import {
  Box,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'next/navigation'
import { useCustomer } from '@/app/(dashboard)/customers/_hooks/useCustomer'

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = Array.isArray(params.id) ? params.id[0] : params.id

  const { data: customer, isLoading, error } = useCustomer(customerId)

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight={600}>
          Cliente
        </Typography>
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Typography color="error">Erro ao carregar cliente</Typography>}

      {customer && (
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Nome
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {customer.name}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{customer.email}</Typography>
            </Box>

            {customer.phone && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Telefone
                </Typography>
                <Typography variant="body1">{customer.phone}</Typography>
              </Box>
            )}

            <Box>
              <Typography variant="caption" color="text.secondary">
                Status
              </Typography>
              <Box mt={1}>
                <Chip
                  label={customer.status}
                  color={customer.status === 'Ativo' ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Box>

            {customer.createdAt && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Criado em
                </Typography>
                <Typography variant="body1">
                  {new Date(customer.createdAt).toLocaleString('pt-BR')}
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      )}
    </Box>
  )
}
