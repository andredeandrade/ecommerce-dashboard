'use client'

import { MenuItem } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useProductForm } from '../_hooks/useProductForm'
import FormTextField from '@/components/ui/inputs/FormTextField'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'

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
  const { control } = useProductForm()
  const isLoading = useProductFormLoading()

  const categories = MOCK_CATEGORIES

  return (
    <Controller
      name="categoryId"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormTextField
          {...field}
          select
          label="Categoria"
          fullWidth
          size="small"
          isLoading={isLoading}
          disabled={isLoading}
        >
          <MenuItem value="">
            <em>Sem categoria</em>
          </MenuItem>

          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </FormTextField>
      )}
    />
  )
}
