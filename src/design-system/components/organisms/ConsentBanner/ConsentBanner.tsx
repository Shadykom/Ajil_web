'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings, Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Button } from '../../atoms/Button/Button';

export interface ConsentCategory {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  required?: boolean;
  defaultEnabled?: boolean;
}

export interface ConsentBannerProps {
  /** Privacy policy URL */
  privacyPolicyUrl?: string;
  /** Cookie policy URL */
  cookiePolicyUrl?: string;
  /** Callback when consent is given */
  onAcceptAll?: (categories: Record<string, boolean>) => void;
  /** Callback when consent is rejected */
  onRejectAll?: () => void;
  /** Callback when custom consent is saved */
  onSavePreferences?: (categories: Record<string, boolean>) => void;
  /** Custom consent categories */
  categories?: ConsentCategory[];
  /** Custom class name */
  className?: string;
}

// Default PDPL-compliant consent categories
const defaultCategories: ConsentCategory[] = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    nameAr: 'ملفات تعريف الارتباط الأساسية',
    description: 'Required for the website to function properly. Cannot be disabled.',
    descriptionAr: 'مطلوبة لعمل الموقع بشكل صحيح. لا يمكن تعطيلها.',
    required: true,
    defaultEnabled: true,
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    nameAr: 'ملفات تعريف الارتباط التحليلية',
    description: 'Help us understand how visitors interact with our website.',
    descriptionAr: 'تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا.',
    required: false,
    defaultEnabled: false,
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    nameAr: 'ملفات تعريف الارتباط التسويقية',
    description: 'Used to deliver personalized advertisements.',
    descriptionAr: 'تُستخدم لتقديم إعلانات مخصصة.',
    required: false,
    defaultEnabled: false,
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    nameAr: 'ملفات تعريف الارتباط الوظيفية',
    description: 'Enable enhanced functionality and personalization.',
    descriptionAr: 'تمكّن الوظائف المحسّنة والتخصيص.',
    required: false,
    defaultEnabled: false,
  },
];

// Consent storage key
const CONSENT_STORAGE_KEY = 'ajil_cookie_consent';

