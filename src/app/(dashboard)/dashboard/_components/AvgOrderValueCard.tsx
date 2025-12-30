'use client'

import { Card, CardContent, Box, Typography, Stack } from '@mui/material'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

export default function AvgOrderValueCard() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <Typography fontSize={14} color="text.secondary" fontWeight={600}>
              Valor médio do pedido
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              R$ 56,12
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backgroundColor: 'rgba(175, 76, 76, 0.12)',
              color: 'error.main',
              px: 1,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <TrendingDownIcon sx={{ fontSize: 16 }} />
            2,15%
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
