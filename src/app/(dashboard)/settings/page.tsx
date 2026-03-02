'use client'

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material'
import { useSettings } from './_hooks/useSettings'
import { useUpdateSettings } from './_hooks/useUpdateSettings'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings()
  const updateMutation = useUpdateSettings()
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({
    storeName: '',
    storeDescription: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: '',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    whatsappUrl: '',
    taxId: '',
    taxRate: '',
    freeShippingMinValue: '',
    defaultShippingCost: '',
    enableOrderNotifications: true,
    enableCustomerNotifications: true,
    enableLowStockAlerts: true,
    lowStockThreshold: '10',
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    locale: 'pt-BR',
  })

  useEffect(() => {
    if (settings) {
      setFormData({
        storeName: settings.storeName || '',
        storeDescription: settings.storeDescription || '',
        storeEmail: settings.storeEmail || '',
        storePhone: settings.storePhone || '',
        storeAddress: settings.storeAddress || '',
        facebookUrl: settings.facebookUrl || '',
        instagramUrl: settings.instagramUrl || '',
        twitterUrl: settings.twitterUrl || '',
        whatsappUrl: settings.whatsappUrl || '',
        taxId: settings.taxId || '',
        taxRate: settings.taxRate?.toString() || '',
        freeShippingMinValue: settings.freeShippingMinValue?.toString() || '',
        defaultShippingCost: settings.defaultShippingCost?.toString() || '',
        enableOrderNotifications: settings.enableOrderNotifications,
        enableCustomerNotifications: settings.enableCustomerNotifications,
        enableLowStockAlerts: settings.enableLowStockAlerts,
        lowStockThreshold: settings.lowStockThreshold?.toString() || '10',
        currency: settings.currency || 'BRL',
        timezone: settings.timezone || 'America/Sao_Paulo',
        locale: settings.locale || 'pt-BR',
      })
    }
  }, [settings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data: any = {
      ...formData,
      taxRate: formData.taxRate ? parseFloat(formData.taxRate) : null,
      freeShippingMinValue: formData.freeShippingMinValue
        ? parseFloat(formData.freeShippingMinValue)
        : null,
      defaultShippingCost: formData.defaultShippingCost
        ? parseFloat(formData.defaultShippingCost)
        : null,
      lowStockThreshold: formData.lowStockThreshold
        ? parseInt(formData.lowStockThreshold)
        : null,
    }

    updateMutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('Configurações salvas com sucesso!', {
          variant: 'success',
        })
      },
      onError: () => {
        enqueueSnackbar('Erro ao salvar configurações', { variant: 'error' })
      },
    })
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Configurações
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Informações da Loja
            </Typography>

            <TextField
              label="Nome da Loja"
              fullWidth
              value={formData.storeName}
              onChange={(e) =>
                setFormData({ ...formData, storeName: e.target.value })
              }
            />

            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={formData.storeDescription}
              onChange={(e) =>
                setFormData({ ...formData, storeDescription: e.target.value })
              }
            />

            <TextField
              label="Email"
              fullWidth
              type="email"
              value={formData.storeEmail}
              onChange={(e) =>
                setFormData({ ...formData, storeEmail: e.target.value })
              }
            />

            <TextField
              label="Telefone"
              fullWidth
              value={formData.storePhone}
              onChange={(e) =>
                setFormData({ ...formData, storePhone: e.target.value })
              }
            />

            <TextField
              label="Endereço"
              fullWidth
              value={formData.storeAddress}
              onChange={(e) =>
                setFormData({ ...formData, storeAddress: e.target.value })
              }
            />

            <Divider />

            <Typography variant="h6" fontWeight={600}>
              Redes Sociais
            </Typography>

            <TextField
              label="Facebook URL"
              fullWidth
              value={formData.facebookUrl}
              onChange={(e) =>
                setFormData({ ...formData, facebookUrl: e.target.value })
              }
            />

            <TextField
              label="Instagram URL"
              fullWidth
              value={formData.instagramUrl}
              onChange={(e) =>
                setFormData({ ...formData, instagramUrl: e.target.value })
              }
            />

            <TextField
              label="Twitter URL"
              fullWidth
              value={formData.twitterUrl}
              onChange={(e) =>
                setFormData({ ...formData, twitterUrl: e.target.value })
              }
            />

            <TextField
              label="WhatsApp URL"
              fullWidth
              value={formData.whatsappUrl}
              onChange={(e) =>
                setFormData({ ...formData, whatsappUrl: e.target.value })
              }
            />

            <Divider />

            <Typography variant="h6" fontWeight={600}>
              Configurações Fiscais
            </Typography>

            <TextField
              label="CNPJ/CPF"
              fullWidth
              value={formData.taxId}
              onChange={(e) =>
                setFormData({ ...formData, taxId: e.target.value })
              }
            />

            <TextField
              label="Taxa de Imposto (%)"
              fullWidth
              type="number"
              inputProps={{ step: '0.01' }}
              value={formData.taxRate}
              onChange={(e) =>
                setFormData({ ...formData, taxRate: e.target.value })
              }
            />

            <Divider />

            <Typography variant="h6" fontWeight={600}>
              Configurações de Envio
            </Typography>

            <TextField
              label="Valor Mínimo para Frete Grátis (R$)"
              fullWidth
              type="number"
              inputProps={{ step: '0.01' }}
              value={formData.freeShippingMinValue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  freeShippingMinValue: e.target.value,
                })
              }
            />

            <TextField
              label="Custo Padrão de Envio (R$)"
              fullWidth
              type="number"
              inputProps={{ step: '0.01' }}
              value={formData.defaultShippingCost}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  defaultShippingCost: e.target.value,
                })
              }
            />

            <Divider />

            <Typography variant="h6" fontWeight={600}>
              Notificações
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.enableOrderNotifications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      enableOrderNotifications: e.target.checked,
                    })
                  }
                />
              }
              label="Notificações de Pedidos"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.enableCustomerNotifications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      enableCustomerNotifications: e.target.checked,
                    })
                  }
                />
              }
              label="Notificações de Clientes"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.enableLowStockAlerts}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      enableLowStockAlerts: e.target.checked,
                    })
                  }
                />
              }
              label="Alertas de Estoque Baixo"
            />

            <TextField
              label="Limite de Estoque Baixo"
              fullWidth
              type="number"
              value={formData.lowStockThreshold}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lowStockThreshold: e.target.value,
                })
              }
            />

            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={updateMutation.isPending}
                startIcon={
                  updateMutation.isPending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                Salvar Configurações
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}
