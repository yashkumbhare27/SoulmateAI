import { ReactNode } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  online?: boolean;
  verified?: boolean;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; dot: string; verify: string; text: string }> = {
  sm: { container: 'w-8 h-8', dot: 'w-2 h-2', verify: 'w-3 h-3', text: 'text-xs' },
  md: { container: 'w-12 h-12', dot: 'w-3 h-3', verify: 'w-4 h-4', text: 'text-base' },
  lg: { container: 'w-16 h-16', dot: 'w-3.5 h-3.5', verify: 'w-5 h-5', text: 'text-xl' },
  xl: { container: 'w-24 h-24', dot: 'w-4 h-4', verify: 'w-6 h-6', text: 'text-3xl' },
};

export const Avatar = ({ src, name, size = 'md', online, verified, className = '' }: AvatarProps) => {
  const s = sizeStyles[size];
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div className={`relative inline-block ${s.container} ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-sm bg-gradient-to-br from-[#8B5FBF] to-[#E8A0BF] flex items-center justify-center text-white font-bold">
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className={`${s.text} font-display`}>{initials}</span>
        )}
      </div>

      {online && (
        <span className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-[#0F0B13] bg-green-500 ${s.dot}`} />
      )}

      {verified && !online && (
        <span className={`absolute bottom-0 right-0 flex items-center justify-center rounded-full ring-2 ring-white dark:ring-[#0F0B13] bg-[#F59E0B] text-white ${s.verify}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-2/3 h-2/3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </div>
  );
};