export function ConsentBanner({
  privacyPolicyUrl = '/privacy',
  cookiePolicyUrl = '/privacy#cookies',
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  categories = defaultCategories,
  className,
}: ConsentBannerProps) {
  const { language, dir } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      initial[cat.id] = cat.required || cat.defaultEnabled || false;
    });
    return initial;
  });

  // Check if consent has been given
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed.preferences || {});
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  // Save consent to localStorage and log for audit
  const saveConsent = (prefs: Record<string, boolean>, action: string) => {
    const consentData = {
      preferences: prefs,
      timestamp: new Date().toISOString(),
      action,
      version: '1.0',
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    
    // Log consent for audit trail (would be sent to backend in production)
    console.log('[PDPL Consent Log]', consentData);
  };

  const handleAcceptAll = () => {
    const allEnabled: Record<string, boolean> = {};
    categories.forEach((cat) => {
      allEnabled[cat.id] = true;
    });
    setPreferences(allEnabled);
    saveConsent(allEnabled, 'accept_all');
    setIsVisible(false);
    onAcceptAll?.(allEnabled);
  };

  const handleRejectAll = () => {
    const onlyRequired: Record<string, boolean> = {};
    categories.forEach((cat) => {
      onlyRequired[cat.id] = cat.required || false;
    });
    setPreferences(onlyRequired);
    saveConsent(onlyRequired, 'reject_all');
    setIsVisible(false);
    onRejectAll?.();
  };

  const handleSavePreferences = () => {
    saveConsent(preferences, 'custom');
    setIsVisible(false);
    setShowPreferences(false);
    onSavePreferences?.(preferences);
  };

  const togglePreference = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category?.required) return;
    
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop for preferences modal */}
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9998]"
              onClick={() => setShowPreferences(false)}
            />
          )}

          {/* Main Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-[9999]',
              'bg-white dark:bg-neutral-900',
              'border-t border-neutral-200 dark:border-neutral-800',
              'shadow-2xl',
              className
            )}
            dir={dir}
          >
            {/* Preferences Panel */}
            <AnimatePresence>
              {showPreferences && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
                >
                  <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-primary-800 dark:text-primary-100 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary-500" />
                        {language === 'ar' ? 'إعدادات ملفات تعريف الارتباط' : 'Cookie Preferences'}
                      </h3>
                      <button
                        onClick={() => setShowPreferences(false)}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        aria-label="Close preferences"
                      >
                        <X className="w-5 h-5 text-neutral-500" />
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className={cn(
                            'p-4 rounded-xl border transition-colors',
                            preferences[category.id]
                              ? 'border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                              : 'border-neutral-200 dark:border-neutral-700'
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-primary-800 dark:text-primary-100">
                                {language === 'ar' ? category.nameAr : category.name}
                              </h4>
                              <p className="text-sm text-primary-500 dark:text-primary-400 mt-1">
                                {language === 'ar' ? category.descriptionAr : category.description}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences[category.id]}
                                onChange={() => togglePreference(category.id)}
                                disabled={category.required}
                                className="sr-only peer"
                              />
                              <div className={cn(
                                'w-11 h-6 rounded-full',
                                'bg-neutral-200 dark:bg-neutral-700',
                                'peer-checked:bg-primary-500',
                                'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
                                'after:content-[""] after:absolute after:top-0.5 after:left-0.5',
                                'after:w-5 after:h-5 after:rounded-full',
                                'after:bg-white after:shadow-md',
                                'after:transition-transform',
                                'peer-checked:after:translate-x-5',
                                'rtl:peer-checked:after:-translate-x-5'
                              )} />
                            </label>
                          </div>
                          {category.required && (
                            <span className="inline-block mt-2 text-xs text-neutral-400">
                              {language === 'ar' ? 'مطلوب' : 'Required'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleSavePreferences}>
                        {language === 'ar' ? 'حفظ التفضيلات' : 'Save Preferences'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                {/* Icon & Text */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 shrink-0">
                    <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h2 className="font-bold text-primary-800 dark:text-primary-100 mb-1">
                      {language === 'ar' 
                        ? 'نحن نستخدم ملفات تعريف الارتباط' 
                        : 'We use cookies'}
                    </h2>
                    <p className="text-sm text-primary-600 dark:text-primary-400 max-w-2xl">
                      {language === 'ar'
                        ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع. وفقاً لنظام حماية البيانات الشخصية (PDPL)، نحتاج موافقتك لاستخدام بعض هذه الملفات.'
                        : 'We use cookies to enhance your experience and analyze site usage. In accordance with PDPL, we need your consent for certain cookies.'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <Link
                        href={privacyPolicyUrl}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1"
                      >
                        <Shield className="w-4 h-4" />
                        {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                      </Link>
                      <Link
                        href={cookiePolicyUrl}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {language === 'ar' ? 'سياسة الكوكيز' : 'Cookie Policy'}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPreferences(!showPreferences)}
                    className="order-3 sm:order-1"
                  >
                    <Settings className="w-4 h-4" />
                    {language === 'ar' ? 'تخصيص' : 'Customize'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="order-2"
                  >
                    {language === 'ar' ? 'رفض الكل' : 'Reject All'}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAcceptAll}
                    className="order-1 sm:order-3"
                  >
                    {language === 'ar' ? 'قبول الكل' : 'Accept All'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Utility hook to check consent status
export function useConsent() {
  const [consent, setConsent] = useState<Record<string, boolean> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConsent(parsed.preferences);
      } catch {
        setConsent(null);
      }
    }
  }, []);

  const hasConsent = (category: string): boolean => {
    return consent?.[category] ?? false;
  };

  const withdrawConsent = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setConsent(null);
    window.location.reload();
  };

  return { consent, hasConsent, withdrawConsent };
}

export default ConsentBanner;
