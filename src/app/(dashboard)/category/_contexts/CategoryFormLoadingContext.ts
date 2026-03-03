'use client'

import { createContext, useContext } from 'react'

const CategoryFormLoadingContext = createContext<boolean>(false)

export function useCategoryFormLoading() {
  return useContext(CategoryFormLoadingContext)
}

export default CategoryFormLoadingContext
