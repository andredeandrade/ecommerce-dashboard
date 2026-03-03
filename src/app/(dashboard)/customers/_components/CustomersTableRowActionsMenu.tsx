'use client'

import {
  TableRowActionsMenu,
  TableRowActionsMenuItemDelete,
  TableRowActionsMenuItemEdit,
} from '@/components/ui/table/components'
import { useRouter } from 'next/navigation'
import { Customer } from '@/types/customer'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDeleteCustomer } from '@/app/(dashboard)/customers/_hooks/useDeleteCustomer'
import CustomersConfirmDeleteDialog from './CustomersConfirmDeleteDialog'

type Props = {
  customer: Customer
}

export default function CustomersTableRowActionsMenu(props: Props) {
  const { customer } = props

  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const deleteMutation = useDeleteCustomer()

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Cliente excluído com sucesso!', {
          variant: 'success',
        })
        setOpenDeleteDialog(false)
      },
      onError: () => {
        enqueueSnackbar('Erro ao excluir o cliente.', {
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
              router.push(`/customer/${customer.id}`)
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

      <CustomersConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(customer.id)
        }}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
