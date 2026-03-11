import { AppProviders } from '@/providers/AppProviders'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  metadataBase: new URL('https://ecommerce-dashboard-rho-seven.vercel.app'),
  title: {
    default: 'Admin Dashboard | E-commerce',
    template: '%s | Admin Dashboard',
  },
  description:
    'Painel administrativo para gestao de pedidos, produtos, clientes, categorias e marcas de um e-commerce.',
  applicationName: 'Admin Dashboard',
  keywords: [
    'dashboard',
    'e-commerce',
    'painel administrativo',
    'gestao de pedidos',
    'gestao de produtos',
    'next.js',
  ],
  openGraph: {
    title: 'Admin Dashboard | E-commerce',
    description:
      'Gerencie pedidos, produtos, clientes, categorias e configuracoes em um unico painel.',
    url: '/',
    siteName: 'Admin Dashboard',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard | E-commerce',
    description:
      'Painel administrativo de e-commerce com Next.js, Prisma e Supabase.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={roboto.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
