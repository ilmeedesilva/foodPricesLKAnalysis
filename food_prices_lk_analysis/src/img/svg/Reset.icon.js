import * as React from "react";
const ResetIcon = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    viewBox="0 0 24 24"
    fill={color ?? "none"}
    stroke="#000000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2h4" />
    <path d="M12 14v-4" />
    <path d="M4 13a8 8 0 018-7 8 8 0 11-5.3 14L4 17.6" />
    <path d="M9 17H4v5" />
  </svg>
);
export default ResetIcon;
