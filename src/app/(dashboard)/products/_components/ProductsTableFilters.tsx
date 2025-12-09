'use client'

import { useState } from 'react'
import TableFilterButton from '@/components/ui/table/components/TableFilterButton'
import { TableSearchAndChips } from '@/components/ui/table/components/TableTopRight'
import TableSearchInput from '@/components/ui/table/components/TableSearchInput'
import { TableFilterChip } from '@/components/ui/table/components'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'
import ProductsTableFiltersModal from './ProductsTableFiltersModal'
import ProductsTableFilterChips from './ProductsTableFilterChips'

export default function ProductsTableFilters() {
  const [open, setOpen] = useState(false)

  const { search, setSearch } = useTable()

  return (
    <>
      <TableSearchAndChips>
        <TableSearchInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          placeholder="Buscar produto..."
        />

        <ProductsTableFilterChips />
      </TableSearchAndChips>

      <TableFilterButton active={false} onClick={() => setOpen(true)} />

      <ProductsTableFiltersModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
