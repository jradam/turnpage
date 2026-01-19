'use client'

import { cn } from '@/utilities/helpers'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Route } from 'next'
import { useRouter } from 'next/dist/client/components/navigation'
import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'

// This always looks like a link, but can act like a
// button - depends if you pass an 'href' or an 'action'

type Props = {
  children: ReactNode
  className?: string
  dark?: true
  back?: true
  forward?: true
  noTab?: true
} & ({ href: Route; action?: never } | { action: () => void; href?: never })
export default function NavLink(props: Props): ReactElement {
  const { children, className, href, action, dark, back, forward, noTab } =
    props
  const router = useRouter()

  const classes = cn(
    'flex cursor-pointer font-semibold transition-colors duration-200',
    dark
      ? 'text-darkest hover:text-black'
      : 'text-highlight hover:text-lowlight',
    className,
  )

  const contents = (
    <>
      {back ? <ChevronLeftIcon className="-mr-0.5 -ml-2 size-6 pt-px" /> : null}
      {children}
      {forward ? (
        <ChevronRightIcon className="-mr-2 -ml-0.5 size-6 pt-px" />
      ) : null}
    </>
  )

  return href ? (
    <Link href={href} className={classes} tabIndex={noTab && -1}>
      {contents}
    </Link>
  ) : (
    <button
      onClick={action || router.back}
      className={classes}
      tabIndex={noTab && -1}
    >
      {contents}
    </button>
  )
}
