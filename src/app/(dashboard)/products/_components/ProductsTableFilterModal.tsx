'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Checkbox,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import { useState, useMemo } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  models: string[]
  selectedModels: string[]
  setSelectedModels: (models: string[]) => void
}

export default function ProductsFilterModal({
  open,
  onClose,
  models,
  selectedModels,
  setSelectedModels,
}: Props) {
  const [filterSearch, setFilterSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filteredModels = useMemo(() => {
    return models.filter((m) =>
      m.toLowerCase().includes(filterSearch.toLowerCase()),
    )
  }, [models, filterSearch])

  function toggleModel(model: string) {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((m) => m !== model))
    } else {
      setSelectedModels([...selectedModels, model])
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Filtros</DialogTitle>

      <DialogContent dividers>
        <TextField
          placeholder="Filtrar modelos..."
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
        />

        <Box sx={{ maxHeight: 250, overflowY: 'auto' }}>
          {filteredModels
            .slice(0, showAll ? filteredModels.length : 6)
            .map((model) => (
              <Box key={model} display="flex" alignItems="center" mb={1}>
                <Checkbox
                  checked={selectedModels.includes(model)}
                  onChange={() => toggleModel(model)}
                  size="small"
                />
                <Typography variant="body2">{model}</Typography>
              </Box>
            ))}
        </Box>

        {!showAll && filteredModels.length > 6 && (
          <Typography
            variant="body2"
            sx={{ color: 'primary.main', cursor: 'pointer', mt: 1 }}
            onClick={() => setShowAll(true)}
          >
            Mostrar mais
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}
