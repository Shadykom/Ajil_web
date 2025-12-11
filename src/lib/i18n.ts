'use client'

import { createContext, useContext } from 'react'

export type Language = 'ar' | 'en'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: 'rtl' | 'ltr'
}

export const translations = {
  ar: {
    // Header
    'nav.individuals': 'الأفراد',
    'nav.business': 'الأعمال',
    'nav.offers': 'العروض',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'تسجيل الدخول',
    'nav.car_financing': 'تمويل السيارات',
    'nav.personal_financing': 'التمويل النقدي للأفراد',
    'nav.financing_rates': 'أسعار منتجات التمويل',
    'nav.cash_financing': 'التمويل النقدي',
    'nav.heavy_equipment': 'المعدات الثقيلة',
    'nav.our_story': 'قصتنا',
    'nav.news': 'الأخبار',
    'nav.financial_reports': 'التقارير المالية',

    // Hero
    'hero.badge': 'حلول تمويلية متوافقة مع الشريعة',
    'hero.title': 'نبني الثقة بتحقيق',
    'hero.title_highlight': 'أحلامك',
    'hero.description': 'التزامنا يتجاوز الأرقام؛ نؤمن بتمكينك من الثقة لتحقيق أحلامك مع حلول تمويلية مرنة ومتوافقة مع الشريعة الإسلامية',
    'hero.cta_primary': 'قدّم طلبك الآن',
    'hero.cta_secondary': 'اكتشف المزيد',
    'hero.calculator_title': 'حاسبة التمويل',
    'hero.tab_individuals': 'الأفراد',
    'hero.tab_business': 'الأعمال',
    'hero.financing_type': 'نوع التمويل',
    'hero.financing_type_car': 'تمويل السيارات',
    'hero.financing_type_cash': 'التمويل النقدي',
    'hero.financing_type_real_estate': 'التمويل العقاري',
    'hero.financing_amount': 'مبلغ التمويل (ريال)',
    'hero.financing_amount_placeholder': 'أدخل المبلغ المطلوب',
    'hero.financing_duration': 'مدة التمويل',
    'hero.calculate_btn': 'احسب القسط الشهري',
    'hero.months': 'شهر',

    // Services
    'services.badge': 'حلول الأفراد',
    'services.title': 'خدماتنا التمويلية',
    'services.description': 'نقدم مجموعة متكاملة من الحلول التمويلية المصممة لتلبية احتياجاتك',
    'services.car_title': 'تمويل السيارات',
    'services.car_desc': 'حلول تمويلية مرنة للسيارات الجديدة والمستعملة بأقساط ميسرة وفترات سداد متنوعة',
    'services.cash_title': 'التمويل النقدي',
    'services.cash_desc': 'تمويل نقدي سريع لتلبية احتياجاتك الشخصية بإجراءات سهلة وموافقة فورية',
    'services.business_title': 'تمويل الأعمال',
    'services.business_desc': 'حلول تمويلية متخصصة للشركات والمنشآت الصغيرة والمتوسطة لدعم نمو أعمالك',
    'services.apply_btn': 'قدّم طلبك',

    // Offers
    'offers.badge': 'العروض الحصرية',
    'offers.title': 'أحدث العروض',
    'offers.description': 'اكتشف عروضنا الحصرية على منتجات التمويل المتنوعة',
    'offers.discover_btn': 'اكتشف العرض',
    'offers.apply_btn': 'قدّم الآن',

    // Stats
    'stats.years': 'عاماً من الخبرة',
    'stats.customers': 'عميل سعيد',
    'stats.branches': 'فرع في المملكة',
    'stats.shariah': 'متوافق مع الشريعة',

    // News
    'news.badge': 'الأخبار',
    'news.title': 'آخر الأخبار',
    'news.description': 'تابع آخر أخبارنا ومستجداتنا',
    'news.read_more': 'اقرأ المزيد',
    'news.view_all': 'عرض جميع الأخبار',
    'news.category.awards': 'جوائز وإنجازات',
    'news.category.partnerships': 'شراكات',
    'news.category.services': 'خدمات جديدة',

    // App Section
    'app.title': 'حمّل تطبيقنا الآن',
    'app.description': 'احصل على تجربة مصرفية متكاملة من خلال تطبيقنا واستمتع بإدارة حساباتك بكل سهولة',
    'app.feature1': 'تقديم طلبات التمويل',
    'app.feature2': 'متابعة الأقساط',
    'app.feature3': 'إدارة الحساب',
    'app.feature4': 'عروض حصرية',
    'app.download_from': 'تحميل من',
    'app.app_store': 'App Store',
    'app.google_play': 'Google Play',

    // Newsletter
    'newsletter.title': 'اشترك في نشرتنا البريدية',
    'newsletter.description': 'كن على اطلاع بآخر العروض والأخبار من أجل للتمويل',
    'newsletter.placeholder': 'أدخل بريدك الإلكتروني',
    'newsletter.subscribe': 'اشترك الآن',
    'newsletter.success': 'شكراً لاشتراكك!',
    'newsletter.error': 'حدث خطأ، يرجى المحاولة مرة أخرى',

    // Footer
    'footer.about_text': 'شركة أجل للتمويل، رائدة في تقديم الحلول التمويلية المتوافقة مع الشريعة الإسلامية',
    'footer.individuals_financing': 'تمويل الأفراد',
    'footer.business_financing': 'تمويل الأعمال',
    'footer.contact_us': 'تواصل معنا',
    'footer.copyright': '© 2008-2025 شركة أجل للتمويل - سجل تجاري (4030206631) - خاضعة لإشراف ورقابة البنك المركزي السعودي',
    'footer.privacy_policy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',

    // Common
    'common.phone': '8002442211',
    'common.email': 'info@ajil.com',
    'common.address': 'جدة، المملكة العربية السعودية',
    'common.brand_name': 'أجل',
    'common.brand_suffix': 'للتمويل',
    'common.loading': 'جاري التحميل...',
  },
  en: {
    // Header
    'nav.individuals': 'Individuals',
    'nav.business': 'Business',
    'nav.offers': 'Offers',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.login': 'Login',
    'nav.car_financing': 'Car Financing',
    'nav.personal_financing': 'Personal Cash Financing',
    'nav.financing_rates': 'Financing Product Rates',
    'nav.cash_financing': 'Cash Financing',
    'nav.heavy_equipment': 'Heavy Equipment',
    'nav.our_story': 'Our Story',
    'nav.news': 'News',
    'nav.financial_reports': 'Financial Reports',

    // Hero
    'hero.badge': 'Sharia-Compliant Financing Solutions',
    'hero.title': 'Building Trust to Achieve Your',
    'hero.title_highlight': 'Dreams',
    'hero.description': 'Our commitment goes beyond numbers; we believe in empowering you with confidence to achieve your dreams through flexible, Sharia-compliant financing solutions',
    'hero.cta_primary': 'Apply Now',
    'hero.cta_secondary': 'Learn More',
    'hero.calculator_title': 'Financing Calculator',
    'hero.tab_individuals': 'Individuals',
    'hero.tab_business': 'Business',
    'hero.financing_type': 'Financing Type',
    'hero.financing_type_car': 'Car Financing',
    'hero.financing_type_cash': 'Cash Financing',
    'hero.financing_type_real_estate': 'Real Estate Financing',
    'hero.financing_amount': 'Financing Amount (SAR)',
    'hero.financing_amount_placeholder': 'Enter the required amount',
    'hero.financing_duration': 'Financing Duration',
    'hero.calculate_btn': 'Calculate Monthly Payment',
    'hero.months': 'months',

    // Services
    'services.badge': 'Individual Solutions',
    'services.title': 'Our Financing Services',
    'services.description': 'We offer a comprehensive range of financing solutions designed to meet your needs',
    'services.car_title': 'Car Financing',
    'services.car_desc': 'Flexible financing solutions for new and used cars with easy installments and various repayment periods',
    'services.cash_title': 'Cash Financing',
    'services.cash_desc': 'Quick cash financing to meet your personal needs with easy procedures and instant approval',
    'services.business_title': 'Business Financing',
    'services.business_desc': 'Specialized financing solutions for companies and SMEs to support your business growth',
    'services.apply_btn': 'Apply Now',

    // Offers
    'offers.badge': 'Exclusive Offers',
    'offers.title': 'Latest Offers',
    'offers.description': 'Discover our exclusive offers on various financing products',
    'offers.discover_btn': 'Discover Offer',
    'offers.apply_btn': 'Apply Now',

    // Stats
    'stats.years': 'Years of Experience',
    'stats.customers': 'Happy Customers',
    'stats.branches': 'Branches in Kingdom',
    'stats.shariah': 'Sharia Compliant',

    // News
    'news.badge': 'News',
    'news.title': 'Latest News',
    'news.description': 'Follow our latest news and updates',
    'news.read_more': 'Read More',
    'news.view_all': 'View All News',
    'news.category.awards': 'Awards & Achievements',
    'news.category.partnerships': 'Partnerships',
    'news.category.services': 'New Services',

    // App Section
    'app.title': 'Download Our App Now',
    'app.description': 'Get a complete banking experience through our app and enjoy managing your accounts with ease',
    'app.feature1': 'Submit Financing Applications',
    'app.feature2': 'Track Installments',
    'app.feature3': 'Account Management',
    'app.feature4': 'Exclusive Offers',
    'app.download_from': 'Download from',
    'app.app_store': 'App Store',
    'app.google_play': 'Google Play',

    // Newsletter
    'newsletter.title': 'Subscribe to Our Newsletter',
    'newsletter.description': 'Stay updated with the latest offers and news from AJIL Finance',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe Now',
    'newsletter.success': 'Thank you for subscribing!',
    'newsletter.error': 'An error occurred, please try again',

    // Footer
    'footer.about_text': 'AJIL Finance Company, a pioneer in providing Sharia-compliant financing solutions',
    'footer.individuals_financing': 'Individual Financing',
    'footer.business_financing': 'Business Financing',
    'footer.contact_us': 'Contact Us',
    'footer.copyright': '© 2008-2025 AJIL Finance Company - CR (4030206631) - Licensed by Saudi Central Bank',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',

    // Common
    'common.phone': '8002442211',
    'common.email': 'info@ajil.com',
    'common.address': 'Jeddah, Saudi Arabia',
    'common.brand_name': 'AJIL',
    'common.brand_suffix': 'Finance',
    'common.loading': 'Loading...',
  },
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
