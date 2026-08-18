import { ReactNode } from 'react';

type BadgeType = 'id-verified' | 'video-verified' | 'family-verified' | 'premium';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  type: BadgeType;
  size?: BadgeSize;
  className?: string;
}

const config: Record<BadgeType, { label: string; colors: string; icon: ReactNode }> = {
  'id-verified': {
    label: 'ID Verified',
    colors: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  'video-verified': {
    label: 'Video Verified',
    colors: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    )
  },
  'family-verified': {
    label: 'Family Verified',
    colors: 'bg-purple-100 text-purple-700 dark:bg-[#8B5FBF]/20 dark:text-[#E8A0BF] border-purple-200 dark:border-[#8B5FBF]/30',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    )
  },
  'premium': {
    label: 'Premium',
    colors: 'bg-yellow-100 text-yellow-700 dark:bg-[#F59E0B]/20 dark:text-[#FCD34D] border-yellow-200 dark:border-[#F59E0B]/30',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    )
  }
};

const sizeStyles: Record<BadgeSize, { badge: string; icon: string }> = {
  sm: { badge: 'px-2 py-0.5 text-xs', icon: 'w-3 h-3 mr-1' },
  md: { badge: 'px-2.5 py-1 text-sm', icon: 'w-4 h-4 mr-1.5' },
};

export const Badge = ({ type, size = 'md', className = '' }: BadgeProps) => {
  const { label, colors, icon } = config[type];
  const { badge, icon: iconSize } = sizeStyles[size];

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colors} ${badge} ${className}`}>
      <span className={iconSize}>{icon}</span>
      {label}
    </span>
  );
};
