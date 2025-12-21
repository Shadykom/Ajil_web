import type { Metadata } from 'next';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { Language } from '@/lib/i18n';
import ConsentBanner from '@/design-system/components/organisms/ConsentBanner/ConsentBanner';
import '../globals.css';

// Supported languages
export const supportedLanguages = ['ar', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

// Generate static params for all languages
export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

// Dynamic metadata based on language
export async function generateMetadata({
  params,
}: {
  params: { lang: SupportedLanguage };
}): Promise<Metadata> {
  const isArabic = params.lang === 'ar';

  return {
    metadataBase: new URL('https://ajil.com'),
    title: {
      default: isArabic ? 'أجل للتمويل | حلول تمويلية متوافقة مع الشريعة' : 'AJIL Finance | Sharia-Compliant Financing Solutions',
      template: isArabic ? '%s | أجل للتمويل' : '%s | AJIL Finance',
    },
    description: isArabic
      ? 'شركة أجل للتمويل - حلول تمويلية متوافقة مع الشريعة الإسلامية للأفراد والشركات في المملكة العربية السعودية'
      : 'AJIL Finance Company - Sharia-compliant financing solutions for individuals and businesses in Saudi Arabia',
    keywords: isArabic
      ? ['تمويل', 'سيارات', 'تمويل شخصي', 'تمويل أعمال', 'السعودية', 'أجل للتمويل', 'مرابحة', 'تمويل إسلامي']
      : ['financing', 'cars', 'personal loan', 'business financing', 'Saudi Arabia', 'AJIL', 'murabaha', 'islamic finance'],
    authors: [{ name: 'AJIL Finance' }],
    openGraph: {
      title: isArabic ? 'أجل للتمويل' : 'AJIL Finance',
      description: isArabic
        ? 'حلول تمويلية متوافقة مع الشريعة الإسلامية'
        : 'Sharia-compliant financing solutions',
      url: `https://ajil.com/${params.lang}`,
      siteName: 'AJIL Finance',
      locale: isArabic ? 'ar_SA' : 'en_SA',
      alternateLocale: isArabic ? 'en_SA' : 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic ? 'أجل للتمويل' : 'AJIL Finance',
      description: isArabic
        ? 'حلول تمويلية متوافقة مع الشريعة الإسلامية'
        : 'Sharia-compliant financing solutions',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://ajil.com/${params.lang}`,
      languages: {
        ar: 'https://ajil.com/ar',
        en: 'https://ajil.com/en',
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: SupportedLanguage };
}) {
  const isArabic = params.lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const defaultLanguage: Language = params.lang;

  return (
    <html lang={params.lang} dir={dir} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#00377B" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Alternate language links */}
        <link rel="alternate" hrefLang="ar" href="https://ajil.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://ajil.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://ajil.com/ar" />
      </head>
      <body className={`font-ge-ss antialiased ${isArabic ? 'text-right' : 'text-left'}`}>
        <I18nProvider defaultLanguage={defaultLanguage}>
          {children}
          {/* PDPL-Compliant Cookie Consent Banner */}
          <ConsentBanner
            privacyPolicyUrl={`/${params.lang}/privacy`}
            cookiePolicyUrl={`/${params.lang}/privacy#cookies`}
          />
        </I18nProvider>
      </body>
    </html>
  );
}
