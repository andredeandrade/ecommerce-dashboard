'use client'

import { MenuItem } from '@mui/material'
import FormTextField, {
  FormTextFieldProps,
} from '@/components/ui/inputs/FormTextField'
import { useCategories } from './hooks/useCategories'

type CategorySelectProps = FormTextFieldProps

export default function CategorySelect(props: CategorySelectProps) {
  const { data: categories = [] } = useCategories()

  return (
    <FormTextField select label="Categoria" fullWidth size="small" {...props}>
      <MenuItem value="">
        <em>Sem categoria</em>
      </MenuItem>

      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </FormTextField>
  )
}
