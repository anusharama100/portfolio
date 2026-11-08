import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../portfolio/styles.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anusha Ramachandran | Product Designer + Engineer',
  description: 'Product designer and engineer combining product thinking, React, TypeScript, and frontend development to build clear interfaces and interactive prototypes.',
  openGraph: {
    title: 'Anusha Ramachandran | Product Designer + Engineer',
    description: 'Product designer and engineer combining product thinking, React, TypeScript, and frontend development to build clear interfaces and interactive prototypes.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,800;1,6..96,400;1,6..96,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
