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
  { id: '29f3427b-8f66-499f-aeee-51a071a302a4', name: 'Eletrônicos' },
  { id: 'f4ef52b1-2478-436b-9daf-34b43316d84a', name: 'Roupas' },
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
