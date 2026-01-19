import { ReactElement, ReactNode } from 'react'
import Header from './Header'
import { Toaster } from 'sonner'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): Promise<ReactElement> {
  return (
    <>
      <Toaster richColors />
      <Header />
      <div className="flex flex-col items-center gap-y-6">{children}</div>
    </>
  )
}
