import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Logo from './logo'

export default function Header() {
  const { status } = useSession()

  return (
    <div className="flex h-[100px] items-center justify-between border-b-[1px] border-[#d3d7e4] border-opacity-50 bg-[#0b0b0d] py-5 px-8">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex space-x-2">
        {status === 'authenticated' ? (
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-[4px] bg-primary px-4 font-bold hover:scale-[1.03]"
          >
            Dashboard
          </Link>
        ) : null}
        <ConnectButton
          showBalance={{ smallScreen: false, largeScreen: true }}
        />
      </div>
    </div>
  )
}
