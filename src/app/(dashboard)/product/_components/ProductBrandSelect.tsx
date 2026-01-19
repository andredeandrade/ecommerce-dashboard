'use client'

import { TextField, MenuItem } from '@mui/material'
import { useProductForm } from '../_hooks/useProductForm'
// import { useBrands } from '../hooks/useBrands'

type Brand = {
  id: string
  name: string
}

// 🔧 MOCK TEMPORÁRIO
const MOCK_BRANDS: Brand[] = [
  { id: '0cd07f82-d443-44d9-8eaa-26efdc63f67b', name: 'Apple' },
  { id: '9e5ec6b3-ce5e-4438-afcc-2d6b0fc7ac3d', name: 'Samsung' },
]

export default function ProductBrandSelect() {
  const { register } = useProductForm()

  // const { data: brands = [], isLoading } = useBrands()

  const brands = MOCK_BRANDS
  const isLoading = false

  return (
    <TextField
      select
      label="Marca"
      fullWidth
      size="small"
      disabled={isLoading}
      defaultValue=""
      {...register('brandId')}
    >
      <MenuItem value="">
        <em>Sem marca</em>
      </MenuItem>

      {brands.map((brand) => (
        <MenuItem key={brand.id} value={brand.id}>
          {brand.name}
        </MenuItem>
      ))}
    </TextField>
  )
}
