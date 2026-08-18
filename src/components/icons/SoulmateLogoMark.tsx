import { SVGProps } from 'react';

export interface SoulmateLogoMarkProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  monochrome?: boolean;
}

export const SoulmateLogoMark = ({
  size = 32,
  className = '',
  monochrome = false,
  ...props
}: SoulmateLogoMarkProps) => {
  if (monochrome) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <path d="M20 50 C20 30, 45 20, 50 50 C55 80, 80 70, 80 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="50" r="12" fill="currentColor" />
        <circle cx="80" cy="50" r="6" fill="currentColor" />
        <circle cx="20" cy="50" r="6" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="leftRibbon" x1="20" y1="50" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5FBF" />
          <stop offset="1" stopColor="#E8A0BF" />
        </linearGradient>
        <linearGradient id="rightRibbon" x1="50" y1="50" x2="80" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8A0BF" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="centerNode" cx="0.5" cy="0.5" r="0.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="1" stopColor="#F59E0B" />
        </radialGradient>
      </defs>

      {/* Left Ribbon */}
      <path
        d="M20 50 C20 15, 50 15, 50 50"
        stroke="url(#leftRibbon)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right Ribbon */}
      <path
        d="M50 50 C50 85, 80 85, 80 50"
        stroke="url(#rightRibbon)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Connecting minimal lines */}
      <line x1="20" y1="50" x2="80" y2="50" stroke="#E8A0BF" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="4 4" />

      {/* Satellite Nodes */}
      <circle cx="20" cy="50" r="6" fill="#8B5FBF" />
      <circle cx="80" cy="50" r="6" fill="#F59E0B" />

      {/* Center Node */}
      <circle cx="50" cy="50" r="14" fill="url(#centerNode)" className="shadow-lg" />
      <circle cx="50" cy="50" r="14" fill="transparent" stroke="#fff" strokeWidth="2" strokeOpacity="0.3" />
    </svg>
  );
};

export default SoulmateLogoMark;
