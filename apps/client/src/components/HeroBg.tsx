import React from 'react';

export const HeroBg: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#08080a] select-none">
      {/* Deep Space Radial Purple Ambient Nebula */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#08080a] via-purple-950/20 to-transparent pointer-events-none" />

      {/* SVG Stars & Atmospheric Mountains */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Horizon Glow Gradient */}
          <linearGradient id="horizonGlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#4C1D95" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="0" />
          </linearGradient>

          {/* Far Mountain Gradient */}
          <linearGradient id="farMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1528" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a0a0e" stopOpacity="1" />
          </linearGradient>

          {/* Mid Mountain Gradient */}
          <linearGradient id="midMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#13101c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="1" />
          </linearGradient>

          {/* Near Mountain Gradient */}
          <linearGradient id="nearMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d0c14" stopOpacity="1" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Stars Layer */}
        <g opacity="0.6">
          <circle cx="120" cy="80" r="1" fill="#fff" opacity="0.8" />
          <circle cx="340" cy="150" r="1.5" fill="#fff" opacity="0.6" />
          <circle cx="560" cy="60" r="1" fill="#c084fc" opacity="0.9" />
          <circle cx="780" cy="190" r="1.2" fill="#fff" opacity="0.5" />
          <circle cx="920" cy="110" r="1" fill="#fff" opacity="0.7" />
          <circle cx="1100" cy="70" r="1.5" fill="#e9d5ff" opacity="0.8" />
          <circle cx="1300" cy="140" r="1" fill="#fff" opacity="0.6" />
          <circle cx="230" cy="220" r="1" fill="#fff" opacity="0.4" />
          <circle cx="450" cy="280" r="1.2" fill="#fff" opacity="0.7" />
          <circle cx="670" cy="210" r="1" fill="#fff" opacity="0.5" />
          <circle cx="890" cy="250" r="1.5" fill="#c084fc" opacity="0.6" />
          <circle cx="1150" cy="200" r="1" fill="#fff" opacity="0.9" />
          <circle cx="1380" cy="260" r="1" fill="#fff" opacity="0.4" />
        </g>

        {/* Soft Purple Glow Behind Horizon */}
        <rect x="0" y="350" width="1440" height="300" fill="url(#horizonGlow)" />

        {/* Background Mountain Peaks Layer */}
        <path
          d="M0 620 L150 480 L280 540 L420 420 L580 510 L720 390 L880 490 L1020 410 L1180 520 L1320 440 L1440 490 L1440 900 L0 900 Z"
          fill="url(#farMountainGrad)"
        />

        {/* Middle Mountain Layer */}
        <path
          d="M0 670 L180 540 L340 600 L510 470 L680 570 L850 450 L1010 550 L1200 480 L1360 560 L1440 520 L1440 900 L0 900 Z"
          fill="url(#midMountainGrad)"
        />

        {/* Foreground Mountain Silhouettes Layer */}
        <path
          d="M0 720 L120 640 L260 700 L440 560 L620 680 L790 530 L960 650 L1140 580 L1310 660 L1440 600 L1440 900 L0 900 Z"
          fill="url(#nearMountainGrad)"
        />
      </svg>

      {/* Dark Overlay Gradient for Readable Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-[#08080a]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/80 via-transparent to-transparent" />
    </div>
  );
};
