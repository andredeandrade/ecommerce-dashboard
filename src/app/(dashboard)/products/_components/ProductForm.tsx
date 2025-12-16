'use client'

import { Box, Grid } from '@mui/material'
import ProductGeneralInfo from './ProductGeneralInfo'
import ProductMedia from './ProductMedia'
import ProductPrices from './ProductPrices'
import ProductInventory from './ProductInventory'
import ProductSEO from './ProductSEO'
import ProductClassification from './ProductClassification'
import ProductFormActions from './ProductFormActions'

export default function ProductForm() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <ProductGeneralInfo />
            </Grid>

            <Grid size={12}>
              <ProductMedia />
            </Grid>

            <Grid size={12}>
              <ProductPrices />
            </Grid>

            <Grid size={12}>
              <ProductInventory />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <ProductSEO />
            </Grid>

            <Grid size={12}>
              <ProductClassification />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ProductFormActions />
    </Box>
  )
}
