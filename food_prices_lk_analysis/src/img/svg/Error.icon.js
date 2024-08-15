import * as React from "react";

const ErrorIcon = ({ size, color }) => (
  <svg
    fill={color ?? "#DE4343"}
    width={size ?? "800px"}
    height={size ?? "800px"}
    viewBox="0 -8 528 528"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z" />
  </svg>
);
export default ErrorIcon;
