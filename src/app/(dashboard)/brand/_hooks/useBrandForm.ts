'use client'

import { useFormContext } from 'react-hook-form'
import { BrandFormData } from '@/types/brand'

export function useBrandForm() {
  const methods = useFormContext<BrandFormData>()

  if (!methods) {
    throw new Error('useBrandForm must be used inside BrandFormProvider')
  }

  return methods
}
