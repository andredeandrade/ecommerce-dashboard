'use client'

import { TextField, MenuItem } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
import { Controller } from 'react-hook-form'
import FormTextField from '@/components/ui/inputs/FormTextField'
import { useProductFormLoading } from '../_contexts/ProductFormLoadingContext'
// import { useBrands } from '../hooks/useBrands'

type Brand = {
  id: string
  name: string
}

// 🔧 MOCK TEMPORÁRIO
const MOCK_BRANDS: Brand[] = [
  { id: '0b29317d-ec77-46d6-ad41-6a6e4226e3e8', name: 'Nike' },
  { id: 'f0cae1c4-8d2f-4df8-b506-38fe0177e1a6', name: 'Apple' },
]

export default function ProductBrandSelect() {
  const { control } = useProductForm()
  const isLoading = useProductFormLoading()

  // const { data: brands = [], isLoading } = useBrands()

  const brands = MOCK_BRANDS

  return (
    <Controller
      name="brandId"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormTextField
          {...field}
          select
          label="Marca"
          fullWidth
          size="small"
          isLoading={isLoading}
          disabled={isLoading}
        >
          <MenuItem value="">
            <em>Sem marca</em>
          </MenuItem>

          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </FormTextField>
      )}
    />
  )
}
