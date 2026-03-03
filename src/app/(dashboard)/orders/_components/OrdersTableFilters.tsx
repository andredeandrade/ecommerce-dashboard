'use client'

import { useState } from 'react'
import TableFilterButton from '@/components/ui/table/components/TableFilterButton'
import { TableSearchAndChips } from '@/components/ui/table/components/TableTopRight'
import TableSearchInput from '@/components/ui/table/components/TableSearchInput'
import { TableFilterChip } from '@/components/ui/table/components'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'
import OrdersTableFiltersModal from './OrdersTableFiltersModal'
import OrdersTableFilterChips from './OrdersTableFilterChips'

export default function OrdersTableFilters() {
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
          placeholder="Buscar pedido..."
        />

        <OrdersTableFilterChips />
      </TableSearchAndChips>

      <TableFilterButton active={false} onClick={() => setOpen(true)} />

      <OrdersTableFiltersModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
