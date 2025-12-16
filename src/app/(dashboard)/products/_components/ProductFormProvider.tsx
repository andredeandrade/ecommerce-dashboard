'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { useCreateProduct } from '../_hooks/useCreateProduct'

type ProductFormProviderProps = {
  children: React.ReactNode
}

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

export default function ProductFormProvider({
  children,
}: ProductFormProviderProps) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<ProductFormData>({
    defaultValues: {
      isActive: true,
      name: '',
      description: '',
      price: 0,
      promotionalPrice: undefined,
      sku: '',
      quantity: 0,
      category: '',
      brand: '',
      seoTitle: '',
      seoDescription: '',
    },
    mode: 'onBlur',
  })

  const { mutateAsync, isPending } = useCreateProduct()

  const onSubmit = async (data: ProductFormData) => {
    try {
      await mutateAsync(data)

      enqueueSnackbar('Produto criado com sucesso', {
        variant: 'success',
      })

      router.push('/products')
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : 'Erro ao criar produto',
        {
          variant: 'error',
        },
      )
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
