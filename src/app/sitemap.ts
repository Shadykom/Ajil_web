import { MetadataRoute } from 'next';

// Base URL
const BASE_URL = 'https://ajil.com';

// Static pages
const staticPages = [
  '',
  '/modern',
  '/about/story',
  '/about/news',
  '/about/reports',
  '/individuals/car-financing',
  '/individuals/personal-financing',
  '/individuals/rates',
  '/business/car-financing',
  '/business/cash-financing',
  '/business/heavy-equipment',
  '/calculator',
  '/offers',
  '/contact',
  '/apply',
  '/branches',
  '/privacy',
  '/terms',
  '/login',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  
  // Generate sitemap entries for both Arabic and English versions
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for both languages
  staticPages.forEach((page) => {
    // Arabic version (primary)
    sitemapEntries.push({
      url: `${BASE_URL}/ar${page}`,
      lastModified: now,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : page.includes('apply') ? 0.9 : 0.8,
    });

    // English version
    sitemapEntries.push({
      url: `${BASE_URL}/en${page}`,
      lastModified: now,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 0.9 : page.includes('apply') ? 0.8 : 0.7,
    });
  });

  // In production, you would also fetch dynamic content from CMS:
  // - News articles
  // - Product pages
  // - Financial reports
  // - etc.

  return sitemapEntries;
}
