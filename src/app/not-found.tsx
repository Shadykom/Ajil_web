'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-bold text-primary-600 mb-4"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          404
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Home className="w-5 h-5" />
          <span>العودة للصفحة الرئيسية</span>
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Link>
      </motion.div>
    </div>
  )
}
