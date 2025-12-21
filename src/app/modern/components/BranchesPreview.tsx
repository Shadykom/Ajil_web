'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ChevronRight,
  ChevronLeft,
  Search,
  Building2,
} from 'lucide-react';

interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  cityEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  workingHours: {
    weekdaysAr: string;
    weekdaysEn: string;
    weekendAr: string;
    weekendEn: string;
  };
  featured?: boolean;
}

const branches: Branch[] = [
  {
    id: '1',
    nameAr: 'الفرع الرئيسي - الرياض',
    nameEn: 'Main Branch - Riyadh',
    cityAr: 'الرياض',
    cityEn: 'Riyadh',
    addressAr: 'طريق الملك فهد، حي العليا',
    addressEn: 'King Fahd Road, Olaya District',
    phone: '800-244-2211',
    coordinates: { lat: 24.7136, lng: 46.6753 },
    workingHours: {
      weekdaysAr: '8:00 ص - 4:00 م',
      weekdaysEn: '8:00 AM - 4:00 PM',
      weekendAr: 'مغلق',
      weekendEn: 'Closed',
    },
    featured: true,
  },
  {
    id: '2',
    nameAr: 'فرع جدة - الكورنيش',
    nameEn: 'Jeddah Branch - Corniche',
    cityAr: 'جدة',
    cityEn: 'Jeddah',
    addressAr: 'طريق الكورنيش، حي الشاطئ',
    addressEn: 'Corniche Road, Al Shati District',
    phone: '800-244-2211',
    coordinates: { lat: 21.5169, lng: 39.2192 },
    workingHours: {
      weekdaysAr: '8:00 ص - 4:00 م',
      weekdaysEn: '8:00 AM - 4:00 PM',
      weekendAr: 'مغلق',
      weekendEn: 'Closed',
    },
    featured: true,
  },
  {
    id: '3',
    nameAr: 'فرع الدمام',
    nameEn: 'Dammam Branch',
    cityAr: 'الدمام',
    cityEn: 'Dammam',
    addressAr: 'شارع الملك سعود',
    addressEn: 'King Saud Street',
    phone: '800-244-2211',
    coordinates: { lat: 26.3927, lng: 49.9777 },
    workingHours: {
      weekdaysAr: '8:00 ص - 4:00 م',
      weekdaysEn: '8:00 AM - 4:00 PM',
      weekendAr: 'مغلق',
      weekendEn: 'Closed',
    },
  },
  {
    id: '4',
    nameAr: 'فرع مكة المكرمة',
    nameEn: 'Makkah Branch',
    cityAr: 'مكة',
    cityEn: 'Makkah',
    addressAr: 'طريق الملك عبدالعزيز',
    addressEn: 'King Abdulaziz Road',
    phone: '800-244-2211',
    coordinates: { lat: 21.4225, lng: 39.8262 },
    workingHours: {
      weekdaysAr: '8:00 ص - 4:00 م',
      weekdaysEn: '8:00 AM - 4:00 PM',
      weekendAr: 'مغلق',
      weekendEn: 'Closed',
    },
  },
];

const cities = [
  { ar: 'الكل', en: 'All' },
  { ar: 'الرياض', en: 'Riyadh' },
  { ar: 'جدة', en: 'Jeddah' },
  { ar: 'الدمام', en: 'Dammam' },
  { ar: 'مكة', en: 'Makkah' },
];

