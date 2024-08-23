import React from "react";
import style from "./MlModals.module.scss";

const ForecastedClusters = ({ clusters = [], interpretation = {} }) => (
  <div className={style.card}>
    <h3 className="text-md">Forecasted Clusters</h3>
    <p className="text-sm">
      <strong>Summary:</strong>{" "}
      {interpretation.summary || "No summary available"}
    </p>

    <p className="text-sm">
      <strong>Details:</strong>{" "}
      {interpretation.details || "No details available"}
    </p>
    {/* {console.log("interpretation: ", interpretation)}
    {console.log("interpretation.summary: ", interpretation.summary)}
    {console.log("interpretation.details: ", interpretation.details)} */}

    {/* <div className={style.clusterList}>
      {clusters.length > 0 ? (
        clusters.map((cluster, index) => (
          <span key={index} className={style.clusterTag}>
            {cluster}
          </span>
        ))
      ) : (
        <p>No clusters available</p>
      )}
    </div> */}
  </div>
);

export default ForecastedClusters;
