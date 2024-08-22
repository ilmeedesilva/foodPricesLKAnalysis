import React from "react";
import style from "./CustomButton.module.scss";
import LoaderIcon from "../img/svg/Loader.icon";

const CustomButton = ({
  text,
  buttonClass = "PRIMARY",
  type = "button",
  icon = "",
  rightIcon = "",
  onClick,
  loading = false,
  disabled = false,
}) => {
  const getButtonClass = () => {
    switch (buttonClass) {
      case "PRIMARY":
        return style.primaryButton;
      case "SECONDARY":
        return style.secondaryButton;
      case "SUBMIT":
        return style.submitButton;
      case "CANCEL":
        return style.cancelButton;
      case "LEFT_ICON_BTN":
        return style.leftIconBtn;
      case "CLOSE":
        return style.closeIconBtn;
      case "NEXT_BUTTON":
        return style.nextBtn;
      default:
        return style.primaryButton;
    }
  };

  return (
    <button
      className={getButtonClass()}
      type={type}
      onClick={(event) => onClick(event)}
      disabled={loading || disabled}
    >
      {!icon && !rightIcon && loading ? (
        <div className={style.buttonLoading}>
          <LoaderIcon size={20} color={"#F5F6F7"} />
        </div>
      ) : (
        ""
      )}

      {icon ? (
        loading ? (
          <div className={style.buttonLoading}>
            <LoaderIcon
              size={20}
              color={buttonClass === "LEFT_ICON_BTN" ? "#EEEFF2" : "#F5F6F7"}
            />
          </div>
        ) : (
          <div>{icon}</div>
        )
      ) : (
        ""
      )}
      {buttonClass !== "CLOSE" ? <div> {text}</div> : ""}
      {rightIcon ? (
        loading ? (
          <div className={style.buttonLoading}>
            <LoaderIcon
              size={20}
              color={buttonClass === "LEFT_ICON_BTN" ? "#EEEFF2" : "#F5F6F7"}
            />
          </div>
        ) : (
          <div>{rightIcon}</div>
        )
      ) : (
        ""
      )}
    </button>
  );
};

export default CustomButton;