export default function BranchesPreview() {
  const { language, dir } = useI18n();
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(branches[0]);
  const isRTL = dir === 'rtl';

  const filteredBranches = selectedCity === 'All' 
    ? branches 
    : branches.filter(b => (language === 'ar' ? b.cityAr : b.cityEn) === selectedCity);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="#00377B"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4" />
            {language === 'ar' ? 'شبكة فروعنا' : 'Our Branch Network'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00377B] mb-4">
            {language === 'ar' ? 'نحن بالقرب منك' : 'We Are Near You'}
          </h2>
          <p className="text-xl text-[#0066B3] max-w-2xl mx-auto">
            {language === 'ar'
              ? 'أكثر من 50 فرعاً في جميع أنحاء المملكة العربية السعودية'
              : 'More than 50 branches across Saudi Arabia'}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map Preview */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-[#00377B] to-[#001D40] rounded-3xl overflow-hidden shadow-2xl">
              {/* Saudi Arabia Map SVG - Accurate KSA outline */}
              <svg
                viewBox="0 0 800 600"
                className="absolute inset-0 w-full h-full p-6"
              >
                <defs>
                  <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00377B" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#001D40" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                
                {/* Accurate Saudi Arabia Map Path */}
                <path
                  d="M580,95 L620,100 L660,115 L685,140 L700,170 L710,200 L715,235 L710,270 L695,300 L680,325 L660,345 L640,360 L615,375 L585,395 L560,420 L540,450 L520,475 L495,495 L465,510 L430,520 L395,525 L360,530 L325,535 L290,540 L255,540 L220,535 L190,525 L165,510 L145,490 L130,465 L120,435 L115,400 L110,365 L105,330 L100,295 L95,260 L95,225 L100,195 L110,170 L125,150 L145,135 L170,120 L200,110 L235,105 L270,100 L305,95 L340,92 L375,90 L410,90 L445,92 L480,95 L515,95 L550,95 L580,95 Z
                  M255,540 L240,560 L220,575 L195,580 L170,575 L150,560 L140,540 L145,520 L160,505 L180,500 L200,505 L215,515 L230,530 L255,540 Z"
                  fill="url(#mapGrad)"
                  stroke="#F7941D"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                
                {/* City markers */}
                {branches.map((branch) => {
                  // Coordinates mapping for KSA map
                  const positions: Record<string, { x: number; y: number }> = {
                    'Riyadh': { x: 480, y: 340 },
                    'Jeddah': { x: 220, y: 420 },
                    'Dammam': { x: 620, y: 280 },
                    'Makkah': { x: 200, y: 385 },
                  };
                  const pos = positions[branch.cityEn] || { x: 400, y: 300 };
                  const isSelected = selectedBranch?.id === branch.id;
                  
                  return (
                    <g key={branch.id}>
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 18 : 10}
                        fill={isSelected ? '#F7941D' : '#4DA3E0'}
                        className="cursor-pointer"
                        onClick={() => setSelectedBranch(branch)}
                        whileHover={{ scale: 1.3 }}
                        animate={{ scale: isSelected ? [1, 1.15, 1] : 1 }}
                        transition={{ duration: 1.2, repeat: isSelected ? Infinity : 0 }}
                      />
                      {isSelected && (
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="28"
                          fill="none"
                          stroke="#F7941D"
                          strokeWidth="2"
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      <text
                        x={pos.x}
                        y={pos.y + 32}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="600"
                      >
                        {language === 'ar' ? branch.cityAr : branch.cityEn}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Selected Branch Card */}
              <AnimatePresence>
                {selectedBranch && (
                  <motion.div
                    key={selectedBranch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} max-w-xs bg-white rounded-2xl p-4 shadow-xl`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#F7941D] rounded-xl flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#00377B]">
                          {language === 'ar' ? selectedBranch.nameAr : selectedBranch.nameEn}
                        </h4>
                        <p className="text-sm text-[#0066B3]">
                          {language === 'ar' ? selectedBranch.addressAr : selectedBranch.addressEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Branch List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* City Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cities.map((city) => {
                const cityName = language === 'ar' ? city.ar : city.en;
                const isActive = selectedCity === city.en;
                return (
                  <button
                    key={city.en}
                    onClick={() => setSelectedCity(city.en)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#00377B] text-white'
                        : 'bg-gray-100 text-[#00377B] hover:bg-gray-200'
                    }`}
                  >
                    {cityName}
                  </button>
                );
              })}
            </div>

            {/* Branches List */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {filteredBranches.map((branch) => {
                const isSelected = selectedBranch?.id === branch.id;
                return (
                  <motion.div
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#00377B] text-white shadow-lg'
                        : 'bg-white border border-gray-100 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20' : 'bg-[#00377B]/10'
                      }`}>
                        <MapPin className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#00377B]'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold ${isSelected ? '' : 'text-[#00377B]'}`}>
                          {language === 'ar' ? branch.nameAr : branch.nameEn}
                        </h4>
                        <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-[#0066B3]'}`}>
                          {language === 'ar' ? branch.addressAr : branch.addressEn}
                        </p>
                        <div className={`flex items-center gap-4 mt-2 text-xs ${
                          isSelected ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {language === 'ar' ? branch.workingHours.weekdaysAr : branch.workingHours.weekdaysEn}
                          </span>
                        </div>
                      </div>
                      {isRTL ? (
                        <ChevronLeft className={`w-5 h-5 ${isSelected ? '' : 'text-gray-400'}`} />
                      ) : (
                        <ChevronRight className={`w-5 h-5 ${isSelected ? '' : 'text-gray-400'}`} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Link */}
            <Link href="/branches">
              <motion.button
                className="w-full mt-6 py-4 bg-[#F7941D] text-white font-bold rounded-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="w-5 h-5" />
                {language === 'ar' ? 'عرض جميع الفروع' : 'View All Branches'}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
