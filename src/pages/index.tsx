import Head from 'next/head'
import Image from 'next/image'
import Hero from 'public/hero.jpeg'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { button } from '@/theme'

export default function Home() {
  const { status, data } = useSession()
  const { openConnectModal } = useConnectModal()

  return (
    <>
      <Head>
        <title>Typeform Handler</title>
        <meta name="description" content="Typeform Handler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <div className="relative flex h-full w-full flex-1 p-12 pt-8">
        <div className="relative inset-0 z-[1] flex flex-1 flex-col items-center justify-center">
          <h1 className="text-center font-inter text-[72px] font-black leading-[86px]">
            Welcome to <br /> Typeform Handler
          </h1>
          <p className="mb-10 mt-8">
            {status === 'authenticated'
              ? `Hey, Welcome 
              ${data?.user?.name?.slice(0, 4)}...${data?.user?.name?.slice(-4)}`
              : 'You need to connect your wallet to manage your typeform submissions.'}
          </p>
          {status === 'authenticated' ? (
            <Link href="/dashboard" className={button}>
              Dashboard
            </Link>
          ) : (
            <button className={button} onClick={openConnectModal}>
              Connect
            </button>
          )}
        </div>
        <Image
          src={Hero}
          alt="Hero cover"
          className="absolute inset-0 z-[0] object-contain"
        />
      </div>
    </>
  )
}
