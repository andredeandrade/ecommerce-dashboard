'use client'

import { MenuItem } from '@mui/material'
import FormTextField, {
  FormTextFieldProps,
} from '@/components/ui/inputs/FormTextField'
import { useBrands } from './hooks/useBrands'

type BrandSelectProps = FormTextFieldProps

export default function BrandSelect(props: BrandSelectProps) {
  const { data: brands = [] } = useBrands()

  return (
    <FormTextField select label="Marca" fullWidth size="small" {...props}>
      <MenuItem value="">
        <em>Sem marca</em>
      </MenuItem>

      {brands.map((brand) => (
        <MenuItem key={brand.id} value={brand.id}>
          {brand.name}
        </MenuItem>
      ))}
    </FormTextField>
  )
}
