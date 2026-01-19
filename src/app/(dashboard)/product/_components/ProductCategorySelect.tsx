'use client'

import { TextField, MenuItem } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
// import { useCategories } from '../hooks/useCategories'

type Category = {
  id: string
  name: string
}

// 🔧 MOCK TEMPORÁRIO
const MOCK_CATEGORIES: Category[] = [
  { id: '0c17e8b3-5aa0-4543-a259-e99d6573aded', name: 'Eletrônicos' },
  { id: 'c059ae3d-8a4b-478a-a952-3d789eb72aa5', name: 'Roupas' },
]

export default function ProductCategorySelect() {
  const { register } = useProductForm()

  // const { data: categories = [], isLoading } = useCategories()

  const categories = MOCK_CATEGORIES
  const isLoading = false

  return (
    <TextField
      select
      label="Categoria"
      fullWidth
      size="small"
      disabled={isLoading}
      defaultValue=""
      {...register('categoryId')}
    >
      <MenuItem value="">
        <em>Sem categoria</em>
      </MenuItem>

      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </TextField>
  )
}
