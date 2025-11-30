'use client'

import { TextField, InputAdornment, TextFieldProps } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props extends Omit<TextFieldProps, 'variant' | 'size'> {}

export default function TableSearchInput({ sx, ...props }: Props) {
  return (
    <TextField
      size="small"
      variant="outlined"
      fullWidth
      sx={{
        backgroundColor: '#fff',
        ...sx,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#9e9e9e' }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}
