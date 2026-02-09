'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { useCreateProduct } from '../_hooks/useCreateProduct'
import { useUpdateProduct } from '../_hooks/useUpdateProduct'
import { useProduct } from '../_hooks/useProduct'
import { useEffect } from 'react'
import ProductFormLoadingContext from '../_contexts/ProductFormLoadingContext'

export type ProductFormData = {
  isActive: boolean
  name: string
  description?: string
  price: number
  promotionalPrice?: number
  sku?: string
  quantity?: number
  categoryId?: string
  brandId?: string
  seoTitle?: string
  seoDescription?: string
}

type ProductFormProviderProps = {
  children: React.ReactNode
  productId?: string
}

export default function ProductFormProvider({
  children,
  productId,
}: ProductFormProviderProps) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<ProductFormData>({
    defaultValues: {
      isActive: true,
      name: '',
      description: '',
      price: 0,
    },
  })

  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct(productId!)
  const { data: product, isLoading } = useProduct(productId)

  useEffect(() => {
    if (product) {
      methods.reset({
        isActive: product.isActive ?? true,
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? 0,
        promotionalPrice: product.promotionalPrice ?? undefined,
        sku: product.sku ?? '',
        quantity: product.quantity ?? undefined,
        categoryId: product.categoryId ?? '',
        brandId: product.brandId ?? '',
        seoTitle: product.seoTitle ?? '',
        seoDescription: product.seoDescription ?? '',
      })
    }
  }, [product, methods])

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (productId) {
        await updateMutation.mutateAsync(data)
        enqueueSnackbar('Produto atualizado com sucesso', {
          variant: 'success',
        })
      } else {
        await createMutation.mutateAsync(data)
        enqueueSnackbar('Produto criado com sucesso', {
          variant: 'success',
        })
      }

      router.push('/products')
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : 'Erro ao salvar produto',
        { variant: 'error' },
      )
    }
  }

  return (
    <ProductFormLoadingContext.Provider value={isLoading}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </ProductFormLoadingContext.Provider>
  )
}
