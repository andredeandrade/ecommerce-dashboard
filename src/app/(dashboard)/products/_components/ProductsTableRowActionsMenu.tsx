'use client'

import {
  TableRowActionsMenu,
  TableRowActionsMenuItemDelete,
  TableRowActionsMenuItemEdit,
} from '@/components/ui/table/components'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDeleteProduct } from '../_hooks/useDeleteProduct'
import ProductsConfirmDeleteDialog from './ProductsConfirmDeleteDialog'

type Props = {
  product: Product
}

export default function ProductsTableRowActionsMenu(props: Props) {
  const { product } = props

  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const deleteMutation = useDeleteProduct()

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Produto excluído com sucesso!', {
          variant: 'success',
        })
        setOpenDeleteDialog(false)
      },
      onError: () => {
        enqueueSnackbar('Erro ao excluir o produto.', {
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
              router.push(`/product/${product.id}/edit`)
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

      <ProductsConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(product.id)
        }}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
