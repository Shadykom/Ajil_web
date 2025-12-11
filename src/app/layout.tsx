import type { Metadata } from 'next'
import { I18nProvider } from '@/components/providers/I18nProvider'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ajil.com'),
  title: 'أجل للتمويل | AJIL Finance',
  description: 'شركة أجل للتمويل - حلول تمويلية متوافقة مع الشريعة الإسلامية | AJIL Finance Company - Sharia-compliant financing solutions',
  keywords: 'تمويل, سيارات, تمويل شخصي, تمويل أعمال, السعودية, أجل للتمويل, AJIL, financing, cars, personal loan, business financing, Saudi Arabia',
  authors: [{ name: 'AJIL Finance' }],
  openGraph: {
    title: 'أجل للتمويل | AJIL Finance',
    description: 'حلول تمويلية متوافقة مع الشريعة الإسلامية',
    url: 'https://ajil.com',
    siteName: 'AJIL Finance',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أجل للتمويل',
    description: 'حلول تمويلية متوافقة مع الشريعة الإسلامية',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0066b3" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-cairo antialiased">
        <I18nProvider defaultLanguage="ar">
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
