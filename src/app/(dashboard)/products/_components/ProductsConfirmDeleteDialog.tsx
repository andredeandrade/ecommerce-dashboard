import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export default function ProductsConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose}>
      <DialogTitle>Excluir produto</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir este produto? Essa ação não pode ser
          desfeita.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
