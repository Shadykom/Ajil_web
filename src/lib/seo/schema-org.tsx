/**
 * Schema.org Structured Data Components
 * For SEO and Rich Results
 */

import React from 'react';

// Organization Schema
export interface OrganizationSchemaProps {
  name?: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  url?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialLinks?: string[];
}

export function OrganizationSchema({
  name = 'AJIL Finance',
  nameAr = 'أجل للتمويل',
  description = 'AJIL Finance Company - Sharia-compliant financing solutions for individuals and businesses in Saudi Arabia',
  descriptionAr = 'شركة أجل للتمويل - حلول تمويلية متوافقة مع الشريعة الإسلامية',
  url = 'https://ajil.com',
  logo = 'https://ajil.com/images/AJIL_logo.png',
  phone = '+966-800-244-2211',
  email = 'info@ajil.com',
  address = {
    streetAddress: 'King Fahd Road',
    addressLocality: 'Riyadh',
    addressRegion: 'Riyadh',
    postalCode: '12345',
    addressCountry: 'SA',
  },
  socialLinks = [
    'https://twitter.com/ajilfinance',
    'https://facebook.com/ajilfinance',
    'https://instagram.com/ajilfinance',
    'https://linkedin.com/company/ajilfinance',
  ],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': url,
    name: name,
    alternateName: nameAr,
    description: description,
    url: url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    image: logo,
    telephone: phone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.7136',
      longitude: '46.6753',
    },
    sameAs: socialLinks,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'SAR',
    paymentAccepted: 'Bank Transfer',
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Financing Products',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Personal Financing',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Auto Financing',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Business Financing',
        },
      ],
    },
    slogan: 'Building Trust to Achieve Your Dreams',
    foundingDate: '2008',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 100,
      maxValue: 500,
    },
    legalName: 'AJIL Finance Company',
    knowsLanguage: ['ar', 'en'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for Financing Products
export interface ProductSchemaProps {
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  image?: string;
  url: string;
  brand?: string;
  offers?: {
    minAmount: number;
    maxAmount: number;
    apr: number;
    tenure: { min: number; max: number };
  };
}

export function ProductSchema({
  name,
  nameAr,
  description,
  descriptionAr,
  image,
  url,
  brand = 'AJIL Finance',
  offers,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: name,
    alternateName: nameAr,
    description: description,
    image: image,
    url: `https://ajil.com${url}`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    provider: {
      '@type': 'FinancialService',
      name: 'AJIL Finance',
    },
    ...(offers && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'SAR',
        lowPrice: offers.minAmount,
        highPrice: offers.maxAmount,
        offerCount: 1,
      },
      annualPercentageRate: offers.apr,
      loanTerm: {
        '@type': 'QuantitativeValue',
        minValue: offers.tenure.min,
        maxValue: offers.tenure.max,
        unitCode: 'MON',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema for News
export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = 'AJIL Finance',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: headline,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AJIL Finance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ajil.com/images/AJIL_logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ajil.com${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://ajil.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema for Branches
export interface LocalBusinessSchemaProps {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  openingHours: string[];
  image?: string;
}

export function LocalBusinessSchema({
  name,
  address,
  geo,
  telephone,
  openingHours,
  image,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: name,
    image: image,
    '@id': '',
    url: 'https://ajil.com/branches',
    telephone: telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(':')[0],
      opens: hours.split(':')[1]?.split('-')[0],
      closes: hours.split(':')[1]?.split('-')[1],
    })),
    parentOrganization: {
      '@type': 'Organization',
      name: 'AJIL Finance',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema with SearchAction
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AJIL Finance',
    alternateName: 'أجل للتمويل',
    url: 'https://ajil.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ajil.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
