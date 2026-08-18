'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface ProgressRingProps {
  value?: number; // 0 to 100
  progress?: number; // alias for value
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export const ProgressRing = ({
  value,
  progress,
  size = 120,
  strokeWidth = 8,
  color,
  className = '',
}: ProgressRingProps) => {
  const targetValue = value !== undefined ? value : (progress !== undefined ? progress : 0);
  const [displayValue, setDisplayValue] = useState(0);
  
  // Animate the number count up
  useEffect(() => {
    let start = 0;
    const end = Math.min(Math.max(targetValue, 0), 100);
    if (start === end) {
      setDisplayValue(end);
      return;
    }
    
    const duration = 1000;
    const incrementTime = Math.max(duration / (end || 1), 10);
    
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [targetValue]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (targetValue / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5FBF" />
            <stop offset="50%" stopColor="#E8A0BF" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200 dark:text-white/10"
        />
        
        {/* Animated progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color || "url(#ringGradient)"}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center font-display text-slate-800 dark:text-white">
        <span className="text-2xl font-bold">{displayValue}%</span>
      </div>
    </div>
  );
};

export default ProgressRing;
