'use client'

import { useFormContext } from 'react-hook-form'
import { ProductFormData } from '../_components/ProductFormProvider'

export function useProductForm() {
  const methods = useFormContext<ProductFormData>()

  if (!methods) {
    throw new Error('useProductForm must be used inside ProductFormProvider')
  }

  return methods
}
