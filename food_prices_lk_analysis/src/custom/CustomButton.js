import React from "react";
import style from "./CustomButton.module.scss";

const CustomButton = ({
  text,
  buttonClass = "PRIMARY",
  type = "button",
  icon = "",
  onClick,
}) => {
  const getButtonClass = () => {
    switch (buttonClass) {
      case "PRIMARY":
        return style.primaryButton;
      case "SECONDARY":
        return style.secondaryButton;
      case "LEFT_ICON_BTN":
        return style.leftIconBtn;
      case "CLOSE":
        return style.closeIconBtn;
      default:
        return style.primaryButton;
    }
  };

  return (
    <button
      className={getButtonClass()}
      type={type}
      onClick={(event) => onClick(event)}
    >
      {icon ? <div>{icon}</div> : ""}
      {buttonClass !== "CLOSE" ? <div> {text}</div> : ""}
    </button>
  );
};

export default CustomButton;
