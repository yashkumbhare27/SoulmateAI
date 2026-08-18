import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = ({ className = '', ...props }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/50 dark:bg-white/5 rounded-md ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = ({ className = '' }: SkeletonProps) => {
  return (
    <div className={`bg-white/5 dark:bg-black/10 backdrop-blur-md border border-slate-200/50 dark:border-white/5 rounded-[20px] p-4 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <SkeletonAvatar />
        <div className="space-y-2 flex-1">
          <SkeletonText className="w-24 h-4" />
          <SkeletonText className="w-16 h-3" />
        </div>
      </div>
      <div className="space-y-3">
        <SkeletonText className="w-full h-4" />
        <SkeletonText className="w-[90%] h-4" />
        <SkeletonText className="w-[80%] h-4" />
      </div>
    </div>
  );
};

export const SkeletonAvatar = ({ className = '' }: SkeletonProps) => {
  return <Skeleton className={`w-12 h-12 rounded-full ${className}`} />;
};

export const SkeletonText = ({ className = '' }: SkeletonProps) => {
  return <Skeleton className={`h-4 w-full rounded ${className}`} />;
};
