import React from "react";
import style from "./NoData.module.scss";
import noData from "../../img/logo/noData.png";

const NoData = ({ header, description }) => {
  return (
    <div className={style.noDataWrp}>
      <img src={noData} alt="no data to show" />
      <h6>{header ?? "No Data To Show"}</h6>
      {description && <p>{description}</p>}
    </div>
  );
};

export default NoData;
