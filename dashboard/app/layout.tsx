import { SessionProvider } from '@/providers/SessionProvider'
import { cn } from '@/utilities/helpers'
import type { Metadata } from 'next'
import { Caveat, Inter } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'
import './globals.css'

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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
