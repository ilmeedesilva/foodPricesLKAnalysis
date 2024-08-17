import * as React from "react";
const LoaderIcon = ({ size, color }) => (
  <svg
    width={size ?? "800px"}
    height={size ?? "800px"}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill={color ?? "#000000"}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"
    />
  </svg>
);
export default LoaderIcon;
