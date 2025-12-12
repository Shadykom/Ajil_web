'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { useState } from 'react'
import { 
  FileText, 
  User, 
  Phone, 
  Mail, 
  CreditCard,
  Building2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const steps = [
  { key: 'personal', icon: User, label: 'Personal Info', labelAr: 'البيانات الشخصية' },
  { key: 'employment', icon: Building2, label: 'Employment', labelAr: 'الوظيفة' },
  { key: 'financing', icon: CreditCard, label: 'Financing', labelAr: 'التمويل' },
  { key: 'review', icon: CheckCircle, label: 'Review', labelAr: 'المراجعة' },
]

const financingProducts = [
  { key: 'car', label: 'Car Financing', labelAr: 'تمويل السيارات' },
  { key: 'personal', label: 'Personal Financing', labelAr: 'التمويل الشخصي' },
  { key: 'business', label: 'Business Financing', labelAr: 'تمويل الأعمال' },
]

export default function ApplyPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    nationalId: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    // Employment
    employerName: '',
    employmentStatus: '',
    monthlyIncome: '',
    employmentDuration: '',
    // Financing
    financingType: '',
    requestedAmount: '',
    preferredDuration: '',
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Submit form
      setSubmitted(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Header />
        
        <section className="py-32 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {language === 'ar' ? 'تم استلام طلبك!' : 'Application Received!'}
              </h1>
              <p className="text-xl text-gray-500 mb-8">
                {language === 'ar'
                  ? 'شكراً لتقديم طلبك. سيتواصل معك أحد ممثلينا خلال 24 ساعة.'
                  : 'Thank you for your application. One of our representatives will contact you within 24 hours.'}
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'رقم الطلب' : 'Application Number'}
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  AJIL-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all"
              >
                <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Apply for Financing"
        titleAr="تقدم للتمويل"
        subtitle="Complete your application in just a few minutes"
        subtitleAr="أكمل طلبك في دقائق معدودة"
        badge="Quick Application"
        badgeAr="تقديم سريع"
        BadgeIcon={FileText}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className="relative">
                    <motion.div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                        index <= currentStep
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      animate={{ scale: index === currentStep ? 1.1 : 1 }}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </motion.div>
                    <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium whitespace-nowrap ${
                      index <= currentStep ? 'text-primary-600' : 'text-gray-400'
                    }`}>
                      {language === 'ar' ? step.labelAr : step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 md:w-32 h-1 mx-2 rounded-full ${
                      index < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-xl"
            >
              {/* Step 0: Personal Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'} *
                    </label>
                    <input
                      type="text"
                      value={formData.nationalId}
                      onChange={(e) => updateFormData('nationalId', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      placeholder={language === 'ar' ? 'أدخل رقم الهوية' : 'Enter National ID'}
                      dir="ltr"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'رقم الجوال' : 'Phone'} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Employment */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'جهة العمل' : 'Employer Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.employerName}
                      onChange={(e) => updateFormData('employerName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'الحالة الوظيفية' : 'Employment Status'} *
                    </label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => updateFormData('employmentStatus', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    >
                      <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                      <option value="government">{language === 'ar' ? 'قطاع حكومي' : 'Government'}</option>
                      <option value="private">{language === 'ar' ? 'قطاع خاص' : 'Private Sector'}</option>
                      <option value="self">{language === 'ar' ? 'عمل حر' : 'Self-employed'}</option>
                      <option value="retired">{language === 'ar' ? 'متقاعد' : 'Retired'}</option>
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'الدخل الشهري' : 'Monthly Income'} *
                      </label>
                      <input
                        type="text"
                        value={formData.monthlyIncome}
                        onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        placeholder="SAR"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'مدة العمل' : 'Employment Duration'} *
                      </label>
                      <select
                        value={formData.employmentDuration}
                        onChange={(e) => updateFormData('employmentDuration', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      >
                        <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                        <option value="0-1">{language === 'ar' ? 'أقل من سنة' : 'Less than 1 year'}</option>
                        <option value="1-3">{language === 'ar' ? '1-3 سنوات' : '1-3 years'}</option>
                        <option value="3-5">{language === 'ar' ? '3-5 سنوات' : '3-5 years'}</option>
                        <option value="5+">{language === 'ar' ? 'أكثر من 5 سنوات' : 'More than 5 years'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Financing */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {language === 'ar' ? 'نوع التمويل' : 'Financing Type'} *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {financingProducts.map((product) => (
                        <button
                          key={product.key}
                          type="button"
                          onClick={() => updateFormData('financingType', product.key)}
                          className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                            formData.financingType === product.key
                              ? 'border-primary-500 bg-primary-50 text-primary-600'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {language === 'ar' ? product.labelAr : product.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'المبلغ المطلوب' : 'Requested Amount'} *
                    </label>
                    <input
                      type="text"
                      value={formData.requestedAmount}
                      onChange={(e) => updateFormData('requestedAmount', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      placeholder="SAR"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'مدة التمويل المفضلة' : 'Preferred Duration'} *
                    </label>
                    <select
                      value={formData.preferredDuration}
                      onChange={(e) => updateFormData('preferredDuration', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    >
                      <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                      <option value="12">12 {language === 'ar' ? 'شهر' : 'months'}</option>
                      <option value="24">24 {language === 'ar' ? 'شهر' : 'months'}</option>
                      <option value="36">36 {language === 'ar' ? 'شهر' : 'months'}</option>
                      <option value="48">48 {language === 'ar' ? 'شهر' : 'months'}</option>
                      <option value="60">60 {language === 'ar' ? 'شهر' : 'months'}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4">
                      {language === 'ar' ? 'مراجعة الطلب' : 'Application Review'}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-500">{language === 'ar' ? 'الاسم' : 'Name'}</span>
                        <span className="font-medium text-gray-900">{formData.fullName || '-'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-500">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
                        <span className="font-medium text-gray-900">{formData.email || '-'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-500">{language === 'ar' ? 'نوع التمويل' : 'Financing Type'}</span>
                        <span className="font-medium text-gray-900">
                          {financingProducts.find(p => p.key === formData.financingType)?.[language === 'ar' ? 'labelAr' : 'label'] || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-500">{language === 'ar' ? 'المبلغ' : 'Amount'}</span>
                        <span className="font-medium text-gray-900">{formData.requestedAmount || '-'} SAR</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-500">{language === 'ar' ? 'المدة' : 'Duration'}</span>
                        <span className="font-medium text-gray-900">{formData.preferredDuration || '-'} {language === 'ar' ? 'شهر' : 'months'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      {language === 'ar'
                        ? 'بالضغط على "إرسال الطلب"، أوافق على الشروط والأحكام وسياسة الخصوصية وأؤكد صحة المعلومات المقدمة.'
                        : 'By clicking "Submit Application", I agree to the Terms & Conditions and Privacy Policy and confirm the accuracy of the information provided.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 font-semibold hover:text-primary-600 transition-all"
                  >
                    {dir === 'rtl' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all ${
                    currentStep === 0 ? 'ml-auto' : ''
                  }`}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}</span>
                    </>
                  ) : (
                    <>
                      <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
                      <ArrowIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
