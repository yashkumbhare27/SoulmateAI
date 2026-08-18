'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type Variant = 'default' | 'elevated' | 'interactive' | 'heavy' | 'ai-accent';
type Rounded = '16' | '20' | '24';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: Variant;
  rounded?: Rounded;
  glowEffect?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]',
  elevated: 'bg-white/15 dark:bg-black/30 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-[0_16px_40px_0_rgba(31,38,135,0.15)]',
  interactive: 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-white/20 dark:hover:bg-black/30 transition-all',
  heavy: 'bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-xl',
  'ai-accent': 'bg-gradient-to-br from-[#8B5FBF]/20 to-[#E8A0BF]/20 dark:from-[#8B5FBF]/10 dark:to-[#E8A0BF]/10 backdrop-blur-lg border border-[#F59E0B]/30 shadow-[0_8px_32px_0_rgba(245,158,11,0.1)]'
};

const roundedStyles: Record<Rounded, string> = {
  '16': 'rounded-[16px]',
  '20': 'rounded-[20px]',
  '24': 'rounded-[24px]',
};

export const GlassCard = ({
  variant = 'default',
  rounded = '20',
  glowEffect = false,
  className = '',
  children,
  ...props
}: GlassCardProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${variantStyles[variant]} ${roundedStyles[rounded]} ${className}`}
      {...props}
    >
      {/* Specular highlight gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      
      {glowEffect && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8B5FBF] via-[#E8A0BF] to-[#F59E0B] opacity-20 blur-xl pointer-events-none" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
