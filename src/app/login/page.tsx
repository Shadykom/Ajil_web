'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Shield,
  Smartphone,
  CreditCard,
  ChevronLeft
} from 'lucide-react'
import { AjilSymbol, AjilLogo } from '@/components/icons'
import { AjilLogoBackground } from '@/components/icons/AjilLogo'

export default function LoginPage() {
  const { language, dir } = useI18n()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nationalId: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const features = [
    {
      icon: CreditCard,
      title: 'View Your Accounts',
      titleAr: 'عرض حساباتك',
      desc: 'Check balances and payment schedules',
      descAr: 'تحقق من الأرصدة وجداول السداد',
    },
    {
      icon: Smartphone,
      title: 'Digital Services',
      titleAr: 'الخدمات الرقمية',
      desc: 'Manage everything from anywhere',
      descAr: 'إدارة كل شيء من أي مكان',
    },
    {
      icon: Shield,
      title: 'Secure & Protected',
      titleAr: 'آمن ومحمي',
      desc: 'Your data is always safe with us',
      descAr: 'بياناتك آمنة دائماً معنا',
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Login Section */}
      <section className="relative min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center py-20 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(247,148,29,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,102,179,0.2)_0%,transparent_50%)]" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          {/* AJIL Logo Decorations */}
          <div className="absolute -top-20 -right-20 opacity-[0.03]">
            <AjilLogoBackground size={400} animated />
          </div>
          <div className="absolute -bottom-32 -left-32 opacity-[0.02] rotate-180">
            <AjilLogoBackground size={300} animated />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block text-white"
            >
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
              >
                {dir === 'rtl' ? <ArrowRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
              </Link>

              <div className="mb-8">
                <AjilLogo className="h-12 text-white" />
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                {language === 'ar'
                  ? 'مرحباً بعودتك'
                  : 'Welcome Back'}
              </h1>
              <p className="text-xl text-white/70 mb-12">
                {language === 'ar'
                  ? 'قم بتسجيل الدخول للوصول إلى حسابك وإدارة تمويلك'
                  : 'Sign in to access your account and manage your financing'}
              </p>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-secondary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">
                        {language === 'ar' ? feature.titleAr : feature.title}
                      </h3>
                      <p className="text-white/60">
                        {language === 'ar' ? feature.descAr : feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
                    <AjilSymbol size={32} className="text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  </h2>
                  <p className="text-gray-500">
                    {language === 'ar'
                      ? 'أدخل بيانات حسابك للمتابعة'
                      : 'Enter your credentials to continue'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* National ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'رقم الهوية' : 'National ID'}
                    </label>
                    <div className="relative">
                      <User className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={formData.nationalId}
                        onChange={(e) => setFormData({ ...formData, nationalId: e.target.value.replace(/\D/g, '') })}
                        className="w-full ps-12 pe-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all"
                        placeholder={language === 'ar' ? 'أدخل رقم الهوية' : 'Enter your National ID'}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'كلمة المرور' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full ps-12 pe-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all"
                        placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 end-4 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        {language === 'ar' ? 'تذكرني' : 'Remember me'}
                      </span>
                    </label>
                    <Link
                      href="#"
                      className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                        {dir === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      {language === 'ar' ? 'أو' : 'or'}
                    </span>
                  </div>
                </div>

                {/* Alternative Actions */}
                <div className="space-y-4">
                  <Link
                    href="/apply"
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-primary-200 text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all"
                  >
                    <span>{language === 'ar' ? 'طلب تمويل جديد' : 'Apply for Financing'}</span>
                  </Link>
                  <p className="text-center text-sm text-gray-500">
                    {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                    <Link
                      href="/apply"
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {language === 'ar' ? 'سجل الآن' : 'Register Now'}
                    </Link>
                  </p>
                </div>

                {/* Security Notice */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    {language === 'ar'
                      ? 'اتصالك آمن ومشفر. نحن ملتزمون بحماية بياناتك الشخصية.'
                      : 'Your connection is secure and encrypted. We are committed to protecting your personal data.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
