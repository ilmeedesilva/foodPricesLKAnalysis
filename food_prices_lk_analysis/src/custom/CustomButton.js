import React from "react";
import style from "./CustomButton.module.scss";

const CustomButton = ({ text, buttonClass, type }) => {
  const getButtonClass = () => {
    switch (buttonClass) {
      case "PRIMARY":
        return style.primaryButton;
      case "SECONDARY":
        return style.secondaryButton;
      default:
        return style.primaryButton;
    }
  };

  return (
    <button className={getButtonClass()} type={type}>
      {text}
    </button>
  );
};

export default CustomButton;
