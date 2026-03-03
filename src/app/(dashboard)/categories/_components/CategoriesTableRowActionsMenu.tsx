'use client'

import {
  TableRowActionsMenu,
  TableRowActionsMenuItemDelete,
  TableRowActionsMenuItemEdit,
} from '@/components/ui/table/components'
import { useRouter } from 'next/navigation'
import { Category } from '@/types/category'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDeleteCategory } from '@/app/(dashboard)/categories/_hooks/useDeleteCategory'
import CategoriesConfirmDeleteDialog from './CategoriesConfirmDeleteDialog'

type Props = {
  category: Category
}

export default function CategoriesTableRowActionsMenu(props: Props) {
  const { category } = props

  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const deleteMutation = useDeleteCategory()

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Categoria excluída com sucesso!', {
          variant: 'success',
        })
        setOpenDeleteDialog(false)
      },
      onError: () => {
        enqueueSnackbar('Erro ao excluir a categoria.', {
          variant: 'error',
        })
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
              router.push(`/category/${category.id}/edit`)
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

      <CategoriesConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(category.id)
        }}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
