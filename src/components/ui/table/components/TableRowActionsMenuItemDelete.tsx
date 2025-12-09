import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function TableRowActionsMenuItemDelete({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <MenuItem onClick={onClick} sx={{ color: 'error.main' }}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" color="error" />
      </ListItemIcon>
      <ListItemText primary="Excluir" />
    </MenuItem>
  )
}
