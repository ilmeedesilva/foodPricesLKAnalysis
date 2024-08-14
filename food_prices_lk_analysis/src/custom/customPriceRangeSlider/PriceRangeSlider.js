import React, { useState } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import styles from "./PriceRangeSlider.module.scss";

const PriceRangeSlider = ({ min, max, onChange }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.wrapSlide}>
      <Slider
        range // This prop enables range functionality
        min={min}
        max={max}
        defaultValue={[min, max]}
        value={value}
        onChange={handleChange}
        allowCross={false}
      />
      <div className={styles.rangeTxts}>
        {value[0]} - {value[1]}
      </div>
    </div>
  );
};

export default PriceRangeSlider;
