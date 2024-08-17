import React, { useEffect, useState } from "react";
import styles from "./CustomModal.module.scss";
import CustomButton from "../CustomButton";
import CloseIcon from "../../img/svg/Close.icon";
import MessageModal from "../message/MessageModal";

const CustomModal = ({ children, title, open, width, height, error }) => {
  return (
    <>
      <div className={styles.grayWrapper} />

      <div
        className={styles.modalWrapper}
        style={{ width: width, height: height }}
      >
        {error && error.description ? (
          <div className={"alertModal"}>
            <MessageModal type={"error"} description={error.description} />
          </div>
        ) : (
          ""
        )}
        <div className={styles.modalTitle}>
          <h3>{title ?? "modal"}</h3>
          <CustomButton
            buttonClass={"CLOSE"}
            icon={<CloseIcon size={15} color={"#7b7a7a"} />}
            active={true}
            onClick={() => {
              !error && open(false);
            }}
          />
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </>
  );
};
export default CustomModal;
