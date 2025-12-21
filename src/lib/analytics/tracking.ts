/**
 * AJIL Analytics & Event Tracking
 * GA4/Adobe-ready structure with consent awareness
 */

// Check if user has given analytics consent
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('ajil_cookie_consent');
    if (consent) {
      const parsed = JSON.parse(consent);
      return parsed.preferences?.analytics === true;
    }
  } catch {
    // No consent given
  }
  return false;
}

// Event categories
export type EventCategory =
  | 'engagement'
  | 'conversion'
  | 'navigation'
  | 'calculator'
  | 'form'
  | 'download'
  | 'video'
  | 'error';

// Standard event interface
export interface TrackingEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, string | number | boolean>;
}

// Page view data
export interface PageViewData {
  path: string;
  title: string;
  language: 'ar' | 'en';
  referrer?: string;
  customDimensions?: Record<string, string>;
}

// User properties
export interface UserProperties {
  userType?: 'individual' | 'business' | 'unknown';
  preferredLanguage?: 'ar' | 'en';
  hasApplied?: boolean;
  segment?: string;
}

// DataLayer interface for GTM
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize DataLayer
export function initializeDataLayer(): void {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
}

// Push to DataLayer (GTM)
function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

// Track page view
export function trackPageView(data: PageViewData): void {
  if (!hasAnalyticsConsent()) {
    console.log('[Analytics] Page view blocked - no consent');
    return;
  }

  pushToDataLayer({
    event: 'page_view',
    page_path: data.path,
    page_title: data.title,
    page_language: data.language,
    page_referrer: data.referrer,
    ...data.customDimensions,
  });

  // Also send to GA4 if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: data.path,
      page_title: data.title,
      page_language: data.language,
    });
  }

  console.log('[Analytics] Page view tracked:', data.path);
}

// Track custom event
export function trackEvent(event: TrackingEvent): void {
  if (!hasAnalyticsConsent()) {
    console.log('[Analytics] Event blocked - no consent:', event.action);
    return;
  }

  const eventData = {
    event: event.action,
    event_category: event.category,
    event_label: event.label,
    event_value: event.value,
    ...event.customDimensions,
  };

  pushToDataLayer(eventData);

  // Also send to GA4 if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customDimensions,
    });
  }

  console.log('[Analytics] Event tracked:', event.action);
}

