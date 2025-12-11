'use client'

import { useState, useCallback, useEffect, ReactNode } from 'react'
import { I18nContext, Language, translations } from '@/lib/i18n'

interface I18nProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function I18nProvider({ children, defaultLanguage = 'ar' }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    // Get language from localStorage or browser
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Update document direction and lang
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const t = useCallback(
    (key: string): string => {
      return translations[language][key as keyof (typeof translations)['ar']] || key
    },
    [language]
  )

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}
