'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ai';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-[#8B5FBF] to-[#E8A0BF] text-white shadow-md hover:shadow-lg',
  secondary: 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-black/30',
  ghost: 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10',
  ai: 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-[#0F0B13] shadow-md hover:shadow-lg font-medium'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-base rounded-2xl',
  lg: 'px-6 py-3 text-lg rounded-[20px]',
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
  const baseClasses = `relative inline-flex items-center justify-center font-body transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5FBF]/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`;
  
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
});

Button.displayName = 'Button';
