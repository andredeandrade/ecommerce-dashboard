import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAuth } from '@/lib/supabase/requireAuth'

export async function GET() {
  try {
    const { profile } = await requireAuth()

    const settings = await prisma.settings.findUnique({
      where: { ownerId: profile.id },
    })

    if (!settings) {
      return NextResponse.json(
        { message: 'Configurações não encontradas' },
        { status: 404 },
      )
    }

    return NextResponse.json(settings)
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[GET_SETTINGS_ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao buscar configurações' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { profile } = await requireAuth()
    const body = await request.json()

    const {
      storeName,
      storeDescription,
      storeEmail,
      storePhone,
      storeAddress,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      whatsappUrl,
      taxId,
      taxRate,
      freeShippingMinValue,
      defaultShippingCost,
      enableOrderNotifications,
      enableCustomerNotifications,
      enableLowStockAlerts,
      lowStockThreshold,
      currency,
      timezone,
      locale,
      termsOfService,
      privacyPolicy,
      returnPolicy,
    } = body

    // Upsert: cria se não existir, atualiza se existir
    const settings = await prisma.settings.upsert({
      where: { ownerId: profile.id },
      update: {
        storeName: storeName ?? undefined,
        storeDescription: storeDescription ?? undefined,
        storeEmail: storeEmail ?? undefined,
        storePhone: storePhone ?? undefined,
        storeAddress: storeAddress ?? undefined,
        facebookUrl: facebookUrl ?? undefined,
        instagramUrl: instagramUrl ?? undefined,
        twitterUrl: twitterUrl ?? undefined,
        whatsappUrl: whatsappUrl ?? undefined,
        taxId: taxId ?? undefined,
        taxRate: taxRate ?? undefined,
        freeShippingMinValue: freeShippingMinValue ?? undefined,
        defaultShippingCost: defaultShippingCost ?? undefined,
        enableOrderNotifications: enableOrderNotifications ?? undefined,
        enableCustomerNotifications: enableCustomerNotifications ?? undefined,
        enableLowStockAlerts: enableLowStockAlerts ?? undefined,
        lowStockThreshold: lowStockThreshold ?? undefined,
        currency: currency ?? undefined,
        timezone: timezone ?? undefined,
        locale: locale ?? undefined,
        termsOfService: termsOfService ?? undefined,
        privacyPolicy: privacyPolicy ?? undefined,
        returnPolicy: returnPolicy ?? undefined,
      },
      create: {
        ownerId: profile.id,
        storeName,
        storeDescription,
        storeEmail,
        storePhone,
        storeAddress,
        facebookUrl,
        instagramUrl,
        twitterUrl,
        whatsappUrl,
        taxId,
        taxRate,
        freeShippingMinValue,
        defaultShippingCost,
        enableOrderNotifications: enableOrderNotifications ?? true,
        enableCustomerNotifications: enableCustomerNotifications ?? true,
        enableLowStockAlerts: enableLowStockAlerts ?? true,
        lowStockThreshold: lowStockThreshold ?? 10,
        currency: currency ?? 'BRL',
        timezone: timezone ?? 'America/Sao_Paulo',
        locale: locale ?? 'pt-BR',
        termsOfService,
        privacyPolicy,
        returnPolicy,
      },
    })

    return NextResponse.json(settings)
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.error('[UPDATE_SETTINGS_ERROR]', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar configurações' },
      { status: 500 },
    )
  }
}
