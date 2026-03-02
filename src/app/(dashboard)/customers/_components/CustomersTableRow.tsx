'use client'

import { Chip, Typography } from '@mui/material'
import Link from 'next/link'
import CustomersTableRowActionsMenu from './CustomersTableRowActionsMenu'
import { TableCell, TableRow } from '@/components/ui/table/components'
import { Customer } from '@/types/customer'

type Props = {
  customer: Customer
}

export default function CustomersTableRow({ customer }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/customer/${customer.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {customer.name}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{customer.email}</Typography>
      </TableCell>

      <TableCell>
        <Chip
          label={customer.status}
          color={customer.status === 'Ativo' ? 'success' : 'default'}
          size="small"
        />
      </TableCell>

      <TableCell>
        <CustomersTableRowActionsMenu customer={customer} />
      </TableCell>
    </TableRow>
  )
}
