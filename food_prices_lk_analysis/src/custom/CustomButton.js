import React from "react";
import style from "./CustomButton.module.scss";

const CustomButton = ({
  text,
  buttonClass = "PRIMARY",
  type = "button",
  icon = "",
}) => {
  const getButtonClass = () => {
    switch (buttonClass) {
      case "PRIMARY":
        return style.primaryButton;
      case "SECONDARY":
        return style.secondaryButton;
      case "LEFT_ICON_BTN":
        return style.leftIconBtn;
      default:
        return style.primaryButton;
    }
  };

  return (
    <button className={getButtonClass()} type={type}>
      {icon ? <div>{icon}</div> : ""}
      <div> {text}</div>
    </button>
  );
};

export default CustomButton;
