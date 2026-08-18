import { Transition, Variants } from 'framer-motion';

export const colors = {
  primary: '#8B5FBF',
  secondary: '#E8A0BF',
  aiAccent: '#F59E0B',
  dark: {
    plumBlack: '#0F0B13',
    plumCard: '#171221',
    plumHover: '#211A2E',
    plumBorder: '#2E243D',
  },
  light: {
    cream: '#FCFAF7',
    warmWhite: '#F5F1EB',
    parchment: '#EDE8E0',
  },
  neutrals: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

export const typography = {
  scale: {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    base: { fontSize: '1rem', lineHeight: '1.5rem' },
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { fontSize: '3rem', lineHeight: '1' },
    '6xl': { fontSize: '3.75rem', lineHeight: '1' },
  }
};

export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

export const borderRadius = {
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
  glass: '20px',
  glassLg: '24px',
};

export const shadows = {
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  glassHover: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
  softLg: '0 10px 40px -5px rgba(0, 0, 0, 0.08)',
};

/**
 * Springs
 */
export const springs = {
  snappy: { type: 'spring' as const, stiffness: 400, damping: 25 },
  gentle: { type: 'spring' as const, stiffness: 120, damping: 14 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15 },
  slow: { type: 'spring' as const, stiffness: 50, damping: 10 },
  cardSwipe: { type: 'spring' as const, stiffness: 200, damping: 20 },
};

/**
 * Durations
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  moderate: 0.5,
  slow: 0.75,
  deliberate: 1.2,
};

/**
 * Easing Curves
 */
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeInOutCubic: [0.645, 0.045, 0.355, 1] as const,
  easeOutQuint: [0.23, 1, 0.32, 1] as const,
  bloomIn: [0.17, 0.89, 0.32, 1.2] as const,
};

/**
 * Stagger Delays
 */
export const stagger = {
  fast: 0.04,
  medium: 0.08,
  slow: 0.12,
};

export const motionTokens = {
  springConfigs: springs,
  duration: durations,
  easing: easings,
  stagger: stagger,
};

export const pageTransitions = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: durations.normal, ease: easings.easeOutQuint } },
  exit: { opacity: 0, y: -10, transition: { duration: durations.fast } },
};

export const cardStaggerVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.medium,
      }
    }
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: springs.gentle }
  } as Variants
};

export const cardStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.medium,
      delayChildren: 0.05,
    },
  },
};

export const cardStaggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.moderate,
      ease: easings.easeOutExpo,
    },
  },
};

export const scoreRevealAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: springs.bouncy },
};

export const swipeCardPhysics = {
  dragElastic: 0.65,
  threshold: 120,
  exitVariants: {
    left: { x: -1000, opacity: 0, transition: { duration: 0.4 } },
    right: { x: 1000, opacity: 0, transition: { duration: 0.4 } },
  }
};
