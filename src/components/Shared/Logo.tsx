import React from "react";
import Link from "next/link";

type Props = {
  showAllText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Logo({
  showAllText = true,
  size = "md",
  className = "",
}: Props) {
  const dims = {
    sm: { w: 120, h: 36, text: "text-sm" },
    md: { w: 160, h: 48, text: "text-lg" },
    lg: { w: 220, h: 64, text: "text-2xl" },
  }[size];

  return (
    <div
      className={`flex items-center ${className}`}
      aria-label="TechTipsTricks logo"
    >
      <Link href="/" className="flex items-center no-underline">
        <svg
          width="100%"  
          height={dims.h}
          viewBox="0 0 260 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          role="img"
          aria-hidden={showAllText ? "false" : "true"}
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="4"
                floodOpacity="0.18"
              />
            </filter>
          </defs>

          {/* Rounded square background */}
          <rect
            x="6"
            y="6"
            width="44"
            height="44"
            rx="10"
            fill="url(#g1)"
            filter="url(#shadow)"
          />

          {/* Negative-space 'T' built from rectangles */}
          <rect x="18" y="14" width="20" height="6" rx="2" fill="white" />
          <rect x="26" y="20" width="6" height="20" rx="2" fill="white" />

          {/* Small tech spark / lightning to the right of mark */}
          <path
            d="M64 18 L76 30 L68 30 L80 42"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* Brand text - positioned better for responsiveness */}
          {showAllText && (
            <g transform="translate(70, 40)">
              <text
                x="0"
                y="0"
                fontFamily="Inter, ui-sans-serif, system-ui"
                fontWeight={700}
                fontSize={20}
                className="fill-gray-900 dark:fill-white" // Fixed for dark mode
              >
                Tech
              </text>
              <text
                x="44"
                y="0"
                fontFamily="Inter, ui-sans-serif, system-ui"
                fontWeight={700}
                fontSize={20}
                fill="url(#g1)"
              >
                TipsTricks
              </text>
            </g>
          )}
        </svg>
      </Link>

      <style jsx>{`
        @media (max-width: 480px) {
          :global(svg) {
            width: ${showAllText ? "160px" : "60px"} !important;
            height: 34px !important;
          }
        }
        @media (max-width: 360px) {
          :global(svg) {
            width: ${showAllText ? "140px" : "60px"} !important;
          }
        }
      `}</style>
    </div>
  );
}