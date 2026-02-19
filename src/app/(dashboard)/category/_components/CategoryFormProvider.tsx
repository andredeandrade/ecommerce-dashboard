'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { useCreateCategory } from '@/app/(dashboard)/category/_hooks/useCreateCategory'
import { useUpdateCategory } from '@/app/(dashboard)/category/_hooks/useUpdateCategory'
import { useCategory } from '@/app/(dashboard)/category/_hooks/useCategory'
import CategoryFormLoadingContext from '../_contexts/CategoryFormLoadingContext'
import { useEffect } from 'react'

export type CategoryFormData = {
  name: string
  isActive?: boolean
}

type Props = { children: React.ReactNode; categoryId?: string }

export default function CategoryFormProvider({ children, categoryId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<CategoryFormData>({
    defaultValues: { name: '', isActive: true },
  })

  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory(categoryId ?? '')
  const { data: category, isLoading } = useCategory(categoryId)

  useEffect(() => {
    if (category) {
      methods.reset({
        name: category.name ?? '',
        isActive: category.isActive ?? true,
      })
    }
  }, [category, methods])

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (categoryId) {
        await updateMutation.mutateAsync(data)
        enqueueSnackbar('Categoria atualizada com sucesso', {
          variant: 'success',
        })
      } else {
        await createMutation.mutateAsync(data)
        enqueueSnackbar('Categoria criada com sucesso', { variant: 'success' })
      }

      router.push('/categories')
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : 'Erro ao salvar categoria',
        { variant: 'error' },
      )
    }
  }

  return (
    <CategoryFormLoadingContext.Provider value={isLoading}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </CategoryFormLoadingContext.Provider>
  )
}
