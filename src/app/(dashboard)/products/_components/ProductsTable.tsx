'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
  TablePagination,
  TablePaper,
  TableFilterChips,
  TableFilterButton,
  TableTopRight,
  TableTopRightFilters,
  TableRowEmpty,
} from '@/components/ui/table/components'
import TableSearchInput from '@/components/ui/table/components/TableSearchInput'

import ProductsFilterModal from './ProductsTableFilterModal'
import ProductsTableRow from './ProductsTableRow'
import ProductsTableRowLoader from './ProductsTableRowLoader'

export default function ProductsTable() {
  const [products, setProducts] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [openFilter, setOpenFilter] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const models = [
    'Apple Iphone 15',
    'Apple Iphone 15 pro',
    'Apple Iphone 16',
    'Apple Iphone 16 mini',
  ]

  async function fetchProducts() {
    setIsLoading(true)
    setError(null)

    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(rowsPerPage))
    if (search) params.set('search', search)
    if (selectedModels.length > 0)
      params.set('models', selectedModels.join(','))

    try {
      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) throw new Error('Erro ao buscar produtos')

      const data = await response.json()
      setProducts(data.items)
      setTotal(data.total)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, rowsPerPage, search, selectedModels])

  return (
    <TablePaper>
      <TableTopRight>
        <TableTopRightFilters>
          <TableSearchInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            placeholder="Buscar produto..."
          />

          <TableFilterChips
            items={selectedModels}
            onRemove={(model) =>
              setSelectedModels((prev) => prev.filter((m) => m !== model))
            }
          />
        </TableTopRightFilters>

        <TableFilterButton
          active={selectedModels.length > 0}
          onClick={() => setOpenFilter(true)}
        />
      </TableTopRight>

      <ProductsFilterModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        models={models}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
      />

      {/* ERRO */}
      {error && (
        <div style={{ padding: 24, color: 'red' }}>
          Ocorreu um erro: {error}
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
