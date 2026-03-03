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
import OrdersTableRow from './OrdersTableRow'
import OrdersTableRowLoader from './OrdersTableRowLoader'
import OrdersTableFilters from './OrdersTableFilters'
import { useOrders } from '../_hooks/useOrders'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'

export default function OrdersTableContent() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()

  const { search, filters } = useTable()

  const { data, isLoading, error } = useOrders({
    page,
    rowsPerPage,
    search,
    status: filters.status,
  })

  const orders = data?.items ?? []
  const total = data?.total ?? 0

  return (
    <TablePaper>
      <TableTopRight>
        <OrdersTableFilters />
      </TableTopRight>

      {error && (
        <div style={{ padding: 24, color: 'red' }}>
          Ocorreu um erro: {error.message}
        </div>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Subtotal</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
            <TableHeadCell>Criado em</TableHeadCell>
            <TableHeadCell>Ações</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading &&
            Array.from({ length: rowsPerPage }).map((_, i) => (
              <OrdersTableRowLoader key={i} />
            ))}

          {!isLoading && orders.length === 0 && (
            <TableRowEmpty colSpan={6} message="Nenhum pedido encontrado" />
          )}

          {!isLoading &&
            orders.map((order) => (
              <OrdersTableRow key={order.id} order={order} />
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
