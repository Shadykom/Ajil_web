'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Filter, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ProductCard, ProductCardProps } from '@/design-system/components/organisms/ProductCard/ProductCard';
import { Breadcrumbs } from '@/design-system/components/molecules/Breadcrumbs/Breadcrumbs';
import { CTABlock } from '@/design-system/components/molecules/CTABlock/CTABlock';
import Input from '@/design-system/components/atoms/Input/Input';
import { Badge } from '@/design-system/components/atoms/Badge/Badge';
import { ProductSchema, BreadcrumbSchema, OrganizationSchema } from '@/lib/seo/schema-org';

// Template Props Interface - CMS Data Only
export interface ProductListingTemplateProps {
  // Page metadata
  pageTitle: string;
  pageTitleAr: string;
  pageDescription: string;
  pageDescriptionAr: string;
  // Hero section
  heroTitle: string;
  heroTitleAr: string;
  heroSubtitle?: string;
  heroSubtitleAr?: string;
  heroBadge?: string;
  heroBadgeAr?: string;
  heroBackgroundImage?: string;
  // Products data from CMS
  products: Omit<ProductCardProps, 'variant'>[];
  // Categories from CMS
  categories?: Array<{
    id: string;
    name: string;
    nameAr: string;
    count: number;
  }>;
  // CTA Section
  ctaTitle?: string;
  ctaTitleAr?: string;
  ctaSubtitle?: string;
  ctaSubtitleAr?: string;
  ctaButtonText?: string;
  ctaButtonTextAr?: string;
  ctaButtonUrl?: string;
  // SEO
  canonicalUrl?: string;
  // Template customization
  showSearch?: boolean;
  showCategories?: boolean;
  defaultView?: 'grid' | 'list';
}

export function ProductListingTemplate({
  pageTitle,
  pageTitleAr,
  pageDescription,
  pageDescriptionAr,
  heroTitle,
  heroTitleAr,
  heroSubtitle,
  heroSubtitleAr,
  heroBadge,
  heroBadgeAr,
  heroBackgroundImage,
  products,
  categories = [],
  ctaTitle,
  ctaTitleAr,
  ctaSubtitle,
  ctaSubtitleAr,
  ctaButtonText = 'Apply Now',
  ctaButtonTextAr = 'قدم طلبك الآن',
  ctaButtonUrl = '/apply',
  showSearch = true,
  showCategories = true,
  defaultView = 'grid',
}: ProductListingTemplateProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';

  // State
  const [view, setView] = useState<'grid' | 'list'>(defaultView);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Localized content
  const displayHeroTitle = language === 'ar' ? heroTitleAr : heroTitle;
  const displayHeroSubtitle = language === 'ar' ? heroSubtitleAr : heroSubtitle;
  const displayHeroBadge = language === 'ar' ? heroBadgeAr : heroBadge;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const title = language === 'ar' && product.titleAr ? product.titleAr : product.title;
        const description = language === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;
        if (!title.toLowerCase().includes(query) && !description.toLowerCase().includes(query)) {
          return false;
        }
      }
      // Category filter (would need category field on products)
      // if (selectedCategory && product.category !== selectedCategory) return false;
      return true;
    });
  }, [products, searchQuery, language]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: language === 'ar' ? 'المنتجات' : 'Products', href: '/products' },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Schema.org */}
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(b => ({ name: b.label, url: b.href }))} />

      <Header />

      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 bg-gradient-to-br from-primary-600 to-primary-900 text-white overflow-hidden"
        style={heroBackgroundImage ? { backgroundImage: `url(${heroBackgroundImage})`, backgroundSize: 'cover' } : undefined}
      >
        {/* Overlay */}
        {heroBackgroundImage && <div className="absolute inset-0 bg-primary-900/70" />}
        
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="product-hero-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0L20 20L10 10L0 20L10 0Z" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#product-hero-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-6 text-white/70" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            {displayHeroBadge && (
              <Badge color="secondary" variant="solid" className="mb-4">
                {displayHeroBadge}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {displayHeroTitle}
            </h1>
            {displayHeroSubtitle && (
              <p className="text-xl md:text-2xl opacity-90">
                {displayHeroSubtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search */}
            {showSearch && (
              <div className="flex-1 max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
                  leftAddon={<Search className="w-5 h-5" />}
                  size="md"
                />
              </div>
            )}

            {/* Categories */}
            {showCategories && categories.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    !selectedCategory
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  )}
                >
                  {language === 'ar' ? 'الكل' : 'All'}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                      selectedCategory === cat.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                  >
                    {language === 'ar' ? cat.nameAr : cat.name}
                    <span className="mr-1 rtl:ml-1 rtl:mr-0 opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>
            )}

            {/* View Toggle */}
            <div className="flex items-center gap-2 ml-auto rtl:ml-0 rtl:mr-auto">
              <span className="text-sm text-neutral-500 hidden sm:inline">
                {filteredProducts.length} {language === 'ar' ? 'منتج' : 'products'}
              </span>
              <div className="flex rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    view === 'grid' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900'
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={cn(
                    'p-2 transition-colors',
                    view === 'list' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div
              className={cn(
                'grid gap-6',
                view === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              )}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProductCard
                    {...product}
                    variant={view === 'grid' ? 'default' : 'horizontal'}
                  />
                  {/* Product Schema */}
                  <ProductSchema
                    name={product.title}
                    nameAr={product.titleAr}
                    description={product.description}
                    descriptionAr={product.descriptionAr}
                    url={product.href}
                    offers={product.startingRate ? {
                      minAmount: 5000,
                      maxAmount: 500000,
                      apr: product.startingRate,
                      tenure: { min: 12, max: 60 },
                    } : undefined}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-500">
                {language === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {ctaTitle && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <CTABlock
              variant="gradient"
              title={ctaTitle}
              titleAr={ctaTitleAr}
              subtitle={ctaSubtitle}
              subtitleAr={ctaSubtitleAr}
              primaryAction={{
                label: ctaButtonText,
                labelAr: ctaButtonTextAr,
                href: ctaButtonUrl,
              }}
              showPhone
            />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

export default ProductListingTemplate;
