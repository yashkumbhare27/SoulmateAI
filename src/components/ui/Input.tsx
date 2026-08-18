'use client';

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full bg-white/50 dark:bg-black/30 backdrop-blur-md 
            border transition-all duration-200 rounded-xl px-4 py-2.5 
            text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-[#8B5FBF]/50
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500/50 focus:border-red-500' 
              : 'border-slate-200 dark:border-white/10 focus:border-[#8B5FBF]'
            }
          `}
          {...props}
        />
      </div>
      
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
