import React from "react";
import "rc-slider/assets/index.css";
import styles from "./MessageModal.module.scss";
import WarningIcon from "../../img/svg/Warning.icon";
import InfoIcon from "../../img/svg/Info.icon";
import ErrorIcon from "../../img/svg/Error.icon";
import MessageIcon from "../../img/svg/Message.icon";
import CloseIcon from "../../img/svg/Close.icon";

const MessageModal = ({ type, title, description }) => {
  const getMessageType = () => {
    switch (type) {
      case "error":
        return styles.errorModal;
      case "info":
        return styles.infoModal;
      case "warning":
        return styles.warningModal;
      default:
        return styles.dislayModal;
    }
  };

  const getMessageIcon = () => {
    switch (type) {
      case "error":
        return <ErrorIcon size={22} />;
      case "info":
        return <InfoIcon size={22} />;
      case "warning":
        return <WarningIcon size={22} />;
      default:
        return <MessageIcon size={22} />;
    }
  };

  return (
    <div className={[getMessageType(), styles.modalwrp].join(" ")}>
      <div className={styles.msgIcon}>{getMessageIcon()}</div>
      <div className={styles.msgDesc}>
        {title ? <div>{title}</div> : ""}
        {description}
      </div>
      {/* <button className={styles.closebtn}>
        <CloseIcon size={20} color={type === "error" ? "#DE4343" : "#f2f2f2"} />
      </button> */}
    </div>
  );
};

export default MessageModal;
