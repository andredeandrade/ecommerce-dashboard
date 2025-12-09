'use client'

import { IconButton } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'

type Props = {
  active?: boolean
  onClick: () => void
}

export default function TableFilterButton({ active, onClick }: Props) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        border: active ? '1px solid #1976d2' : '1px solid #D0D5DD',
        backgroundColor: active ? 'rgba(25, 118, 210, 0.08)' : '#fff',
        borderRadius: 2,
        padding: '6px',
        '& svg': {
          color: active ? '#1976d2' : '#555',
        },
        '&:hover': {
          backgroundColor: active ? 'rgba(25, 118, 210, 0.12)' : '#F9FAFB',
        },
      }}
    >
      <TuneIcon />
    </IconButton>
  )
}
