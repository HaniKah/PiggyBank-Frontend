import React from "react";

export default function IconCircle2() {
  return (
    <svg
      width="187"
      height="187"
      viewBox="0 0 187 187"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0V0C103.277 0 187 83.7228 187 187V187H0V0Z" fill="#C80048" />
      <g filter="url(#filter0_i_29_134)">
        <path
          d="M0 11V11C97.2021 11 176 89.7979 176 187V187H0V11Z"
          fill="url(#paint0_linear_29_134)"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_29_134"
          x="-2"
          y="11"
          width="178"
          height="178"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_29_134"
          />
        </filter>
        <linearGradient
          id="paint0_linear_29_134"
          x1="88"
          y1="86.5"
          x2="88"
          y2="187"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C80048" />
          <stop offset="1" stop-color="#961C48" />
        </linearGradient>
      </defs>
    </svg>
  );
}
