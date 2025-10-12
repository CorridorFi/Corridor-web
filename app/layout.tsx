import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { PrivyProvider } from '@privy-io/react-auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'Corridor - Pay Your Team. Grow Your Wealth. Automatically.',
  description: 'The only payroll platform with built-in DeFi investing. Unify global payroll and peer-to-peer transfers on a single, secure platform.',
  generator: 'corridor.app',
  icons: {
    icon: '/favicon.ico'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corridor - Pay Your Team. Grow Your Wealth. Automatically.',
    description: 'The only payroll platform with built-in DeFi investing. Unify global payroll and peer-to-peer transfers.',
    images: ['https://corridor.app/corridor-landing.png'],
    creator: '@CorridorFi',
    site: '@CorridorFi',
  },
  openGraph: {
    title: 'Corridor - Pay Your Team. Grow Your Wealth. Automatically.',
    description: 'The only payroll platform with built-in DeFi investing. Unify global payroll and peer-to-peer transfers.',
    url: 'https://corridor.app',
    siteName: 'Corridor',
    images: [
      {
        url: 'https://corridor.app/corridor-landing.png',
        width: 1200,
        height: 630,
        alt: 'Corridor - Modern Payroll Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
