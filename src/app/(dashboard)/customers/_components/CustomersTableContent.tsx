'use client'

import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TablePagination,
  TablePaper,
  TableRowEmpty,
  TableTopRight,
} from '@/components/ui/table/components'
import CustomersTableRow from './CustomersTableRow'
import CustomersTableRowLoader from './CustomersTableRowLoader'
import CustomersTableFilters from './CustomersTableFilters'
import { useCustomers } from '../_hooks/useCustomers'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'

export default function CustomersTableContent() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()

  const { search, filters } = useTable()

  const { data, isLoading, error } = useCustomers({
    page,
    rowsPerPage,
    search,
    status: filters.status,
  })

  const customers = data?.items ?? []
  const total = data?.total ?? 0

  return (
    <TablePaper>
      <TableTopRight>
        <CustomersTableFilters />
      </TableTopRight>

      {error && (
        <div style={{ padding: 24, color: 'red' }}>
          Ocorreu um erro: {error.message}
        </div>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Ações</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading &&
            Array.from({ length: rowsPerPage }).map((_, i) => (
              <CustomersTableRowLoader key={i} />
            ))}

          {!isLoading && customers.length === 0 && (
            <TableRowEmpty colSpan={4} message="Nenhum cliente encontrado" />
          )}

          {!isLoading &&
            customers.map((customer) => (
              <CustomersTableRow key={customer.id} customer={customer} />
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage="Itens por página"
      />
    </TablePaper>
  )
}
