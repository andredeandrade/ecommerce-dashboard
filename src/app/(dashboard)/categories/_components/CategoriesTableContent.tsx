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
import CategoriesTableRow from './CategoriesTableRow'
import CategoriesTableRowLoader from './CategoriesTableRowLoader'
import { useCategories } from '@/app/(dashboard)/categories/_hooks/useCategories'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'

export default function CategoriesTableContent() {
  const { page, rowsPerPage, setPage, setRowsPerPage, search } = useTable()

  const { data, isLoading, error } = useCategories({
    page,
    rowsPerPage,
    search,
  })

  const items = data?.items ?? []
  const total = data?.total ?? 0

  return (
    <TablePaper>
      <TableTopRight />

      {error && (
        <div style={{ padding: 24, color: 'red' }}>
          Ocorreu um erro: {error.message}
        </div>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Ações</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading &&
            Array.from({ length: rowsPerPage }).map((_, i) => (
              <CategoriesTableRowLoader key={i} />
            ))}

          {!isLoading && items.length === 0 && (
            <TableRowEmpty colSpan={3} message="Nenhuma categoria encontrada" />
          )}

          {!isLoading &&
            items.map((cat) => (
              <CategoriesTableRow key={cat.id} category={cat} />
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
