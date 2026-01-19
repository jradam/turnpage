import Logo from '@/assets/Logo'
import { ReactElement } from 'react'
import Button from '@/components/Button'
import NavLink from '@/components/NavLink'

export default async function Home(): Promise<ReactElement> {
  return (
    <>
      <div className="relative z-10 h-full pb-20">
        <nav className="flex gap-x-6 px-8 py-6">
          <NavLink href="/contact" className="ml-auto">
            Contact
          </NavLink>
          <NavLink href="/login" forward>
            Log in
          </NavLink>
        </nav>

        <main className="flex h-4/5 flex-col items-center justify-center gap-y-6">
          <Logo />
          <h2 className="max-w-96 text-center text-lg font-medium text-balance">
            Level up your online presence with a perfect website - just for
            authors.
          </h2>
          <div className="flex items-center gap-x-5">
            <Button className="font-bold">Join the waitlist</Button>
            <NavLink href="/" dark forward>
              Learn more
            </NavLink>
          </div>
        </main>
      </div>
    </>
  )
}
