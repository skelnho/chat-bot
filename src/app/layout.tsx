import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import './globals.css'
import StyledComponentsRegistry from '../lib/registry'


export const metadata: Metadata = {
  title: 'Chatbot',
  description: 'Ask me anything',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
