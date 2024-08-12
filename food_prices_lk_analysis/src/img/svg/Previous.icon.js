import * as React from "react";
const PreviousIcon = ({ size, color }) => (
  <svg
    width={size ?? "800px"}
    height={size ?? "800px"}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 48 48"
  >
    <polygon
      fill={color ?? "#2196F3"}
      points="30.9,43 34,39.9 18.1,24 34,8.1 30.9,5 12,24"
    />
  </svg>
);
export default PreviousIcon;
