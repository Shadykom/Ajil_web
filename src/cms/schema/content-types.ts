/**
 * AJIL CMS Content Types Schema
 * Headless CMS configuration for content governance
 * Compatible with Strapi, Contentful, Sanity, or custom CMS
 */

// Base content type interface
export interface BaseContentType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  version: number;
  locale: 'ar' | 'en';
  author: string;
  lastModifiedBy: string;
}

// Localized field helper
export interface LocalizedField<T> {
  ar: T;
  en: T;
}

// ============================================
// PRODUCT CONTENT TYPES
// ============================================

export interface Product extends BaseContentType {
  contentType: 'product';
  // Basic Info
  slug: string;
  name: LocalizedField<string>;
  shortDescription: LocalizedField<string>;
  fullDescription: LocalizedField<string>;
  // Categorization
  category: ProductCategory;
  targetAudience: 'individuals' | 'business' | 'both';
  // Media
  icon: MediaAsset;
  featuredImage: MediaAsset;
  gallery?: MediaAsset[];
  // Financing Details
  minAmount: number;
  maxAmount: number;
  minTenure: number; // months
  maxTenure: number;
  baseAPR: number;
  // Features
  features: LocalizedField<string[]>;
  benefits: LocalizedField<string[]>;
  eligibility: LocalizedField<string[]>;
  // Documents Required
  documentsRequired: LocalizedField<string[]>;
  // Calculator Config
  calculatorEnabled: boolean;
  calculatorConfig?: CalculatorConfig;
  // SEO
  seo: SEOMetadata;
  // Related
  relatedProducts?: string[]; // Product IDs
  faqs?: FAQ[];
  // Compliance
  shariahCompliant: boolean;
  samaApproved: boolean;
  disclaimers: LocalizedField<string[]>;
}

export interface ProductCategory extends BaseContentType {
  contentType: 'productCategory';
  slug: string;
  name: LocalizedField<string>;
  description: LocalizedField<string>;
  icon: MediaAsset;
  parentCategory?: string;
  sortOrder: number;
}

// ============================================
// CALCULATOR CONTENT TYPES
// ============================================

export interface CalculatorConfig extends BaseContentType {
  contentType: 'calculator';
  name: LocalizedField<string>;
  description: LocalizedField<string>;
  type: 'murabaha' | 'ijara' | 'tawarruq' | 'auto_lease' | 'equipment';
  // Rate Configuration
  baseRate: number;
  minRate: number;
  maxRate: number;
  // Amount Configuration
  minAmount: number;
  maxAmount: number;
  amountStep: number;
  defaultAmount: number;
  // Tenure Configuration
  minTenure: number;
  maxTenure: number;
  tenureStep: number;
  defaultTenure: number;
  // Fees
  adminFeeType: 'fixed' | 'percentage';
  adminFeeValue: number;
  insuranceRequired: boolean;
  insuranceRate?: number;
  // Down Payment
  downPaymentRequired: boolean;
  minDownPayment?: number;
  maxDownPayment?: number;
  // Display Options
  showPaymentSchedule: boolean;
  showTotalCost: boolean;
  showAPRDisclosure: boolean;
  // Associated Product
  productId?: string;
}

// ============================================
// RATE CONTENT TYPES
// ============================================

export interface FinancingRate extends BaseContentType {
  contentType: 'rate';
  productId: string;
  effectiveDate: Date;
  expiryDate?: Date;
  // Rate Details
  apr: number;
  flatRate?: number;
  // Conditions
  minAmount?: number;
  maxAmount?: number;
  minTenure?: number;
  maxTenure?: number;
  customerSegment?: 'all' | 'government' | 'private' | 'premium';
  // Approval
  approvedBy: string;
  approvalDate: Date;
}

// ============================================
// NEWS & BLOG CONTENT TYPES
// ============================================

