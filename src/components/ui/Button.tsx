'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ai' | 'pink' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-[#FF2E93] via-[#EC4899] to-[#D946EF] text-white shadow-[0_4px_20px_rgba(244,63,94,0.35)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.55)] border border-white/25',
  pink: 'bg-gradient-to-r from-[#F43F5E] to-[#FB7185] text-white shadow-[0_4px_18px_rgba(244,63,94,0.35)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.5)] border border-white/20',
  secondary: 'bg-white/80 dark:bg-plum-card/80 backdrop-blur-md border border-pink-300/40 dark:border-pink-500/25 text-plum-black dark:text-cream hover:bg-white dark:hover:bg-plum-hover shadow-sm hover:shadow-[0_4px_20px_rgba(244,63,94,0.15)]',
  outline: 'bg-transparent border-2 border-pink-500/60 text-pink-600 dark:text-pink-400 hover:bg-pink-500/10 shadow-sm',
  ghost: 'bg-transparent text-plum-black/80 dark:text-cream/80 hover:bg-pink-500/10 hover:text-pink-600 dark:hover:text-pink-400',
  ai: 'bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F43F5E] text-white font-bold shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_30px_rgba(244,63,94,0.45)] border border-yellow-200/40'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-xl',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-2xl',
  lg: 'px-7 py-3.5 text-base font-bold rounded-[22px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseClasses = `relative inline-flex items-center justify-center font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden active:scale-95 cursor-pointer`;
  
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {/* Specular highlight rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
