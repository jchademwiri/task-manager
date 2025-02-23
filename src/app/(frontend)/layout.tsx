import React from 'react'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <header className="container mx-auto p-4">
          <Link href="/"> Home </Link>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
