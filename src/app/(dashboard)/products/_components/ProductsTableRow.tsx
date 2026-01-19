'use client'

import { Stack, Avatar, Box, Typography } from '@mui/material'
import Link from 'next/link'
import ProductsStatusBadge from './ProductsStatusBadge'
import ProductsTableRowActionsMenu from './ProductsTableRowActionsMenu'
import { TableCell, TableRow } from '@/components/ui/table/components'
import { Product } from '@/types/product'

type Props = {
  product: Product
}

export default function ProductsTableRow({ product }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/product/${product.id}/edit`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              variant="rounded"
              src={product.image || undefined}
              alt={product.name}
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                bgcolor: product.image ? 'transparent' : '#F0F0F0',
                border: product.image ? 'none' : '1px solid #D0D0D0',
                objectFit: 'cover',
                img: {
                  objectFit: 'cover',
                },
              }}
            >
              {!product.image && (
                <img
                  src="/no-image-product.jpg"
                  alt="Sem foto"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                    objectFit: 'cover',
                  }}
                />
              )}
            </Avatar>

            <Box>
              <Typography variant="body2">{product.name}</Typography>

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                SKU: #{product.id}
              </Typography>
            </Box>
          </Stack>
        </Link>
      </TableCell>

      <TableCell>{product.brand}</TableCell>

      <TableCell>{product.category}</TableCell>

      <TableCell>{product.quantity}</TableCell>

      <TableCell>
        <ProductsStatusBadge status={product.status} />
      </TableCell>

      <TableCell>R$ {product.price}</TableCell>

      <TableCell>
        <ProductsTableRowActionsMenu product={product} />
      </TableCell>
    </TableRow>
  )
}
