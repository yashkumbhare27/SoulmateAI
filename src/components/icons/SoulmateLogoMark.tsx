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
        {/* Left Magenta-Orchid Ribbon */}
        <linearGradient id="smPinkRibbonL" x1="10" y1="15" x2="55" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C026D3" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>

        {/* Right Hot Rose & Sunset Gold Ribbon */}
        <linearGradient id="smPinkRibbonR" x1="90" y1="85" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Central Luminous Heart-Spark Node */}
        <radialGradient id="smPinkNodeGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="35%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#E11D48" />
        </radialGradient>

        {/* Outer Glow Filter */}
        <filter id="pinkGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Outer Halo */}
      <circle cx="50" cy="50" r="28" fill="url(#smPinkRibbonL)" opacity="0.15" />
      <circle cx="50" cy="50" r="18" fill="url(#smPinkNodeGlow)" opacity="0.25" filter="url(#pinkGlow)" />

      {/* Left Ribbon */}
      <path
        d="M 18 52 C 16 20, 48 16, 50 48"
        stroke="url(#smPinkRibbonL)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right Ribbon */}
      <path
        d="M 50 48 C 52 80, 84 76, 82 48"
        stroke="url(#smPinkRibbonR)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* Connecting Sparkle Lines */}
      <line x1="20" y1="46" x2="80" y2="54" stroke="#FDA4AF" strokeWidth="2.5" strokeOpacity="0.6" strokeDasharray="3 3" />
      <line x1="26" y1="30" x2="74" y2="70" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="2 2" />

      {/* Satellites Spark Nodes */}
      <circle cx="18" cy="52" r="5.5" fill="#D946EF" stroke="#FFF" strokeWidth="1.5" />
      <circle cx="82" cy="48" r="5.5" fill="#F43F5E" stroke="#FFF" strokeWidth="1.5" />
      <circle cx="34" cy="24" r="3" fill="#FDE047" />
      <circle cx="66" cy="76" r="3" fill="#FB7185" />

      {/* Central Node with Glowing Rings */}
      <circle cx="50" cy="50" r="13" fill="url(#smPinkNodeGlow)" filter="url(#pinkGlow)" />
      <circle cx="50" cy="50" r="13" fill="transparent" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.6" />
      <circle cx="50" cy="50" r="5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export default SoulmateLogoMark;
