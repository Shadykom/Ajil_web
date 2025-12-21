'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
  X,
  ChevronDown,
  Filter,
  List,
  Map as MapIcon,
  Star,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/design-system/components/atoms/Button/Button';
import Input from '@/design-system/components/atoms/Input/Input';
import { Badge } from '@/design-system/components/atoms/Badge/Badge';

// Branch Interface
export interface Branch {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  city: string;
  cityAr: string;
  region: string;
  regionAr: string;
  phone: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  workingHours: {
    weekdays: string;
    weekdaysAr: string;
    weekend?: string;
    weekendAr?: string;
  };
  services: string[];
  servicesAr: string[];
  isMainBranch?: boolean;
  hasAccessibility?: boolean;
  hasParking?: boolean;
  rating?: number;
}

// Cities in Saudi Arabia
const saudiCities = [
  { value: 'all', label: 'All Cities', labelAr: 'جميع المدن' },
  { value: 'riyadh', label: 'Riyadh', labelAr: 'الرياض' },
  { value: 'jeddah', label: 'Jeddah', labelAr: 'جدة' },
  { value: 'dammam', label: 'Dammam', labelAr: 'الدمام' },
  { value: 'mecca', label: 'Mecca', labelAr: 'مكة المكرمة' },
  { value: 'medina', label: 'Medina', labelAr: 'المدينة المنورة' },
  { value: 'khobar', label: 'Al Khobar', labelAr: 'الخبر' },
  { value: 'taif', label: 'Taif', labelAr: 'الطائف' },
  { value: 'tabuk', label: 'Tabuk', labelAr: 'تبوك' },
  { value: 'qassim', label: 'Qassim', labelAr: 'القصيم' },
  { value: 'abha', label: 'Abha', labelAr: 'أبها' },
];

// Service types
const serviceTypes = [
  { value: 'all', label: 'All Services', labelAr: 'جميع الخدمات' },
  { value: 'personal', label: 'Personal Financing', labelAr: 'التمويل الشخصي' },
  { value: 'auto', label: 'Auto Financing', labelAr: 'تمويل السيارات' },
  { value: 'sme', label: 'SME Financing', labelAr: 'تمويل المنشآت' },
  { value: 'equipment', label: 'Equipment Financing', labelAr: 'تمويل المعدات' },
  { value: 'customer_service', label: 'Customer Service', labelAr: 'خدمة العملاء' },
];

// Mock branches data (would come from API/CMS)
const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'AJIL Head Office',
    nameAr: 'المقر الرئيسي لأجل',
    address: 'King Fahd Road, Olaya District',
    addressAr: 'طريق الملك فهد، حي العليا',
    city: 'riyadh',
    cityAr: 'الرياض',
    region: 'Central',
    regionAr: 'الوسطى',
    phone: '8002442211',
    email: 'info@ajil.com',
    coordinates: { lat: 24.7136, lng: 46.6753 },
    workingHours: {
      weekdays: 'Sun-Thu: 8:00 AM - 4:00 PM',
      weekdaysAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
      weekend: 'Fri-Sat: Closed',
      weekendAr: 'الجمعة-السبت: مغلق',
    },
    services: ['personal', 'auto', 'sme', 'equipment', 'customer_service'],
    servicesAr: ['التمويل الشخصي', 'تمويل السيارات', 'تمويل المنشآت', 'تمويل المعدات', 'خدمة العملاء'],
    isMainBranch: true,
    hasAccessibility: true,
    hasParking: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Jeddah Branch',
    nameAr: 'فرع جدة',
    address: 'Tahlia Street, Al Rawdah District',
    addressAr: 'شارع التحلية، حي الروضة',
    city: 'jeddah',
    cityAr: 'جدة',
    region: 'Western',
    regionAr: 'الغربية',
    phone: '8002442211',
    coordinates: { lat: 21.5169, lng: 39.2192 },
    workingHours: {
      weekdays: 'Sun-Thu: 9:00 AM - 5:00 PM',
      weekdaysAr: 'الأحد-الخميس: 9:00 ص - 5:00 م',
    },
    services: ['personal', 'auto', 'customer_service'],
    servicesAr: ['التمويل الشخصي', 'تمويل السيارات', 'خدمة العملاء'],
    hasParking: true,
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Dammam Branch',
    nameAr: 'فرع الدمام',
    address: 'King Saud Street',
    addressAr: 'شارع الملك سعود',
    city: 'dammam',
    cityAr: 'الدمام',
    region: 'Eastern',
    regionAr: 'الشرقية',
    phone: '8002442211',
    coordinates: { lat: 26.4207, lng: 50.0888 },
    workingHours: {
      weekdays: 'Sun-Thu: 8:30 AM - 4:30 PM',
      weekdaysAr: 'الأحد-الخميس: 8:30 ص - 4:30 م',
    },
    services: ['personal', 'auto', 'sme'],
    servicesAr: ['التمويل الشخصي', 'تمويل السيارات', 'تمويل المنشآت'],
    hasAccessibility: true,
    rating: 4.5,
  },
];

