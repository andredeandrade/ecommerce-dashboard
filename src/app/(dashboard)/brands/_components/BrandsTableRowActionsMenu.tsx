'use client'

import {
  TableRowActionsMenu,
  TableRowActionsMenuItemDelete,
  TableRowActionsMenuItemEdit,
} from '@/components/ui/table/components'
import { useRouter } from 'next/navigation'
import { Brand } from '@/types/brand'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDeleteBrand } from '@/app/(dashboard)/brands/_hooks/useDeleteBrand'
import BrandsConfirmDeleteDialog from './BrandsConfirmDeleteDialog'

type Props = {
  brand: Brand
}

export default function BrandsTableRowActionsMenu(props: Props) {
  const { brand } = props

  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const deleteMutation = useDeleteBrand()

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Marca excluída com sucesso!', { variant: 'success' })
        setOpenDeleteDialog(false)
      },
      onError: () => {
        enqueueSnackbar('Erro ao excluir a marca.', { variant: 'error' })
      },
    })
  }

  return (
    <>
      <TableRowActionsMenu>
        {(closeMenu) => [
          <TableRowActionsMenuItemEdit
            key="edit"
            onClick={() => {
              closeMenu()
              router.push(`/brand/${brand.id}/edit`)
            }}
          />,
          <TableRowActionsMenuItemDelete
            key="delete"
            onClick={() => {
              closeMenu()
              setOpenDeleteDialog(true)
            }}
          />,
        ]}
      </TableRowActionsMenu>

      <BrandsConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(brand.id)
        }}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
