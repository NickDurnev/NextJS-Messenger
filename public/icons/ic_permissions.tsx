import React from 'react';

const IcPermissions = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 375 521"
      id="vector"
      className={className}
    >
      <defs>
        <clipPath id="clip_path">
          <path d="M 0 0 L 375 0 L 375 521 L 0 521 Z" />
        </clipPath>
        <clipPath id="clip_path_1">
          <path d="M 0 0 L 375 0 L 375 521 L 0 521 Z" />
        </clipPath>
        <clipPath id="clip_path_2">
          <path d="M 0 0 L 375 0 L 375 521 L 0 521 Z" />
        </clipPath>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#EDF4FA" />
          <stop offset="11.8%" stopColor="#ECF3F9FB" />
          <stop offset="24.2%" stopColor="#EAF1F6EE" />
          <stop offset="36.8%" stopColor="#E8EDF2D9" />
          <stop offset="45.5%" stopColor="#E4E8EBBC" />
          <stop offset="62.4%" stopColor="#DFE1E396" />
          <stop offset="75.4%" stopColor="#D9D9D968" />
          <stop offset="88.3%" stopColor="#D2CFCE33" />
          <stop offset="94%" stopColor="#CFCBC919" />
          <stop offset="100%" stopColor="#CCC7C400" />
        </linearGradient>
        <linearGradient
          id="gradient2"
          x1={'0%'}
          x2={'100%'}
          y1={'100%'}
          y2={'0%'}
          gradientTransform={'rotate(0)'}
        >
          <stop offset="0%" stopColor="#EDF4FA" />
          <stop offset="9.6%" stopColor="#ECF2F8F9" />
          <stop offset="22.0%" stopColor="#EAF0F5E9" />
          <stop offset="36.0%" stopColor="#E6EBEFCF" />
          <stop offset="51.1%" stopColor="#E1E4E7AA" />
          <stop offset="67.1%" stopColor="#DBDCDD7A" />
          <stop offset="83.6%" stopColor="#D4D2D141" />
          <stop offset="94.0%" stopColor="#CFCBC919" />
          <stop offset="100%" stopColor="#CCC7C400" />
        </linearGradient>
        <linearGradient
          id="gradient3"
          x1={'100%'}
          x2={'0%'}
          y1={'100%'}
          y2={'0%'}
          gradientTransform={'rotate(45)'}
        >
          <stop offset="0%" stopColor="#EDF4FA" />
          <stop offset="9.7%" stopColor="#ECF2F8F9" />
          <stop offset="22.3%" stopColor="#EAF0F5E9" />
          <stop offset="36.5%" stopColor="#E6EBEFCE" />
          <stop offset="51.7%" stopColor="#E1E4E7A8" />
          <stop offset="67.9%" stopColor="#DBDCDD77" />
          <stop offset="84.6%" stopColor="#D3D1D03D" />
          <stop offset="100%" stopColor="#CCC7C400" />
        </linearGradient>
      </defs>
      <g id="group">
        <path
          id="path"
          clipPath="url(#clip_path)"
          d="M 288.34 2.352 C 269.443 2.352 250.874 7.328 234.509 16.777 C 218.143 26.225 204.55 39.819 195.102 56.184 C 185.653 72.55 180.678 91.119 180.678 110.016 C 180.678 169.477 288.34 284.28 288.34 284.28 C 288.34 284.28 396.004 169.48 396.004 110.016 C 396.004 91.118 391.029 72.55 381.58 56.184 C 372.131 39.818 358.538 26.225 342.172 16.776 C 325.806 7.327 307.238 2.352 288.34 2.352 Z M 288.075 159.402 C 275.98 159.403 264.235 155.295 254.778 147.754 C 245.321 140.213 238.701 129.679 236.009 117.887 C 233.317 106.095 234.71 93.731 239.958 82.833 C 245.206 71.936 254.004 63.138 264.901 57.89 C 275.799 52.642 288.163 51.249 299.955 53.941 C 311.747 56.633 322.281 63.253 329.822 72.71 C 337.363 82.167 341.471 93.912 341.47 106.007 C 341.47 115.38 339.003 124.589 334.316 132.706 C 329.63 140.823 322.888 147.564 314.771 152.25 C 306.654 156.936 297.445 159.404 288.072 159.403 Z"
          fill="url(#gradient)"
        />
        <path
          id="path_1"
          clipPath="url(#clip_path_1)"
          d="M 223.416 467.725 C 235.986 465.331 237.724 449.205 228.802 430.016 C 218.627 408.125 196.483 420.076 179.602 372.996 C 175.089 360.413 173.375 348.122 171.795 335.88 C 169.918 321.318 168.232 306.825 162.259 291.98 C 143.176 246.672 61.224 246.664 42.135 291.98 C 31.14 319.299 34.672 345.447 24.792 372.993 C 7.908 420.073 -14.235 408.122 -24.408 430.013 C -33.329 449.203 -31.591 465.328 -19.022 467.722 C -12.869 468.895 44.665 479.038 102.199 479.038 C 116.582 479.038 130.965 478.405 144.546 477.438 C 170.985 475.551 197.309 472.309 223.416 467.725 Z"
          fill="url(#gradient2)"
        />
        <path
          id="path_2"
          clipPath="url(#clip_path_2)"
          d="M 137.57 478.282 C 137.57 487.66 133.841 496.663 127.209 503.294 C 120.578 509.926 111.575 513.655 102.197 513.655 C 92.819 513.655 83.816 509.926 77.185 503.294 C 70.553 496.663 66.824 487.66 66.824 478.282 C 66.824 477.904 66.824 477.528 66.853 477.15 C 78.317 477.85 90.261 478.282 102.19 478.282 C 114.119 478.282 126.062 477.846 137.541 477.134 C 137.57 477.513 137.57 477.891 137.57 478.282 Z"
          fill="url(#gradient3)"
        />
      </g>
    </svg>
  );
};

export default IcPermissions;
