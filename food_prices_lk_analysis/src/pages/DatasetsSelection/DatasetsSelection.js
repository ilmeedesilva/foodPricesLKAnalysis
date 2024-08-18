import React from "react";
import style from "./DatasetsSelection.module.scss";

const DatasetsSelection = () => {
  return (
    <div className={style.wrapCards}>
      <div className={style.cards}>
        <button className={style.card}>
          <div></div>
          <div>Blood Bank Management</div>
        </button>
        <button className={style.card}>
          <div></div>
          <div>WFP Food Prices</div>
        </button>
      </div>
    </div>
  );
};

export default DatasetsSelection;
