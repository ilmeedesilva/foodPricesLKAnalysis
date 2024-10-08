import * as React from "react";
const LinearIcon = ({ size, color }) => (
  <svg
    width={size ?? "800px"}
    height={size ?? "800px"}
    viewBox="0 0 24 24"
    fill={color ?? "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 19v3h3v-2.293L19.707 5H22V2h-3v2.293L4.293 19zm2 2H3v-1h1zM20 3h1v1h-1z" />
    <path fill={"none"} d="M0 0h24v24H0z" />
  </svg>
);
export default LinearIcon;
