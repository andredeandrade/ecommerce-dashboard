'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from 'react'
import { useTable } from '@/components/ui/table/providers/TableProvider'

type Props = {
  open: boolean
  onClose: () => void
}

export default function ProductsTableFiltersModal({ open, onClose }: Props) {
  const { filters, setFilter, clearFilter, resetFilters } = useTable()
  const [localStatus, setLocalStatus] = useState('')

  useEffect(() => {
    if (open) {
      setLocalStatus(filters.status ?? '')
    }
  }, [open])

  function handleApply() {
    if (localStatus) setFilter('status', localStatus)
    else clearFilter('status')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Filtros
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Status do produto</FormLabel>

          <Select
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
            size="small"
            displayEmpty
            sx={{ mt: 1 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="active">Ativo</MenuItem>
            <MenuItem value="inactive">Inativo</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          color="error"
          onClick={() => {
            resetFilters()
            onClose()
          }}
        >
          Limpar tudo
        </Button>

        <Box display="flex" gap={1}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleApply}>
            Aplicar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
