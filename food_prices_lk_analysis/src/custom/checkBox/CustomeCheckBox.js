import React, { useState } from "react";
import styles from "./CustomeCheckBox.module.scss";

const CustomCheckbox = ({ label, data, getSelected }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event, item) => {
    const updatedCheckedItems = event.target.checked
      ? [...checkedItems, item]
      : checkedItems.filter((checkedItem) => checkedItem !== item);

    setCheckedItems(updatedCheckedItems);
    getSelected(updatedCheckedItems);
  };

  return (
    <div className={styles.checkboxWrapper}>
      <label>{label}</label>
      {data &&
        data.map((item, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              value={item}
              onChange={(event) => handleCheckboxChange(event, item)}
            />
            <label htmlFor={`checkbox-${index}`}>{item}</label>
          </div>
        ))}
    </div>
  );
};

export default CustomCheckbox;