export interface BranchLocatorProps {
  /** Branches data (if not provided, uses mock data) */
  branches?: Branch[];
  /** Google Maps API Key */
  mapsApiKey?: string;
  /** Default view mode */
  defaultView?: 'list' | 'map';
  /** Show search bar */
  showSearch?: boolean;
  /** Show filters */
  showFilters?: boolean;
  /** Custom class name */
  className?: string;
  /** On branch select callback */
  onBranchSelect?: (branch: Branch) => void;
}

export function BranchLocator({
  branches = mockBranches,
  mapsApiKey,
  defaultView = 'list',
  showSearch = true,
  showFilters = true,
  className,
  onBranchSelect,
}: BranchLocatorProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';

  // State
  const [viewMode, setViewMode] = useState<'list' | 'map'>(defaultView);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Filtered branches
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      // City filter
      if (selectedCity !== 'all' && branch.city !== selectedCity) {
        return false;
      }

      // Service filter
      if (selectedService !== 'all' && !branch.services.includes(selectedService)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchFields = [
          branch.name,
          branch.nameAr,
          branch.address,
          branch.addressAr,
          branch.city,
          branch.cityAr,
        ];
        return searchFields.some((field) => field.toLowerCase().includes(query));
      }

      return true;
    });
  }, [branches, selectedCity, selectedService, searchQuery]);

  // Get directions URL
  const getDirectionsUrl = (branch: Branch) => {
    const { lat, lng } = branch.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  // Branch Card Component
  const BranchCard = ({ branch }: { branch: Branch }) => {
    const isSelected = selectedBranch?.id === branch.id;
    const displayName = language === 'ar' ? branch.nameAr : branch.name;
    const displayAddress = language === 'ar' ? branch.addressAr : branch.address;
    const displayCity = language === 'ar' ? branch.cityAr : branch.city;
    const displayHours = language === 'ar' ? branch.workingHours.weekdaysAr : branch.workingHours.weekdays;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          'bg-white dark:bg-neutral-900 rounded-xl border-2 p-5 cursor-pointer',
          'transition-all duration-200',
          isSelected
            ? 'border-primary-500 shadow-lg shadow-primary-500/20'
            : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-300'
        )}
        onClick={() => {
          setSelectedBranch(branch);
          onBranchSelect?.(branch);
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-primary-800 dark:text-primary-100">
                {displayName}
              </h3>
              {branch.isMainBranch && (
                <Badge color="secondary" variant="solid" size="sm">
                  {language === 'ar' ? 'الرئيسي' : 'HQ'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-primary-500 dark:text-primary-400 flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 shrink-0 text-primary-500" />
              {displayAddress}, {displayCity}
            </p>
          </div>

          {branch.rating && (
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{branch.rating}</span>
            </div>
          )}
        </div>

        {/* Hours */}
        <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 mb-3">
          <Clock className="w-4 h-4 text-primary-500" />
          <span>{displayHours}</span>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(language === 'ar' ? branch.servicesAr : branch.services).slice(0, 3).map((service, idx) => (
            <Badge key={idx} color="primary" variant="soft" size="sm">
              {service}
            </Badge>
          ))}
          {branch.services.length > 3 && (
            <Badge color="neutral" variant="soft" size="sm">
              +{branch.services.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${branch.phone}`}
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" fullWidth leftIcon={<Phone className="w-4 h-4" />}>
              {language === 'ar' ? 'اتصل' : 'Call'}
            </Button>
          </a>
          <a
            href={getDirectionsUrl(branch)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="primary" size="sm" fullWidth leftIcon={<Navigation className="w-4 h-4" />}>
              {language === 'ar' ? 'الاتجاهات' : 'Directions'}
            </Button>
          </a>
        </div>

        {/* Amenities */}
        {(branch.hasAccessibility || branch.hasParking) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            {branch.hasAccessibility && (
              <span className="text-xs text-primary-500 flex items-center gap-1">
                <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a2 2 0 100 4 2 2 0 000-4zm6 7h-3.9l-2.1 5.4-2.1-5.4H6a2 2 0 00-2 2v6a2 2 0 004 0v-4h.9l2.1 5.4V22a2 2 0 004 0v-4.6l2.1-5.4h.9v4a2 2 0 004 0v-6a2 2 0 00-2-2z"/>
                </svg>
                {language === 'ar' ? 'وصول ذوي الاحتياجات' : 'Accessible'}
              </span>
            )}
            {branch.hasParking && (
              <span className="text-xs text-primary-500 flex items-center gap-1">
                <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
                </svg>
                {language === 'ar' ? 'موقف سيارات' : 'Parking'}
              </span>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Header & Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Search */}
          {showSearch && (
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث عن فرع...' : 'Search branches...'}
                leftAddon={<Search className="w-5 h-5" />}
                rightAddon={
                  searchQuery && (
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-4 h-4" />
                    </button>
                  )
                }
                size="lg"
              />
            </div>
          )}

          {/* View Toggle & Filter Button */}
          <div className="flex gap-2">
            {/* View Mode Toggle */}
            <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                )}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === 'ar' ? 'قائمة' : 'List'}
                </span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 transition-colors',
                  viewMode === 'map'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                )}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === 'ar' ? 'خريطة' : 'Map'}
                </span>
              </button>
            </div>

            {/* Filter Button */}
            {showFilters && (
              <Button
                variant="outline"
                leftIcon={<Filter className="w-4 h-4" />}
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              >
                <span className="hidden sm:inline">
                  {language === 'ar' ? 'تصفية' : 'Filter'}
                </span>
              </Button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFiltersPanel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                {/* City Filter */}
                <div className="w-full sm:w-auto">
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    {language === 'ar' ? 'المدينة' : 'City'}
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
                  >
                    {saudiCities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {language === 'ar' ? city.labelAr : city.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Filter */}
                <div className="w-full sm:w-auto">
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    {language === 'ar' ? 'الخدمة' : 'Service'}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
                  >
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {language === 'ar' ? service.labelAr : service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {(selectedCity !== 'all' || selectedService !== 'all') && (
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCity('all');
                        setSelectedService('all');
                      }}
                    >
                      {language === 'ar' ? 'مسح التصفية' : 'Clear Filters'}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
          {language === 'ar' 
            ? `${filteredBranches.length} فرع`
            : `${filteredBranches.length} ${filteredBranches.length === 1 ? 'branch' : 'branches'} found`
          }
        </p>
      </div>

      {/* Content */}
      <div className={cn(
        'grid gap-6',
        viewMode === 'map' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
      )}>
        {/* Branch List */}
        <div className={cn(
          viewMode === 'map' ? 'lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto' : 'md:col-span-2 xl:col-span-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3'
        )}>
          <AnimatePresence mode="popLayout">
            {filteredBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </AnimatePresence>

          {filteredBranches.length === 0 && (
            <div className="col-span-full text-center py-12">
              <MapPin className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">
                {language === 'ar' 
                  ? 'لم يتم العثور على فروع'
                  : 'No branches found'}
              </p>
            </div>
          )}
        </div>

        {/* Map (placeholder - requires Google Maps integration) */}
        {viewMode === 'map' && (
          <div className="lg:col-span-2 h-[600px] bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden">
            {mapsApiKey ? (
              // Google Maps would be integrated here
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                <div className="text-center">
                  <MapIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>{language === 'ar' ? 'الخريطة هنا' : 'Map View'}</p>
                  <p className="text-sm opacity-70">
                    {language === 'ar' 
                      ? 'يتطلب مفتاح Google Maps API'
                      : 'Requires Google Maps API key'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                <div className="text-center">
                  <MapIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2">
                    {language === 'ar' ? 'عرض الخريطة' : 'Map View'}
                  </p>
                  <p className="text-sm opacity-70 max-w-xs">
                    {language === 'ar'
                      ? 'يتطلب مفتاح Google Maps API للعرض التفاعلي'
                      : 'Requires Google Maps API key for interactive view'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BranchLocator;
