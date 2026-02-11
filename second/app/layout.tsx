import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cinzel } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _cinzel = Cinzel({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upside Down Security',
  description: 'Detect the threats from the other side. Advanced phishing detection and security analysis.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
