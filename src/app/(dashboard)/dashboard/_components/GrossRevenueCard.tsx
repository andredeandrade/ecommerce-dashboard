'use client'

import { Card, CardContent, Box, Typography, Stack } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export default function GrossRevenueCard() {
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
              Receita bruta
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              R$ 2480,32
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backgroundColor: 'rgba(76, 175, 80, 0.12)',
              color: 'success.main',
              px: 1,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 16 }} />
            2,15%
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
