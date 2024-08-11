import * as React from "react";
const FilterIcon = ({ size, color }) => (
  <svg
    fill={color ?? "#000000"}
    width={size ?? "20px"}
    height={size ?? "20px"}
    viewBox="-2 -2 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    className="jam jam-filter"
  >
    <path d="M2.08 2l6.482 8.101A2 2 0 0 1 9 11.351V18l2-1.5v-5.15a2 2 0 0 1 .438-1.249L17.92 2H2.081zm0-2h15.84a2 2 0 0 1 1.561 3.25L13 11.35v5.15a2 2 0 0 1-.8 1.6l-2 1.5A2 2 0 0 1 7 18v-6.65L.519 3.25A2 2 0 0 1 2.08 0z" />
  </svg>
);
export default FilterIcon;
