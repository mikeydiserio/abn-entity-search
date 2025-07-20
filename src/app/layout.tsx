import type { Metadata } from 'next'
import StyledComponentsRegistry from '../styling/StyledComponentsRegistry'
import './globals.css'

export const metadata: Metadata = {
  title: 'AU Business Finder',
  description: 'Australian Companies Register Search',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {/* <ThemeProvider theme={theme}>{children}</ThemeProvider> */}
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