export interface NewsArticle extends BaseContentType {
  contentType: 'news';
  slug: string;
  title: LocalizedField<string>;
  excerpt: LocalizedField<string>;
  content: LocalizedField<RichText>;
  // Media
  featuredImage: MediaAsset;
  gallery?: MediaAsset[];
  // Categorization
  category: NewsCategory;
  tags: string[];
  // Author
  authorProfile?: AuthorProfile;
  // Dates
  publishDate: Date;
  // SEO
  seo: SEOMetadata;
  // Social
  socialShareImage?: MediaAsset;
  // Analytics
  readingTime: number;
  viewCount: number;
}

export interface NewsCategory extends BaseContentType {
  contentType: 'newsCategory';
  slug: string;
  name: LocalizedField<string>;
  description: LocalizedField<string>;
  color: string;
  sortOrder: number;
}

export interface AuthorProfile {
  name: LocalizedField<string>;
  title: LocalizedField<string>;
  bio: LocalizedField<string>;
  avatar: MediaAsset;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

// ============================================
// FAQ CONTENT TYPES
// ============================================

export interface FAQ extends BaseContentType {
  contentType: 'faq';
  question: LocalizedField<string>;
  answer: LocalizedField<RichText>;
  category: FAQCategory;
  relatedProducts?: string[];
  sortOrder: number;
  featured: boolean;
}

export interface FAQCategory extends BaseContentType {
  contentType: 'faqCategory';
  slug: string;
  name: LocalizedField<string>;
  icon: MediaAsset;
  sortOrder: number;
}

// ============================================
// GOVERNANCE & POLICIES
// ============================================

export interface GovernancePage extends BaseContentType {
  contentType: 'governance';
  slug: string;
  title: LocalizedField<string>;
  subtitle: LocalizedField<string>;
  content: LocalizedField<RichText>;
  // Page Type
  pageType: 'about' | 'board' | 'committee' | 'policy' | 'report' | 'compliance';
  // Media
  featuredImage?: MediaAsset;
  documents?: DocumentAsset[];
  // SEO
  seo: SEOMetadata;
  // Legal
  effectiveDate?: Date;
  reviewDate?: Date;
  approvedBy?: string;
}

export interface FinancialReport extends BaseContentType {
  contentType: 'financialReport';
  title: LocalizedField<string>;
  description: LocalizedField<string>;
  // Report Details
  reportType: 'annual' | 'quarterly' | 'interim' | 'shariah';
  fiscalYear: number;
  quarter?: 1 | 2 | 3 | 4;
  // Document
  document: DocumentAsset;
  // Dates
  reportDate: Date;
  publishDate: Date;
  // Approval
  approvedByBoard: boolean;
  auditedBy?: string;
}

// ============================================
// CAREER CONTENT TYPES
// ============================================

export interface JobPosting extends BaseContentType {
  contentType: 'job';
  title: LocalizedField<string>;
  slug: string;
  // Details
  department: LocalizedField<string>;
  location: LocalizedField<string>;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  // Content
  description: LocalizedField<RichText>;
  requirements: LocalizedField<string[]>;
  benefits: LocalizedField<string[]>;
  // Application
  applicationDeadline?: Date;
  applicationUrl?: string;
  // Integration
  externalJobId?: string; // MenaiTech integration
}

// ============================================
// BRANCH & LOCATION CONTENT TYPES
// ============================================

export interface Branch extends BaseContentType {
  contentType: 'branch';
  name: LocalizedField<string>;
  slug: string;
  // Address
  address: LocalizedField<string>;
  city: LocalizedField<string>;
  region: LocalizedField<string>;
  postalCode: string;
  // Contact
  phone: string;
  email?: string;
  // Location
  coordinates: {
    latitude: number;
    longitude: number;
  };
  // Hours
  workingHours: {
    weekdays: LocalizedField<string>;
    weekend?: LocalizedField<string>;
    ramadan?: LocalizedField<string>;
  };
  // Services
  services: string[]; // Service IDs
  // Amenities
  hasAccessibility: boolean;
  hasParking: boolean;
  hasPrayerRoom: boolean;
  // Media
  photos?: MediaAsset[];
  // Status
  isMainBranch: boolean;
  isActive: boolean;
}

// ============================================
// OFFERS & PROMOTIONS
// ============================================

export interface Offer extends BaseContentType {
  contentType: 'offer';
  title: LocalizedField<string>;
  slug: string;
  description: LocalizedField<string>;
  terms: LocalizedField<RichText>;
  // Dates
  startDate: Date;
  endDate: Date;
  // Targeting
  targetProducts?: string[];
  targetAudience?: string[];
  // Media
  badge: LocalizedField<string>;
  featuredImage: MediaAsset;
  bannerImage?: MediaAsset;
  // CTA
  ctaText: LocalizedField<string>;
  ctaUrl: string;
  // Priority
  priority: number;
  featured: boolean;
}

// ============================================
// MEDIA ASSETS
// ============================================

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt: LocalizedField<string>;
  caption?: LocalizedField<string>;
  // Variants
  variants?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    webp?: string;
  };
}

