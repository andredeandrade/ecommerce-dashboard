'use client'
import { Card, CardContent, Typography, Box, Stack } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const data = [
  { day: '2 Jan', current: 1000, lastWeek: 800 },
  { day: '3 Jan', current: 1800, lastWeek: 1000 },
  { day: '4 Jan', current: 1600, lastWeek: 1100 },
  { day: '5 Jan', current: 1900, lastWeek: 1500 },
  { day: '6 Jan', current: 2000, lastWeek: 1600 },
  { day: '7 Jan', current: 2200, lastWeek: 1700 },
  { day: '8 Jan', current: 3000, lastWeek: 1900 },
]

export default function TotalSalesChart() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent>
        <Typography variant="h6">Total Vendas</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h4" fontWeight={600}>
            $2,450
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography color="success.main" fontSize={14}>
              12% VS Semana Passada
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ width: '100%', height: 300, mt: 2 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="lastWeek"
                stroke="#A8A8A8"
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box mt={1} display="flex" gap={3} fontSize={12} color="text.secondary">
          <span>Dez 23 - Jan 1</span>
          <span>Jan 2 - Jan 8</span>
        </Box>
      </CardContent>
    </Card>
  )
}
