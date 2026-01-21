'use client'

import { createContext, useContext } from 'react'

const ProductFormLoadingContext = createContext<boolean>(false)

export function useProductFormLoading() {
  return useContext(ProductFormLoadingContext)
}

export default ProductFormLoadingContext
