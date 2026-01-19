import type { Metadata } from 'next'
import { Caveat, Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { ReactElement, ReactNode } from 'react'
import { cn } from '@/utilities/helpers'

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Turnpage',
  description: 'Perfect websites, just for authors.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): ReactElement {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.variable,
          caveat.variable,
          'mx-auto h-full max-w-6xl bg-lightest font-inter antialiased',
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
