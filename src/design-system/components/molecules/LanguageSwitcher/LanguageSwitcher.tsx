'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n, Language } from '@/lib/i18n';

export type LanguageSwitcherVariant = 'button' | 'dropdown' | 'toggle' | 'minimal';

export interface LanguageSwitcherProps {
  /** Switcher variant */
  variant?: LanguageSwitcherVariant;
  /** Custom class name */
  className?: string;
  /** Show full language names */
  showFullName?: boolean;
  /** Show flag icons */
  showFlags?: boolean;
  /** Callback on language change */
  onLanguageChange?: (lang: Language) => void;
}

const languages = [
  { code: 'ar' as const, name: 'العربية', shortName: 'عربي', flag: '🇸🇦' },
  { code: 'en' as const, name: 'English', shortName: 'EN', flag: '🇬🇧' },
];

export function LanguageSwitcher({
  variant = 'button',
  className,
  showFullName = false,
  showFlags = false,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { language, setLanguage, dir } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((l) => l.code === language) || languages[0];
  const otherLanguage = languages.find((l) => l.code !== language) || languages[1];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    onLanguageChange?.(lang);
    setIsOpen(false);
  };

  // Toggle variant - simple switch between languages
  if (variant === 'toggle') {
    return (
      <motion.button
        onClick={() => handleLanguageChange(otherLanguage.code)}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
          'text-white font-medium text-sm',
          'transition-colors duration-200',
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4" />
        <span>{showFullName ? otherLanguage.name : otherLanguage.shortName}</span>
      </motion.button>
    );
  }

  // Minimal variant - just text link
  if (variant === 'minimal') {
    return (
      <button
        onClick={() => handleLanguageChange(otherLanguage.code)}
        className={cn(
          'text-sm font-medium hover:opacity-80 transition-opacity',
          className
        )}
      >
        {showFlags && <span className="mr-1">{otherLanguage.flag}</span>}
        {showFullName ? otherLanguage.name : otherLanguage.shortName}
      </button>
    );
  }

  // Button variant - simple styled button
  if (variant === 'button') {
    return (
      <motion.button
        onClick={() => handleLanguageChange(otherLanguage.code)}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-xl',
          'border-2 border-primary-500/20',
          'bg-white hover:bg-primary-50',
          'text-primary-600 font-semibold text-sm',
          'transition-all duration-200',
          className
        )}
        whileHover={{ scale: 1.02, borderColor: 'rgba(0, 102, 179, 0.4)' }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4" />
        <span>{showFullName ? otherLanguage.name : otherLanguage.shortName}</span>
      </motion.button>
    );
  }

  // Dropdown variant - full dropdown menu
  return (
    <div className={cn('relative', className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-xl',
          'bg-white border border-neutral-200',
          'hover:border-primary-300 hover:bg-primary-50',
          'text-neutral-700 font-medium text-sm',
          'transition-all duration-200',
          isOpen && 'border-primary-500 bg-primary-50'
        )}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4 text-primary-500" />
        {showFlags && <span>{currentLanguage.flag}</span>}
        <span>{showFullName ? currentLanguage.name : currentLanguage.shortName}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-neutral-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute top-full mt-2 z-50',
                'min-w-[160px] w-full',
                'bg-white rounded-xl shadow-lg border border-neutral-200',
                'overflow-hidden',
                dir === 'rtl' ? 'right-0' : 'left-0'
              )}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3',
                    'text-left rtl:text-right',
                    'transition-colors duration-150',
                    lang.code === language
                      ? 'bg-primary-50 text-primary-700'
                      : 'hover:bg-neutral-50 text-neutral-700'
                  )}
                >
                  {showFlags && <span className="text-lg">{lang.flag}</span>}
                  <span className="flex-1 font-medium">{lang.name}</span>
                  {lang.code === language && (
                    <Check className="w-4 h-4 text-primary-500" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;
