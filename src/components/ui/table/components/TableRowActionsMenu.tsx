import { useState } from 'react'
import { IconButton, Menu } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type Props = {
  children: (closeMenu: () => void) => React.ReactNode
}

export default function TableRowActionsMenu({ children }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const closeMenu = () => setAnchorEl(null)

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        {children(closeMenu)}
      </Menu>
    </>
  )
}
