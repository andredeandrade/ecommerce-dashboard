import { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ProductsConfirmDeleteDialog from './ProductsConfirmDeleteDialog'

export default function ProductsTableRowActionsMenu({ onEdit, onDelete }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose()
            onEdit?.()
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose()
            setOpenDeleteDialog(true)
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Excluir" />
        </MenuItem>
      </Menu>

      <ProductsConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          setOpenDeleteDialog(false)
          onDelete?.()
        }}
      />
    </>
  )
}