// Set user properties
export function setUserProperties(properties: UserProperties): void {
  if (!hasAnalyticsConsent()) return;

  pushToDataLayer({
    event: 'set_user_properties',
    ...properties,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('set', 'user_properties', properties);
  }
}

// ============================================
// PRE-DEFINED EVENT HELPERS
// ============================================

// Calculator events
export const calculatorEvents = {
  started: (calculatorType: string) =>
    trackEvent({
      category: 'calculator',
      action: 'calculator_started',
      label: calculatorType,
    }),
  
  completed: (calculatorType: string, result: { amount: number; tenure: number; monthlyPayment: number }) =>
    trackEvent({
      category: 'calculator',
      action: 'calculator_completed',
      label: calculatorType,
      customDimensions: {
        calc_amount: result.amount,
        calc_tenure: result.tenure,
        calc_monthly: result.monthlyPayment,
      },
    }),
  
  scheduleViewed: (calculatorType: string) =>
    trackEvent({
      category: 'calculator',
      action: 'payment_schedule_viewed',
      label: calculatorType,
    }),
  
  applyCTAClicked: (calculatorType: string, amount: number) =>
    trackEvent({
      category: 'conversion',
      action: 'apply_cta_clicked',
      label: calculatorType,
      value: amount,
    }),
};

// Form events
export const formEvents = {
  started: (formName: string) =>
    trackEvent({
      category: 'form',
      action: 'form_started',
      label: formName,
    }),
  
  stepCompleted: (formName: string, step: number, stepName: string) =>
    trackEvent({
      category: 'form',
      action: 'form_step_completed',
      label: formName,
      customDimensions: {
        form_step: step,
        form_step_name: stepName,
      },
    }),
  
  submitted: (formName: string, referenceNumber?: string) =>
    trackEvent({
      category: 'conversion',
      action: 'form_submitted',
      label: formName,
      customDimensions: {
        reference_number: referenceNumber || 'N/A',
      },
    }),
  
  error: (formName: string, errorField: string, errorMessage: string) =>
    trackEvent({
      category: 'form',
      action: 'form_error',
      label: formName,
      customDimensions: {
        error_field: errorField,
        error_message: errorMessage,
      },
    }),
  
  abandoned: (formName: string, lastStep: number) =>
    trackEvent({
      category: 'form',
      action: 'form_abandoned',
      label: formName,
      customDimensions: {
        last_step: lastStep,
      },
    }),
};

// Navigation events
export const navigationEvents = {
  menuClicked: (menuItem: string, menuLevel: 'primary' | 'secondary') =>
    trackEvent({
      category: 'navigation',
      action: 'menu_clicked',
      label: menuItem,
      customDimensions: {
        menu_level: menuLevel,
      },
    }),
  
  languageChanged: (newLanguage: 'ar' | 'en') =>
    trackEvent({
      category: 'navigation',
      action: 'language_changed',
      label: newLanguage,
    }),
  
  branchLocatorUsed: (city?: string) =>
    trackEvent({
      category: 'navigation',
      action: 'branch_locator_used',
      label: city || 'all',
    }),
  
  searchPerformed: (query: string, resultsCount: number) =>
    trackEvent({
      category: 'navigation',
      action: 'search_performed',
      label: query,
      value: resultsCount,
    }),
};

// Engagement events
export const engagementEvents = {
  scrollDepth: (depth: 25 | 50 | 75 | 100, pagePath: string) =>
    trackEvent({
      category: 'engagement',
      action: 'scroll_depth',
      label: pagePath,
      value: depth,
    }),
  
  timeOnPage: (seconds: number, pagePath: string) =>
    trackEvent({
      category: 'engagement',
      action: 'time_on_page',
      label: pagePath,
      value: seconds,
    }),
  
  ctaClicked: (ctaText: string, ctaLocation: string, destination?: string) =>
    trackEvent({
      category: 'engagement',
      action: 'cta_clicked',
      label: ctaText,
      customDimensions: {
        cta_location: ctaLocation,
        cta_destination: destination || 'N/A',
      },
    }),
  
  videoPlayed: (videoTitle: string, videoDuration: number) =>
    trackEvent({
      category: 'video',
      action: 'video_played',
      label: videoTitle,
      value: videoDuration,
    }),
  
  documentDownloaded: (documentName: string, documentType: string) =>
    trackEvent({
      category: 'download',
      action: 'document_downloaded',
      label: documentName,
      customDimensions: {
        document_type: documentType,
      },
    }),
};

// Conversion events
export const conversionEvents = {
  leadGenerated: (productType: string, leadSource: string) =>
    trackEvent({
      category: 'conversion',
      action: 'lead_generated',
      label: productType,
      customDimensions: {
        lead_source: leadSource,
      },
    }),
  
  applicationStarted: (productType: string) =>
    trackEvent({
      category: 'conversion',
      action: 'application_started',
      label: productType,
    }),
  
  applicationSubmitted: (productType: string, amount: number, referenceNumber: string) =>
    trackEvent({
      category: 'conversion',
      action: 'application_submitted',
      label: productType,
      value: amount,
      customDimensions: {
        reference_number: referenceNumber,
      },
    }),
  
  newsletterSignup: (source: string) =>
    trackEvent({
      category: 'conversion',
      action: 'newsletter_signup',
      label: source,
    }),
};

// Error tracking
export const errorEvents = {
  pageNotFound: (attemptedUrl: string) =>
    trackEvent({
      category: 'error',
      action: '404_error',
      label: attemptedUrl,
    }),
  
  apiError: (endpoint: string, errorCode: number, errorMessage: string) =>
    trackEvent({
      category: 'error',
      action: 'api_error',
      label: endpoint,
      value: errorCode,
      customDimensions: {
        error_message: errorMessage,
      },
    }),
  
  jsError: (errorMessage: string, errorStack?: string) =>
    trackEvent({
      category: 'error',
      action: 'js_error',
      label: errorMessage,
      customDimensions: {
        error_stack: errorStack?.substring(0, 500) || 'N/A',
      },
    }),
};

// ============================================
// FEATURE FLAG & A/B TESTING HOOKS
// ============================================

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  variant?: string;
}

// Get feature flags (would connect to feature flag service)
export function getFeatureFlag(flagName: string): FeatureFlag {
  // This would typically connect to a feature flag service
  // For now, return a default implementation
  const defaultFlags: Record<string, FeatureFlag> = {
    new_calculator: { name: 'new_calculator', enabled: false },
    simplified_apply_form: { name: 'simplified_apply_form', enabled: false },
    dark_mode: { name: 'dark_mode', enabled: true },
  };

  return defaultFlags[flagName] || { name: flagName, enabled: false };
}

// Track A/B test exposure
export function trackExperiment(experimentId: string, variant: string): void {
  trackEvent({
    category: 'engagement',
    action: 'experiment_viewed',
    label: experimentId,
    customDimensions: {
      experiment_variant: variant,
    },
  });
}

// ============================================
// SCROLL TRACKING HOOK
// ============================================

export function initScrollTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  const milestones = [25, 50, 75, 100];
  const tracked = new Set<number>();
  const pagePath = window.location.pathname;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        engagementEvents.scrollDepth(milestone as 25 | 50 | 75 | 100, pagePath);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}
