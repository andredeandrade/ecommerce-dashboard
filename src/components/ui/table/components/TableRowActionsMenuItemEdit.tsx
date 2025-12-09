import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default function TableRowActionsMenuItemEdit({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Editar" />
    </MenuItem>
  )
}
