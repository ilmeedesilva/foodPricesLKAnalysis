import * as React from "react";
const InfoIcon = ({ size, color }) => (
  <svg
    fill={color ?? "#000000"}
    width={size ?? "800px"}
    height={size ?? "800px"}
    viewBox="0 -8 528 528"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{"info"}</title>
    <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM296 208L296 144 232 144 232 208 296 208ZM296 368L296 240 232 240 232 368 296 368Z" />
  </svg>
);
export default InfoIcon;
