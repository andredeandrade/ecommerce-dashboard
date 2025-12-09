'use client'

import { createContext, useContext, useState } from 'react'

interface TableContextData {
  search: string
  setSearch: (v: string) => void
  filters: Record<string, any>
  setFilter: (key: string, value: any) => void
  clearFilter: (key: string) => void
  resetFilters: () => void
  page: number
  rowsPerPage: number
  setPage: (v: number) => void
  setRowsPerPage: (v: number) => void
}

const TableContext = createContext<TableContextData | null>(null)

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>({})

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  function setFilter(key: string, value: any) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(0)
  }

  function clearFilter(key: string) {
    setFilters((prev) => {
      const updated = { ...prev }
      delete updated[key]
      return updated
    })
    setPage(0)
  }

  function resetFilters() {
    setFilters({})
    setSearch('')
    setPage(0)
  }

  return (
    <TableContext.Provider
      value={{
        search,
        setSearch,
        filters,
        setFilter,
        clearFilter,
        resetFilters,
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export function useTable() {
  const ctx = useContext(TableContext)
  if (!ctx) throw new Error('useTable deve estar dentro do TableProvider')
  return ctx
}
