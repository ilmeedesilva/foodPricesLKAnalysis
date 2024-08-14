import * as React from "react";
const StepIcon = ({ size, color }) => (
  <svg
    width={size ?? "800px"}
    height={size ?? "800px"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill={color ?? "#000000"} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10 6a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
      fill={color ?? "#000000"}
    />
  </svg>
);
export default StepIcon;
