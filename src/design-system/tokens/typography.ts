/**
 * AJIL Finance Design System - Typography Tokens
 * Arabic-first with English fallbacks | WCAG 2.2 AA Compliant
 */

// Font Families
export const fontFamilies = {
  // Arabic Primary - GE SS Two (Corporate)
  arabic: {
    primary: '"GE SS Two", Cairo, "IBM Plex Sans Arabic", system-ui, sans-serif',
    secondary: 'Cairo, "IBM Plex Sans Arabic", system-ui, sans-serif',
  },
  // English Fallback
  english: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    secondary: '"Roboto", "Helvetica Neue", Arial, sans-serif',
  },
  // Mono for numbers/code
  mono: '"IBM Plex Mono Arabic", "IBM Plex Mono", "Fira Code", Consolas, monospace',
} as const;

// Font Weights
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// Type Scale - Based on 16px base, 1.25 ratio (Major Third)
// All sizes include Arabic optimizations (slightly larger for readability)
export const typeScale = {
  // Display - Hero headings
  display: {
    '2xl': {
      fontSize: '4.5rem', // 72px
      lineHeight: '1.1',
      letterSpacing: '-0.025em',
      fontWeight: fontWeights.bold,
    },
    xl: {
      fontSize: '3.75rem', // 60px
      lineHeight: '1.1',
      letterSpacing: '-0.025em',
      fontWeight: fontWeights.bold,
    },
    lg: {
      fontSize: '3rem', // 48px
      lineHeight: '1.15',
      letterSpacing: '-0.02em',
      fontWeight: fontWeights.bold,
    },
    md: {
      fontSize: '2.25rem', // 36px
      lineHeight: '1.2',
      letterSpacing: '-0.015em',
      fontWeight: fontWeights.bold,
    },
    sm: {
      fontSize: '1.875rem', // 30px
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
      fontWeight: fontWeights.semibold,
    },
  },
  // Headings
  heading: {
    h1: {
      fontSize: '2.25rem', // 36px
      lineHeight: '1.25',
      letterSpacing: '-0.015em',
      fontWeight: fontWeights.bold,
    },
    h2: {
      fontSize: '1.875rem', // 30px
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: fontWeights.bold,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.35',
      letterSpacing: '-0.005em',
      fontWeight: fontWeights.semibold,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: fontWeights.semibold,
    },
    h5: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.45',
      letterSpacing: '0',
      fontWeight: fontWeights.medium,
    },
    h6: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      letterSpacing: '0',
      fontWeight: fontWeights.medium,
    },
  },
  // Body text
  body: {
    xl: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75',
      letterSpacing: '0',
      fontWeight: fontWeights.regular,
    },
    lg: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.75',
      letterSpacing: '0',
      fontWeight: fontWeights.regular,
    },
    md: {
      fontSize: '1rem', // 16px - Base
      lineHeight: '1.75',
      letterSpacing: '0',
      fontWeight: fontWeights.regular,
    },
    sm: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.65',
      letterSpacing: '0.01em',
      fontWeight: fontWeights.regular,
    },
    xs: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.6',
      letterSpacing: '0.015em',
      fontWeight: fontWeights.regular,
    },
  },
  // Labels/Captions
  label: {
    lg: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.4',
      letterSpacing: '0.02em',
      fontWeight: fontWeights.medium,
    },
    md: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.4',
      letterSpacing: '0.02em',
      fontWeight: fontWeights.medium,
    },
    sm: {
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.35',
      letterSpacing: '0.025em',
      fontWeight: fontWeights.medium,
    },
  },
  // Button text
  button: {
    lg: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      letterSpacing: '0.01em',
      fontWeight: fontWeights.semibold,
    },
    md: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      letterSpacing: '0.015em',
      fontWeight: fontWeights.semibold,
    },
    sm: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.5',
      letterSpacing: '0.02em',
      fontWeight: fontWeights.semibold,
    },
  },
} as const;

// Arabic-specific adjustments
export const arabicTypographyOverrides = {
  // Arabic text typically needs more line height
  lineHeightMultiplier: 1.1,
  // Arabic text often needs slightly larger size for same perceived size
  sizeMultiplier: 1.05,
  // Disable letter-spacing for Arabic (interferes with character connections)
  letterSpacing: '0',
} as const;

// Responsive Typography (Mobile-first breakpoints)
export const responsiveTypeScale = {
  // Mobile (default)
  base: {
    displayXl: '2.5rem', // 40px
    displayLg: '2rem', // 32px
    h1: '1.75rem', // 28px
    h2: '1.5rem', // 24px
    h3: '1.25rem', // 20px
    h4: '1.125rem', // 18px
    body: '1rem', // 16px
  },
  // Tablet (640px+)
  sm: {
    displayXl: '3rem', // 48px
    displayLg: '2.5rem', // 40px
    h1: '2rem', // 32px
    h2: '1.75rem', // 28px
    h3: '1.375rem', // 22px
    h4: '1.125rem', // 18px
    body: '1rem', // 16px
  },
  // Desktop (1024px+)
  lg: {
    displayXl: '4.5rem', // 72px
    displayLg: '3rem', // 48px
    h1: '2.25rem', // 36px
    h2: '1.875rem', // 30px
    h3: '1.5rem', // 24px
    h4: '1.25rem', // 20px
    body: '1rem', // 16px
  },
} as const;

// Text decoration utilities
export const textDecorations = {
  underline: {
    textDecoration: 'underline',
    textDecorationThickness: '2px',
    textUnderlineOffset: '4px',
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  none: {
    textDecoration: 'none',
  },
} as const;

// Text transforms
export const textTransforms = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  none: 'none',
} as const;

// CSS Custom Properties
export const cssTypographyVariables = `
  --font-family-arabic: ${fontFamilies.arabic.primary};
  --font-family-arabic-secondary: ${fontFamilies.arabic.secondary};
  --font-family-english: ${fontFamilies.english.primary};
  --font-family-mono: ${fontFamilies.mono};
  --font-weight-light: ${fontWeights.light};
  --font-weight-regular: ${fontWeights.regular};
  --font-weight-medium: ${fontWeights.medium};
  --font-weight-semibold: ${fontWeights.semibold};
  --font-weight-bold: ${fontWeights.bold};
  --font-weight-extrabold: ${fontWeights.extrabold};
`;

export type TypeScaleKey = keyof typeof typeScale;
export type FontWeight = keyof typeof fontWeights;
