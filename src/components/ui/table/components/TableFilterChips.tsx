'use client'

import { Box, Chip } from '@mui/material'

type Props = {
  items: string[]
  onRemove: (item: string) => void
}

export default function TableFilterChips({ items, onRemove }: Props) {
  if (items.length === 0) return null

  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {items.map((v) => (
        <Chip
          key={v}
          label={v}
          onDelete={() => onRemove(v)}
          color="primary"
          variant="outlined"
          size="small"
        />
      ))}
    </Box>
  )
}
