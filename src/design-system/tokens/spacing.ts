/**
 * AJIL Finance Design System - Spacing Tokens
 * Based on 8px grid system
 */

// Base unit - 8px grid
const BASE_UNIT = 8;

// Spacing scale (px values, use rem in implementation)
export const spacing = {
  // Micro spacing (0-8px)
  px: '1px',
  '0': '0',
  '0.5': `${BASE_UNIT * 0.5}px`, // 4px
  '1': `${BASE_UNIT * 1}px`, // 8px
  '1.5': `${BASE_UNIT * 1.5}px`, // 12px
  '2': `${BASE_UNIT * 2}px`, // 16px
  '2.5': `${BASE_UNIT * 2.5}px`, // 20px
  '3': `${BASE_UNIT * 3}px`, // 24px
  '3.5': `${BASE_UNIT * 3.5}px`, // 28px
  '4': `${BASE_UNIT * 4}px`, // 32px
  '5': `${BASE_UNIT * 5}px`, // 40px
  '6': `${BASE_UNIT * 6}px`, // 48px
  '7': `${BASE_UNIT * 7}px`, // 56px
  '8': `${BASE_UNIT * 8}px`, // 64px
  '9': `${BASE_UNIT * 9}px`, // 72px
  '10': `${BASE_UNIT * 10}px`, // 80px
  '11': `${BASE_UNIT * 11}px`, // 88px
  '12': `${BASE_UNIT * 12}px`, // 96px
  '14': `${BASE_UNIT * 14}px`, // 112px
  '16': `${BASE_UNIT * 16}px`, // 128px
  '20': `${BASE_UNIT * 20}px`, // 160px
  '24': `${BASE_UNIT * 24}px`, // 192px
  '28': `${BASE_UNIT * 28}px`, // 224px
  '32': `${BASE_UNIT * 32}px`, // 256px
  '36': `${BASE_UNIT * 36}px`, // 288px
  '40': `${BASE_UNIT * 40}px`, // 320px
  '44': `${BASE_UNIT * 44}px`, // 352px
  '48': `${BASE_UNIT * 48}px`, // 384px
  '52': `${BASE_UNIT * 52}px`, // 416px
  '56': `${BASE_UNIT * 56}px`, // 448px
  '60': `${BASE_UNIT * 60}px`, // 480px
  '64': `${BASE_UNIT * 64}px`, // 512px
  '72': `${BASE_UNIT * 72}px`, // 576px
  '80': `${BASE_UNIT * 80}px`, // 640px
  '96': `${BASE_UNIT * 96}px`, // 768px
} as const;

// Semantic spacing tokens
export const semanticSpacing = {
  // Component internal spacing
  component: {
    xs: spacing['1'], // 8px
    sm: spacing['2'], // 16px
    md: spacing['3'], // 24px
    lg: spacing['4'], // 32px
    xl: spacing['6'], // 48px
  },
  // Section padding
  section: {
    xs: spacing['4'], // 32px
    sm: spacing['8'], // 64px
    md: spacing['12'], // 96px
    lg: spacing['16'], // 128px
    xl: spacing['20'], // 160px
  },
  // Container/Layout
  container: {
    padding: {
      mobile: spacing['4'], // 32px (16px each side)
      tablet: spacing['6'], // 48px
      desktop: spacing['8'], // 64px
    },
    maxWidth: '1440px',
    contentMaxWidth: '1200px',
  },
  // Stack spacing (vertical rhythm)
  stack: {
    xs: spacing['1'], // 8px
    sm: spacing['2'], // 16px
    md: spacing['4'], // 32px
    lg: spacing['6'], // 48px
    xl: spacing['8'], // 64px
  },
  // Inline spacing (horizontal)
  inline: {
    xs: spacing['1'], // 8px
    sm: spacing['2'], // 16px
    md: spacing['3'], // 24px
    lg: spacing['4'], // 32px
    xl: spacing['6'], // 48px
  },
  // Form elements
  form: {
    gap: spacing['3'], // 24px between fields
    labelGap: spacing['1'], // 8px between label and input
    inputPadding: {
      x: spacing['2'], // 16px
      y: spacing['1.5'], // 12px
    },
    helperGap: spacing['0.5'], // 4px for helper/error text
  },
  // Card spacing
  card: {
    padding: {
      sm: spacing['3'], // 24px
      md: spacing['4'], // 32px
      lg: spacing['6'], // 48px
    },
    gap: spacing['2'], // 16px between elements
  },
  // Button spacing
  button: {
    padding: {
      sm: { x: spacing['2'], y: spacing['1'] }, // 16px x 8px
      md: { x: spacing['3'], y: spacing['1.5'] }, // 24px x 12px
      lg: { x: spacing['4'], y: spacing['2'] }, // 32px x 16px
    },
    gap: spacing['1'], // 8px icon gap
  },
  // Navigation spacing
  nav: {
    itemPadding: spacing['2'], // 16px
    menuGap: spacing['1'], // 8px
    dropdownPadding: spacing['1.5'], // 12px
  },
} as const;

// Border radius tokens
export const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

// Semantic border radius
export const semanticRadius = {
  button: {
    sm: borderRadius.md, // 8px
    md: borderRadius.lg, // 12px
    lg: borderRadius.xl, // 16px
    pill: borderRadius.full,
  },
  input: borderRadius.lg, // 12px
  card: borderRadius.xl, // 16px
  modal: borderRadius['2xl'], // 20px
  badge: borderRadius.full,
  avatar: borderRadius.full,
  tag: borderRadius.md, // 8px
} as const;

// Shadow/Elevation tokens
export const elevation = {
  0: 'none',
  1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  2: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  3: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  5: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  6: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

// Semantic elevation
export const semanticElevation = {
  card: elevation[2],
  cardHover: elevation[4],
  dropdown: elevation[4],
  modal: elevation[5],
  toast: elevation[4],
  tooltip: elevation[3],
  sticky: elevation[2],
  fab: elevation[4],
} as const;

// Glow effects (AJIL brand)
export const glowEffects = {
  primary: {
    sm: '0 0 15px rgba(0, 102, 179, 0.3)',
    md: '0 0 30px rgba(0, 102, 179, 0.4)',
    lg: '0 0 50px rgba(0, 102, 179, 0.5)',
  },
  secondary: {
    sm: '0 0 15px rgba(247, 148, 29, 0.3)',
    md: '0 0 30px rgba(247, 148, 29, 0.4)',
    lg: '0 0 50px rgba(247, 148, 29, 0.5)',
  },
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// CSS Custom Properties
export const cssSpacingVariables = `
  --spacing-0: ${spacing['0']};
  --spacing-1: ${spacing['1']};
  --spacing-2: ${spacing['2']};
  --spacing-3: ${spacing['3']};
  --spacing-4: ${spacing['4']};
  --spacing-5: ${spacing['5']};
  --spacing-6: ${spacing['6']};
  --spacing-8: ${spacing['8']};
  --spacing-10: ${spacing['10']};
  --spacing-12: ${spacing['12']};
  --spacing-16: ${spacing['16']};
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
  --radius-full: ${borderRadius.full};
  --elevation-1: ${elevation[1]};
  --elevation-2: ${elevation[2]};
  --elevation-3: ${elevation[3]};
  --elevation-4: ${elevation[4]};
  --elevation-5: ${elevation[5]};
`;

export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof borderRadius;
export type ElevationKey = keyof typeof elevation;
