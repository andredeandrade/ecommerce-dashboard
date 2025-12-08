import { Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

export default function ProductsStatusBadge({ status }: { status: string }) {
  const isActive = status === 'active'

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {isActive ? (
        <CheckCircleIcon sx={{ fontSize: 20, color: '#4CAF50' }} />
      ) : (
        <CancelIcon sx={{ fontSize: 20, color: '#F44336' }} />
      )}

      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: isActive ? '#4CAF50' : '#F44336',
        }}
      >
        {isActive ? 'Ativo' : 'Inativo'}
      </Typography>
    </Stack>
  )
}
