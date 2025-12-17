'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { useCreateProduct } from '../_hooks/useCreateProduct'
import { useUpdateProduct } from '../_hooks/useUpdateProduct'
import { useEffect } from 'react'

export type ProductFormData = {
  isActive: boolean
  name: string
  description?: string
  price: number
  promotionalPrice?: number
  sku?: string
  quantity?: number
  category?: string
  brand?: string
  seoTitle?: string
  seoDescription?: string
}

type ProductFormProviderProps = {
  children: React.ReactNode
  productId?: number
  initialData?: ProductFormData
}

export default function ProductFormProvider({
  children,
  productId,
  initialData,
}: ProductFormProviderProps) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<ProductFormData>({
    defaultValues: initialData ?? {
      isActive: true,
      name: '',
      description: '',
      price: 0,
    },
  })

  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct(productId!)

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData)
    }
  }, [initialData, methods])

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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
