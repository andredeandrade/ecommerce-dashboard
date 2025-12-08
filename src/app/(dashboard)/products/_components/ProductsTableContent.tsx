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
import ProductsTableRow from './ProductsTableRow'
import ProductsTableRowLoader from './ProductsTableRowLoader'
import ProductsTableFilters from './ProductsTableFilters'
import { useProducts } from '../_hooks/useProducts'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'

export default function ProductsTableContent() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()

  const { search, filters } = useTable()

  const { data, isLoading, error } = useProducts({
    page,
    rowsPerPage,
    search,
    status: filters.status,
  })

  const products = data?.items ?? []
  const total = data?.total ?? 0

  return (
    <TablePaper>
      <TableTopRight>
        <ProductsTableFilters />
      </TableTopRight>

      {error && (
        <div style={{ padding: 24, color: 'red' }}>
          Ocorreu um erro: {error.message}
        </div>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome/SKU</TableHeadCell>
            <TableHeadCell>Marca</TableHeadCell>
            <TableHeadCell>Categoria</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Ações</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading &&
            Array.from({ length: rowsPerPage }).map((_, i) => (
              <ProductsTableRowLoader key={i} />
            ))}

          {!isLoading && products.length === 0 && (
            <TableRowEmpty colSpan={7} message="Nenhum produto encontrado" />
          )}

          {!isLoading &&
            products.map((product) => (
              <ProductsTableRow key={product.id} product={product} />
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
