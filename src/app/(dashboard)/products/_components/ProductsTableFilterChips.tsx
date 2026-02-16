import { TableFilterChip } from '@/components/ui/table/components'
import { useTable } from '@/components/ui/table/providers/TableProvider'
import { useMemo } from 'react'

export default function ProductsTableFilterChips() {
  const { filters, clearFilter, search, setSearch } = useTable()

  const chips = useMemo(() => {
    const items: string[] = []

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return

      if (Array.isArray(value)) {
        value.forEach((v) => items.push(`${key}: ${v}`))
      } else {
        items.push(`${key}: ${value}`)
      }
    })

    if (search) items.push(`search: ${search}`)

    return items
  }, [filters, search])

  if (chips.length === 0) return null

  return (
    <>
      {chips.map((chip) => (
        <TableFilterChip
          key={chip}
          label={chip}
          onDelete={() => {
            const [key] = chip.split(':').map((s) => s.trim())
            if (key === 'search') {
              setSearch('')
            } else {
              clearFilter(key)
            }
          }}
        />
      ))}
    </>
  )
}
