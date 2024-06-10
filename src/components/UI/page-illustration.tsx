import React from "react";

export default function PageIllustration() {
  return (
    <div
      className="relative max-w-6xl mx-auto h-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute top-0 right-0 transform translate-x-1/2 -mr-16"
        width="722"
        height="320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="illustration-01"
            x1="-4.14"
            y1="43.12"
            x2="303.145"
            y2="391.913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5D5DFF" stopOpacity=".01" />
            <stop offset=".538" stopColor="#5D5DFF" stopOpacity=".32" />
            <stop offset="1" stopColor="#5D5DFF" stopOpacity=".01" />
          </linearGradient>
        </defs>
        <path
          d="M20 280C40 230 100 180 200 160C300 140 350 210 450 190C550 170 600 100 720 60"
          stroke="gray"
          stroke-width="2"
        />
        <path
          d="M0 300C50 250 150 220 250 240C350 260 400 190 500 210C600 230 700 200 750 180"
          stroke="gray"
          stroke-width="2"
        />
        <path
          d="M30 270C60 210 130 170 230 150C330 130 380 200 480 180C580 160 630 90 750 50"
          stroke="blue"
          stroke-width="2"
        />
        <path
          d="M10 290C70 240 120 180 210 190C300 200 370 220 470 200C570 180 630 160 740 130"
          stroke="blue"
          stroke-width="2"
        />
      </svg>
    </div>
  );
}
