'use client'

import { Box, FormControlLabel, Switch, Paper } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { BrandFormData } from '@/types/brand'
import FormTextField from '@/components/ui/inputs/FormTextField'
import BrandFormActions from './BrandFormActions'
import { useBrandFormLoading } from '../_contexts/BrandFormLoadingContext'

export default function BrandForm() {
  const { control } = useFormContext<BrandFormData>()
  const isLoading = useBrandFormLoading()

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
                sx={{ maxWidth: '50%' }}
                isLoading={isLoading}
              />
            )}
          />
        </Box>
      </Paper>

      <BrandFormActions />
    </Box>
  )
}
