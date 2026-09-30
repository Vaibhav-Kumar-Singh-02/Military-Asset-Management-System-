import React from 'react';

/**
 * Clean, authoritative Military Defense Logistics Vector Logo
 * Professional, crisp SVG emblem with scalable sizing.
 */
export const MilitaryLogo = ({ size = 36, color = '#e77d0bff', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {/* Outer Defense Shield */}
      <path
        d="M24 4L7 11V22C7 33.2 14.3 43.4 24 46C33.7 43.4 41 33.2 41 22V11L24 4Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Tactical Shield Inset */}
      <path
        d="M24 9L12 14.5V22.5C12 30.8 17.1 38.5 24 40.8C30.9 38.5 36 30.8 36 22.5V14.5L24 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Star Insignia */}
      <path
        d="M24 16L26.3 21.2L32 21.8L27.7 25.6L29 31.2L24 28.2L19 31.2L20.3 25.6L16 21.8L21.7 21.2L24 16Z"
        fill="currentColor"
      />

      {/* Tactical Chevron Accents */}
      <path
        d="M19 35L24 37.5L29 35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MilitaryLogo;