export interface DocumentAsset {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  title: LocalizedField<string>;
  description?: LocalizedField<string>;
}

// ============================================
// SEO & METADATA
// ============================================

export interface SEOMetadata {
  title: LocalizedField<string>;
  description: LocalizedField<string>;
  keywords?: LocalizedField<string[]>;
  ogImage?: MediaAsset;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

// ============================================
// RICH TEXT
// ============================================

export interface RichText {
  html: string;
  plainText: string;
  // For structured editors like Slate/ProseMirror
  raw?: unknown;
}

// ============================================
// WORKFLOW & GOVERNANCE
// ============================================

export interface ContentWorkflow {
  id: string;
  contentId: string;
  contentType: string;
  // Status
  currentStatus: 'draft' | 'pending_review' | 'approved' | 'published' | 'rejected';
  // Assignees
  author: string;
  reviewer?: string;
  approver?: string;
  // History
  history: WorkflowEvent[];
  // Dates
  createdAt: Date;
  submittedForReviewAt?: Date;
  approvedAt?: Date;
  publishedAt?: Date;
  // Scheduling
  scheduledPublishAt?: Date;
  scheduledUnpublishAt?: Date;
}

export interface WorkflowEvent {
  action: 'created' | 'updated' | 'submitted' | 'approved' | 'rejected' | 'published' | 'unpublished' | 'archived';
  user: string;
  timestamp: Date;
  comment?: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
}

// ============================================
// AUDIT LOG
// ============================================

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userRole: string;
  action: string;
  resourceType: string;
  resourceId: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ipAddress?: string;
  userAgent?: string;
}

// ============================================
// USER ROLES (CMS)
// ============================================

export type CMSRole = 'author' | 'editor' | 'approver' | 'legal' | 'admin';

export interface CMSPermissions {
  role: CMSRole;
  permissions: {
    create: string[]; // Content types
    read: string[];
    update: string[];
    delete: string[];
    publish: string[];
    approve: string[];
  };
}

export const defaultPermissions: Record<CMSRole, CMSPermissions['permissions']> = {
  author: {
    create: ['news', 'faq'],
    read: ['*'],
    update: ['news', 'faq'],
    delete: [],
    publish: [],
    approve: [],
  },
  editor: {
    create: ['news', 'faq', 'offer'],
    read: ['*'],
    update: ['news', 'faq', 'offer', 'product'],
    delete: ['news', 'faq'],
    publish: [],
    approve: [],
  },
  approver: {
    create: ['*'],
    read: ['*'],
    update: ['*'],
    delete: ['*'],
    publish: ['news', 'faq', 'offer'],
    approve: ['news', 'faq', 'offer'],
  },
  legal: {
    create: ['governance', 'financialReport'],
    read: ['*'],
    update: ['governance', 'financialReport', 'product'],
    delete: [],
    publish: ['governance', 'financialReport'],
    approve: ['governance', 'financialReport', 'product'],
  },
  admin: {
    create: ['*'],
    read: ['*'],
    update: ['*'],
    delete: ['*'],
    publish: ['*'],
    approve: ['*'],
  },
};
