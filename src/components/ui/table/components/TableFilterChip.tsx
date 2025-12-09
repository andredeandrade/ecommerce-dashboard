'use client'

import { Chip, ChipProps } from '@mui/material'

export default function TableFilterChip(props: ChipProps) {
  return (
    <Chip
      {...props}
      color={props.color ?? 'primary'}
      variant={props.variant ?? 'outlined'}
      size={props.size ?? 'small'}
      sx={{ mr: 1, ...props.sx }}
    />
  )
}
