import React from "react";
import styles from "./CustomDropdown.module.scss";

const CustomDropdown = ({ label, data, getSelected }) => {
  return (
    <div className={styles.customDropdownWrp}>
      <label htmlFor="dropdown">{label}</label>
      <select
        id="dropdown"
        name="dropdown"
        onChange={(event) => getSelected(event.target.value)}
      >
        {data &&
          data.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
