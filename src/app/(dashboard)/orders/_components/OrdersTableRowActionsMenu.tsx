'use client'

import {
  TableRowActionsMenu,
  TableRowActionsMenuItemDelete,
  TableRowActionsMenuItemEdit,
} from '@/components/ui/table/components'
import { useRouter } from 'next/navigation'
import { Order } from '@/types/order'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDeleteOrder } from '@/app/(dashboard)/orders/_hooks/useDeleteOrder'
import OrdersConfirmDeleteDialog from './OrdersConfirmDeleteDialog'

type Props = {
  order: Order
}

export default function OrdersTableRowActionsMenu(props: Props) {
  const { order } = props

  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const deleteMutation = useDeleteOrder()

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Pedido excluído com sucesso!', {
          variant: 'success',
        })
        setOpenDeleteDialog(false)
      },
      onError: () => {
        enqueueSnackbar('Erro ao excluir o pedido.', {
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
              router.push(`/order/${order.id}`)
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

      <OrdersConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(order.id)
        }}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
