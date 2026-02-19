'use client'

import { useFormContext } from 'react-hook-form'
import { CategoryFormData } from '../_components/CategoryFormProvider'

export function useCategoryForm() {
  const methods = useFormContext<CategoryFormData>()

  if (!methods) {
    throw new Error('useCategoryForm must be used inside CategoryFormProvider')
  }

  return methods
}
