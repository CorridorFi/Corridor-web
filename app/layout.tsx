import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { PrivyProvider } from '@privy-io/react-auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'Corridor',
  description: 'Pay Your Team. Grow Your Wealth. Automatically. The only payroll platform with built-in DeFi investing.',
  generator: 'corridor.app',
  icons: {
    icon: '/favicon.ico'
  }
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
