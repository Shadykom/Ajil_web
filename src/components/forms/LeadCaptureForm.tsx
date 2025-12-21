'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  Mail,
  CreditCard,
  Building,
  DollarSign,
  Calendar,
  FileText,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Shield,
} from 'lucide-react';
import { cn, validateEmail, validateSaudiPhone, validateSaudiNationalId, generateReferenceNumber } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/design-system/components/atoms/Button/Button';
import Input from '@/design-system/components/atoms/Input/Input';
import FormField from '@/design-system/components/molecules/FormField/FormField';
import { Badge } from '@/design-system/components/atoms/Badge/Badge';
import { DisclosureBlock } from '@/design-system/components/organisms/DisclosureBlock/DisclosureBlock';
import { formEvents, conversionEvents } from '@/lib/analytics/tracking';

// Form Types
export type FormType = 'apply' | 'contact' | 'complaint' | 'inquiry';

// Form Step Interface
interface FormStep {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  fields: string[];
}

// Form Data Interface
export interface LeadFormData {
  // Personal Info
  fullName: string;
  nationalId: string;
  dateOfBirth?: string;
  nationality?: string;
  // Contact
  phone: string;
  email: string;
  // Employment
  employmentType?: 'government' | 'private' | 'self_employed' | 'retired';
  employer?: string;
  monthlyIncome?: number;
  // Financing
  financingType?: string;
  requestedAmount?: number;
  tenure?: number;
  // Additional
  message?: string;
  subject?: string;
  // Consent
  consentMarketing: boolean;
  consentTerms: boolean;
  consentPDPL: boolean;
}

// Initial form data
const initialFormData: LeadFormData = {
  fullName: '',
  nationalId: '',
  phone: '',
  email: '',
  consentMarketing: false,
  consentTerms: false,
  consentPDPL: false,
};

// Form Props
export interface LeadCaptureFormProps {
  /** Form type */
  type?: FormType;
  /** Pre-selected financing type */
  defaultFinancingType?: string;
  /** Pre-filled amount from calculator */
  defaultAmount?: number;
  /** Pre-filled tenure from calculator */
  defaultTenure?: number;
  /** On submit callback */
  onSubmit?: (data: LeadFormData, referenceNumber: string) => Promise<void>;
  /** On success callback */
  onSuccess?: (referenceNumber: string) => void;
  /** Custom class name */
  className?: string;
  /** Show in modal mode */
  modal?: boolean;
}

// Form steps configuration
const formSteps: Record<FormType, FormStep[]> = {
  apply: [
    {
      id: 'personal',
      title: 'Personal Information',
      titleAr: 'المعلومات الشخصية',
      description: 'Enter your basic information',
      descriptionAr: 'أدخل معلوماتك الأساسية',
      fields: ['fullName', 'nationalId', 'phone', 'email'],
    },
    {
      id: 'employment',
      title: 'Employment Details',
      titleAr: 'معلومات العمل',
      description: 'Tell us about your employment',
      descriptionAr: 'أخبرنا عن عملك',
      fields: ['employmentType', 'employer', 'monthlyIncome'],
    },
    {
      id: 'financing',
      title: 'Financing Request',
      titleAr: 'طلب التمويل',
      description: 'Specify your financing needs',
      descriptionAr: 'حدد احتياجاتك التمويلية',
      fields: ['financingType', 'requestedAmount', 'tenure'],
    },
    {
      id: 'consent',
      title: 'Terms & Consent',
      titleAr: 'الشروط والموافقة',
      fields: ['consentTerms', 'consentPDPL', 'consentMarketing'],
    },
  ],
  contact: [
    {
      id: 'contact',
      title: 'Contact Us',
      titleAr: 'تواصل معنا',
      fields: ['fullName', 'phone', 'email', 'subject', 'message', 'consentPDPL'],
    },
  ],
  complaint: [
    {
      id: 'complaint',
      title: 'Submit Complaint',
      titleAr: 'تقديم شكوى',
      description: 'We take your concerns seriously',
      descriptionAr: 'نحن نأخذ مخاوفك على محمل الجد',
      fields: ['fullName', 'nationalId', 'phone', 'email', 'subject', 'message', 'consentPDPL'],
    },
  ],
  inquiry: [
    {
      id: 'inquiry',
      title: 'General Inquiry',
      titleAr: 'استفسار عام',
      fields: ['fullName', 'phone', 'email', 'financingType', 'message', 'consentPDPL'],
    },
  ],
};

// Financing types
const financingTypes = [
  { value: 'personal', label: 'Personal Financing', labelAr: 'تمويل شخصي' },
  { value: 'auto', label: 'Auto Financing', labelAr: 'تمويل سيارات' },
  { value: 'sme', label: 'SME Financing', labelAr: 'تمويل منشآت' },
  { value: 'equipment', label: 'Equipment Financing', labelAr: 'تمويل معدات' },
];

