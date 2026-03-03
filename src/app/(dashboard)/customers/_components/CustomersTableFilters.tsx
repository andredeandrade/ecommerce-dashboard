'use client'

import { useState } from 'react'
import TableFilterButton from '@/components/ui/table/components/TableFilterButton'
import { TableSearchAndChips } from '@/components/ui/table/components/TableTopRight'
import TableSearchInput from '@/components/ui/table/components/TableSearchInput'
import { useTable } from '../../../../components/ui/table/providers/TableProvider'
import CustomersTableFiltersModal from './CustomersTableFiltersModal'
import CustomersTableFilterChips from './CustomersTableFilterChips'

export default function CustomersTableFilters() {
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
          placeholder="Buscar cliente..."
        />

        <CustomersTableFilterChips />
      </TableSearchAndChips>

      <TableFilterButton active={false} onClick={() => setOpen(true)} />

      <CustomersTableFiltersModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
