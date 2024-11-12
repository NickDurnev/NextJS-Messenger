import React from "react";

const IcRoundHalf = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 157 226"
      id="vector"
      className={className}
    >
      <defs>
        <clipPath id="clip_path">
          <path d="M 0 0 L 157 0 L 157 226 L 0 226 Z" />
        </clipPath>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#EDF4FAFF" />
          <stop offset="9.7%" stopColor="#ECF2F8F8" />
          <stop offset="22.3%" stopColor="#EAF0F5E9" />
          <stop offset="36.5%" stopColor="#E6EBEFCE" />
          <stop offset="51.7%" stopColor="#E1E4E7A8" />
          <stop offset="67.9%" stopColor="#DBDCDD77" />
          <stop offset="84.6%" stopColor="#D3D1D03C" />
          <stop offset="100%" stopColor="#CCC7C400" />
        </linearGradient>
      </defs>
      <g id="group">
        <path
          id="path"
          clipPath="url(#clip_path)"
          fill="url(#gradient)"
          d="M 41.273 108.57 M -61.522 108.57 C -61.522 81.318 -50.684 55.153 -31.414 35.883 C -12.144 16.613 14.021 5.775 41.273 5.775 C 68.525 5.775 94.69 16.613 113.96 35.883 C 133.23 55.153 144.068 81.318 144.068 108.57 C 144.068 135.822 133.23 161.987 113.96 181.257 C 94.69 200.527 68.525 211.365 41.273 211.365 C 14.021 211.365 -12.144 200.527 -31.414 181.257 C -50.684 161.987 -61.522 135.822 -61.522 108.57"
        />
      </g>
    </svg>
  );
};

export default IcRoundHalf;