// Employment types
const employmentTypes = [
  { value: 'government', label: 'Government', labelAr: 'قطاع حكومي' },
  { value: 'private', label: 'Private Sector', labelAr: 'قطاع خاص' },
  { value: 'self_employed', label: 'Self Employed', labelAr: 'أعمال حرة' },
  { value: 'retired', label: 'Retired', labelAr: 'متقاعد' },
];

export function LeadCaptureForm({
  type = 'apply',
  defaultFinancingType,
  defaultAmount,
  defaultTenure,
  onSubmit,
  onSuccess,
  className,
  modal = false,
}: LeadCaptureFormProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';
  const ArrowNext = isRtl ? ChevronLeft : ChevronRight;
  const ArrowPrev = isRtl ? ChevronRight : ChevronLeft;

  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<LeadFormData>({
    ...initialFormData,
    financingType: defaultFinancingType,
    requestedAmount: defaultAmount,
    tenure: defaultTenure,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  const steps = formSteps[type];
  const currentStepData = steps[currentStep];

  // Update field
  const updateField = useCallback((field: keyof LeadFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Validate step
  const validateStep = useCallback((stepIndex: number): boolean => {
    const step = steps[stepIndex];
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    step.fields.forEach((field) => {
      const value = formData[field as keyof LeadFormData];

      switch (field) {
        case 'fullName':
          if (!value || (value as string).length < 3) {
            newErrors.fullName = language === 'ar' 
              ? 'يرجى إدخال الاسم الكامل' 
              : 'Please enter your full name';
          }
          break;
        case 'nationalId':
          if (!validateSaudiNationalId(value as string)) {
            newErrors.nationalId = language === 'ar'
              ? 'رقم الهوية غير صحيح'
              : 'Invalid National ID';
          }
          break;
        case 'phone':
          if (!validateSaudiPhone(value as string)) {
            newErrors.phone = language === 'ar'
              ? 'رقم الجوال غير صحيح'
              : 'Invalid phone number';
          }
          break;
        case 'email':
          if (!validateEmail(value as string)) {
            newErrors.email = language === 'ar'
              ? 'البريد الإلكتروني غير صحيح'
              : 'Invalid email address';
          }
          break;
        case 'monthlyIncome':
          if (!value || (value as number) < 4000) {
            newErrors.monthlyIncome = language === 'ar'
              ? 'الحد الأدنى للدخل 4000 ريال'
              : 'Minimum income is 4,000 SAR';
          }
          break;
        case 'consentTerms':
        case 'consentPDPL':
          if (!value) {
            newErrors[field as keyof LeadFormData] = language === 'ar'
              ? 'يجب الموافقة للمتابعة'
              : 'You must agree to continue';
          }
          break;
        case 'message':
          if (step.fields.includes('message') && (!value || (value as string).length < 10)) {
            newErrors.message = language === 'ar'
              ? 'يرجى كتابة رسالتك (10 أحرف على الأقل)'
              : 'Please write your message (min 10 characters)';
          }
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, steps, language]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      formEvents.stepCompleted(type, currentStep + 1, currentStepData.id);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [currentStep, currentStepData, steps.length, type, validateStep]);

  // Handle previous step
  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Handle submit
  const handleSubmit = useCallback(async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    const refNum = generateReferenceNumber(type === 'complaint' ? 'CMP' : type === 'inquiry' ? 'INQ' : 'APP');
    setReferenceNumber(refNum);

    try {
      // Call custom submit handler or default API call
      if (onSubmit) {
        await onSubmit(formData, refNum);
      } else {
        // Default: send to API
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, referenceNumber: refNum, formType: type }),
        });
        
        if (!response.ok) throw new Error('Submission failed');
      }

      // Track conversion
      formEvents.submitted(type, refNum);
      conversionEvents.leadGenerated(formData.financingType || type, 'website');

      setIsSuccess(true);
      onSuccess?.(refNum);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        ...errors,
        // @ts-ignore
        submit: language === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, formData, type, onSubmit, onSuccess, validateStep, errors, language]);

  // Track form start
  React.useEffect(() => {
    formEvents.started(type);
  }, [type]);

  // Render success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('text-center py-12 px-6', className)}
      >
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-6 flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
          {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Submitted Successfully!'}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {language === 'ar'
            ? 'شكراً لتواصلك معنا. سيتم التواصل معك قريباً.'
            : 'Thank you for contacting us. We will get back to you soon.'}
        </p>
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 inline-block">
          <p className="text-sm text-primary-700 dark:text-primary-300 mb-1">
            {language === 'ar' ? 'رقم المرجع:' : 'Reference Number:'}
          </p>
          <p className="text-xl font-bold text-primary-600 dark:text-primary-400 font-mono">
            {referenceNumber}
          </p>
        </div>
        <p className="text-xs text-neutral-500 mt-4">
          {language === 'ar'
            ? 'يرجى الاحتفاظ برقم المرجع للمتابعة'
            : 'Please save this reference number for tracking'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Progress Steps */}
      {steps.length > 1 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors',
                      index < currentStep
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                    )}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-[80px] hidden sm:block text-neutral-600 dark:text-neutral-400">
                    {language === 'ar' ? step.titleAr : step.title}
                  </span>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-1 mx-2',
                      index < currentStep
                        ? 'bg-green-500'
                        : 'bg-neutral-200 dark:bg-neutral-700'
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary-800 dark:text-primary-100">
              {language === 'ar' ? currentStepData.titleAr : currentStepData.title}
            </h3>
            {currentStepData.description && (
              <p className="text-primary-500 dark:text-primary-400 mt-1">
                {language === 'ar' ? currentStepData.descriptionAr : currentStepData.description}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {currentStepData.fields.includes('fullName') && (
              <FormField
                label={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                htmlFor="fullName"
                required
                error={errors.fullName}
              >
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  leftAddon={<User className="w-5 h-5" />}
                />
              </FormField>
            )}

            {currentStepData.fields.includes('nationalId') && (
              <FormField
                label={language === 'ar' ? 'رقم الهوية' : 'National ID'}
                htmlFor="nationalId"
                required
                error={errors.nationalId}
              >
                <Input
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => updateField('nationalId', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل رقم الهوية' : 'Enter your National ID'}
                  leftAddon={<CreditCard className="w-5 h-5" />}
                  maxLength={10}
                />
              </FormField>
            )}

            {currentStepData.fields.includes('phone') && (
              <FormField
                label={language === 'ar' ? 'رقم الجوال' : 'Mobile Number'}
                htmlFor="phone"
                required
                error={errors.phone}
              >
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="05XXXXXXXX"
                  leftAddon={<Phone className="w-5 h-5" />}
                  dir="ltr"
                />
              </FormField>
            )}

            {currentStepData.fields.includes('email') && (
              <FormField
                label={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                htmlFor="email"
                required
                error={errors.email}
              >
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="email@example.com"
                  leftAddon={<Mail className="w-5 h-5" />}
                  dir="ltr"
                />
              </FormField>
            )}

            {currentStepData.fields.includes('employmentType') && (
              <FormField
                label={language === 'ar' ? 'نوع العمل' : 'Employment Type'}
                htmlFor="employmentType"
                required
              >
                <select
                  id="employmentType"
                  value={formData.employmentType || ''}
                  onChange={(e) => updateField('employmentType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                  {employmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {language === 'ar' ? type.labelAr : type.label}
                    </option>
                  ))}
                </select>
              </FormField>
            )}

            {currentStepData.fields.includes('employer') && (
              <FormField
                label={language === 'ar' ? 'جهة العمل' : 'Employer'}
                htmlFor="employer"
                required
                error={errors.employer}
              >
                <Input
                  id="employer"
                  value={formData.employer || ''}
                  onChange={(e) => updateField('employer', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسم جهة العمل' : 'Enter employer name'}
                  leftAddon={<Building className="w-5 h-5" />}
                />
              </FormField>
            )}

            {currentStepData.fields.includes('monthlyIncome') && (
              <FormField
                label={language === 'ar' ? 'الدخل الشهري (ريال)' : 'Monthly Income (SAR)'}
                htmlFor="monthlyIncome"
                required
                error={errors.monthlyIncome}
              >
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) => updateField('monthlyIncome', parseInt(e.target.value))}
                  placeholder={language === 'ar' ? 'أدخل الدخل الشهري' : 'Enter monthly income'}
                  leftAddon={<DollarSign className="w-5 h-5" />}
                  min={4000}
                />
              </FormField>
            )}

            {currentStepData.fields.includes('financingType') && (
              <FormField
                label={language === 'ar' ? 'نوع التمويل' : 'Financing Type'}
                htmlFor="financingType"
                required
              >
                <select
                  id="financingType"
                  value={formData.financingType || ''}
                  onChange={(e) => updateField('financingType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                  {financingTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {language === 'ar' ? type.labelAr : type.label}
                    </option>
                  ))}
                </select>
              </FormField>
            )}

            {currentStepData.fields.includes('requestedAmount') && (
              <FormField
                label={language === 'ar' ? 'المبلغ المطلوب (ريال)' : 'Requested Amount (SAR)'}
                htmlFor="requestedAmount"
                required
              >
                <Input
                  id="requestedAmount"
                  type="number"
                  value={formData.requestedAmount || ''}
                  onChange={(e) => updateField('requestedAmount', parseInt(e.target.value))}
                  placeholder={language === 'ar' ? 'أدخل المبلغ المطلوب' : 'Enter requested amount'}
                  leftAddon={<DollarSign className="w-5 h-5" />}
                />
              </FormField>
            )}

            {currentStepData.fields.includes('tenure') && (
              <FormField
                label={language === 'ar' ? 'مدة التمويل (أشهر)' : 'Tenure (months)'}
                htmlFor="tenure"
                required
              >
                <select
                  id="tenure"
                  value={formData.tenure || ''}
                  onChange={(e) => updateField('tenure', parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                  {[12, 24, 36, 48, 60].map((months) => (
                    <option key={months} value={months}>
                      {months} {language === 'ar' ? 'شهر' : 'months'}
                    </option>
                  ))}
                </select>
              </FormField>
            )}

            {currentStepData.fields.includes('subject') && (
              <FormField
                label={language === 'ar' ? 'الموضوع' : 'Subject'}
                htmlFor="subject"
                required
              >
                <Input
                  id="subject"
                  value={formData.subject || ''}
                  onChange={(e) => updateField('subject', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل الموضوع' : 'Enter subject'}
                  leftAddon={<FileText className="w-5 h-5" />}
                />
              </FormField>
            )}

            {currentStepData.fields.includes('message') && (
              <FormField
                label={language === 'ar' ? 'الرسالة' : 'Message'}
                htmlFor="message"
                required
                error={errors.message}
              >
                <textarea
                  id="message"
                  value={formData.message || ''}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا' : 'Write your message here'}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:border-primary-500 focus:outline-none resize-none"
                />
              </FormField>
            )}

            {/* Consent Checkboxes */}
            {currentStepData.fields.includes('consentTerms') && (
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentTerms}
                    onChange={(e) => updateField('consentTerms', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-primary-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    {language === 'ar'
                      ? 'أوافق على الشروط والأحكام'
                      : 'I agree to the Terms and Conditions'}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consentTerms && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.consentTerms}
                  </p>
                )}
              </div>
            )}

            {currentStepData.fields.includes('consentPDPL') && (
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentPDPL}
                    onChange={(e) => updateField('consentPDPL', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-primary-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    {language === 'ar'
                      ? 'أوافق على معالجة بياناتي الشخصية وفقاً لنظام حماية البيانات الشخصية'
                      : 'I consent to the processing of my personal data in accordance with PDPL'}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consentPDPL && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.consentPDPL}
                  </p>
                )}
              </div>
            )}

            {currentStepData.fields.includes('consentMarketing') && (
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentMarketing}
                  onChange={(e) => updateField('consentMarketing', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-primary-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-primary-600 dark:text-primary-400">
                  {language === 'ar'
                    ? 'أرغب في تلقي العروض والأخبار من أجل للتمويل'
                    : 'I would like to receive offers and news from AJIL Finance'}
                </span>
              </label>
            )}
          </div>

          {/* PDPL Notice */}
          {currentStepData.fields.includes('consentPDPL') && (
            <div className="mt-6">
              <DisclosureBlock
                type="info"
                title="Data Protection Notice"
                titleAr="إشعار حماية البيانات"
                expandable
                defaultExpanded={false}
                content={
                  language === 'ar' ? (
                    <p>
                      بياناتك الشخصية محمية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.
                      سنستخدم بياناتك فقط لمعالجة طلبك والتواصل معك. لمزيد من المعلومات، يرجى مراجعة سياسة الخصوصية.
                    </p>
                  ) : (
                    <p>
                      Your personal data is protected under Saudi Arabia's Personal Data Protection Law (PDPL).
                      We will only use your data to process your request and contact you. For more information,
                      please review our Privacy Policy.
                    </p>
                  )
                }
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        {currentStep > 0 ? (
          <Button variant="ghost" onClick={handlePrev} leftIcon={<ArrowPrev className="w-5 h-5" />}>
            {language === 'ar' ? 'السابق' : 'Previous'}
          </Button>
        ) : (
          <div />
        )}

        {currentStep < steps.length - 1 ? (
          <Button variant="primary" onClick={handleNext} rightIcon={<ArrowNext className="w-5 h-5" />}>
            {language === 'ar' ? 'التالي' : 'Next'}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText={language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
            leftIcon={<Shield className="w-5 h-5" />}
          >
            {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default LeadCaptureForm;
