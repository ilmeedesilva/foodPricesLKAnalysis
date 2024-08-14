import * as React from "react";
const SVMIcon = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    viewBox="0 0 24 24"
    fill={color ?? "none"}
    stroke={color ?? "none"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1={12} y1={3} x2={12} y2={21} />
    <polyline points="8 8 4 12 8 16" />
    <polyline points="16 16 20 12 16 8" />
  </svg>
);
export default SVMIcon;
