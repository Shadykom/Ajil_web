/**
 * AJIL Finance Design System
 * Central export for all design system components and tokens
 */

// ============================================
// TOKENS
// ============================================
export * from './tokens';
export * from './tokens/colors';
export * from './tokens/typography';
export * from './tokens/spacing';

// ============================================
// ATOMS
// ============================================
export { Button, IconButton } from './components/atoms/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize, IconButtonProps } from './components/atoms/Button/Button';

export { default as Input, NumberInput } from './components/atoms/Input/Input';
export type { InputProps, InputSize, InputState, NumberInputProps } from './components/atoms/Input/Input';

export { 
  Typography, 
  DisplayText, 
  Heading, 
  BodyText, 
  Label, 
  Caption 
} from './components/atoms/Typography/Typography';
export type { 
  TypographyProps, 
  TypographyVariant, 
  TypographyColor, 
  TypographyWeight 
} from './components/atoms/Typography/Typography';

export { Slider } from './components/atoms/Slider/Slider';
export type { SliderProps } from './components/atoms/Slider/Slider';

export { Badge, StatusBadge } from './components/atoms/Badge/Badge';
export type { BadgeProps, BadgeVariant, BadgeColor, BadgeSize, StatusBadgeProps } from './components/atoms/Badge/Badge';

// ============================================
// MOLECULES
// ============================================
export { FormField, Fieldset } from './components/molecules/FormField/FormField';
export type { FormFieldProps, FieldsetProps } from './components/molecules/FormField/FormField';

export { LanguageSwitcher } from './components/molecules/LanguageSwitcher/LanguageSwitcher';
export type { LanguageSwitcherProps, LanguageSwitcherVariant } from './components/molecules/LanguageSwitcher/LanguageSwitcher';

export { Breadcrumbs, BreadcrumbsSchema } from './components/molecules/Breadcrumbs/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/molecules/Breadcrumbs/Breadcrumbs';

export { CTABlock } from './components/molecules/CTABlock/CTABlock';
export type { CTABlockProps, CTAAction, CTAVariant } from './components/molecules/CTABlock/CTABlock';

// ============================================
// ORGANISMS
// ============================================
export { 
  ConsentBanner, 
  useConsent 
} from './components/organisms/ConsentBanner/ConsentBanner';
export type { ConsentBannerProps, ConsentCategory } from './components/organisms/ConsentBanner/ConsentBanner';

export { ProductCard } from './components/organisms/ProductCard/ProductCard';
export type { ProductCardProps, ProductFeature } from './components/organisms/ProductCard/ProductCard';

export { NewsCard, NewsArticleSchema } from './components/organisms/NewsCard/NewsCard';
export type { NewsCardProps } from './components/organisms/NewsCard/NewsCard';

export { 
  DisclosureBlock, 
  SAMADisclosure, 
  ShariahDisclosure, 
  APRDisclosure 
} from './components/organisms/DisclosureBlock/DisclosureBlock';
export type { DisclosureBlockProps, DisclosureType, APRDisclosureProps } from './components/organisms/DisclosureBlock/DisclosureBlock';
