/**
 * AJIL Finance Design System - Token Index
 * Central export for all design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';

// Animation tokens
export const animations = {
  // Duration
  duration: {
    instant: '0ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  // Easing
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
  },
  // Predefined transitions
  transitions: {
    all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 150ms ease, background-color 150ms ease, border-color 150ms ease',
    opacity: 'opacity 150ms ease',
    transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 200ms ease',
  },
} as const;

// Breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Media queries
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  // Motion preferences
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersColorScheme: {
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  // Touch/hover capabilities
  canHover: '(hover: hover) and (pointer: fine)',
  isTouch: '(hover: none) and (pointer: coarse)',
} as const;

// Complete design tokens export
export const designTokens = {
  animations,
  breakpoints,
  mediaQueries,
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type Duration = keyof typeof animations.duration;
export type Easing = keyof typeof animations.easing;
