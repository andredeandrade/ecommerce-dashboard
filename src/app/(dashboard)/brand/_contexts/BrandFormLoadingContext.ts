'use client'

import { createContext, useContext } from 'react'

const BrandFormLoadingContext = createContext<boolean>(false)

export function useBrandFormLoading() {
  return useContext(BrandFormLoadingContext)
}

export default BrandFormLoadingContext
