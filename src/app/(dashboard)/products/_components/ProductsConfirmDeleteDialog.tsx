import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

export default function ProductsConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
}: any) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir produto</DialogTitle>

      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir este produto? Esta ação não pode ser
          desfeita.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>

        <Button onClick={onConfirm} color="error" variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
