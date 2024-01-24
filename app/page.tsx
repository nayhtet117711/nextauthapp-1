'use client'

import { SessionProvider } from 'next-auth/react'
import { UserAvatar } from './components/UserAvatar';

export default function Home() {
  return (
    <SessionProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            NextJs + Next-Auth + Vercel/Postgres
          </p>
        </div>

        <div className="grow flex flex-column justify-center items-center">
          <UserAvatar />
        </div>

      </main>
    </SessionProvider>
  );
}
