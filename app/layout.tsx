import type { Metadata } from 'next'
import './globals.css'

import { Bricolage_Grotesque, Inter } from 'next/font/google'
// Bricolage_Grotesque is a variable font – weight works automatically
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage'
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Jimmy's Dev Blog",
  description: 'Join me on my journey to become a software developer'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col font-body'>{children}</body>
    </html>
  )
}
