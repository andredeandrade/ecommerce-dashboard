'use client'

import { Box, TextField, FormControlLabel, Switch, Paper } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { CategoryFormData } from './CategoryFormProvider'
import FormTextField from '@/components/ui/inputs/FormTextField'
import CategoryFormActions from './CategoryFormActions'
import { useCategoryFormLoading } from '../_contexts/CategoryFormLoadingContext'

export default function CategoryForm() {
  const { control } = useFormContext<CategoryFormData>()
  const isLoading = useCategoryFormLoading()

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isLoading}
                  />
                }
                label="Ativa"
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field, fieldState }) => (
              <FormTextField
                label="Nome"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                  maxWidth: '50%',
                }}
                isLoading={isLoading}
              />
            )}
          />
        </Box>
      </Paper>

      <CategoryFormActions />
    </Box>
  )
}
