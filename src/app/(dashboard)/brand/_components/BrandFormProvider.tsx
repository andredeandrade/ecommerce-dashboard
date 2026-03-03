'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { useCreateBrand } from '@/app/(dashboard)/brand/_hooks/useCreateBrand'
import { useUpdateBrand } from '@/app/(dashboard)/brand/_hooks/useUpdateBrand'
import { useBrand } from '@/app/(dashboard)/brand/_hooks/useBrand'
import BrandFormLoadingContext from '../_contexts/BrandFormLoadingContext'
import { useEffect } from 'react'
import { BrandFormData } from '@/types/brand'

type Props = { children: React.ReactNode; brandId?: string }

export default function BrandFormProvider({ children, brandId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<BrandFormData>({
    defaultValues: { name: '', isActive: true },
  })

  const createMutation = useCreateBrand()
  const updateMutation = useUpdateBrand(brandId ?? '')
  const { data: brand, isLoading } = useBrand(brandId)

  useEffect(() => {
    if (brand) {
      methods.reset({
        name: brand.name ?? '',
        isActive: brand.isActive ?? true,
      })
    }
  }, [brand, methods])

  const onSubmit = async (data: BrandFormData) => {
    try {
      if (brandId) {
        await updateMutation.mutateAsync(data)
        enqueueSnackbar('Marca atualizada com sucesso', { variant: 'success' })
      } else {
        await createMutation.mutateAsync(data)
        enqueueSnackbar('Marca criada com sucesso', { variant: 'success' })
      }

      router.push('/brands')
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : 'Erro ao salvar marca',
        { variant: 'error' },
      )
    }
  }

  return (
    <BrandFormLoadingContext.Provider value={isLoading}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </BrandFormLoadingContext.Provider>
  )
}
