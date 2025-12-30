'use client'

import {
  Box,
  Typography,
  Link,
  Grid,
  Stack,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import TotalOrdersCard from './_components/TotalOrdersCard'
import GrossRevenueCard from './_components/GrossRevenueCard'
import AvgOrderValueCard from './_components/AvgOrderValueCard'
import TotalSalesChart from './_components/TotalSalesChart'
import { useState } from 'react'

export default function DashboardPage() {
  const notifications = 2
  const userName = 'João Gomes'

  const [dateRange, setDateRange] = useState<'7d' | '30d'>('7d')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            Bem-vindo de volta, {userName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Você tem{' '}
            <Link component="button" fontWeight={600} underline="hover">
              {notifications} notificações não lidas
            </Link>
          </Typography>
        </Stack>

        <Box display="flex">
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {dateRange === '7d' ? 'Últimos 7 dias' : 'Últimos 30 dias'}
          </Button>

          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setDateRange('7d')
                setAnchorEl(null)
              }}
            >
              Últimos 7 dias
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDateRange('30d')
                setAnchorEl(null)
              }}
            >
              Últimos 30 dias
            </MenuItem>
          </Menu>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <GrossRevenueCard />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <AvgOrderValueCard />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TotalOrdersCard />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 9 }}>
            <TotalSalesChart />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}
