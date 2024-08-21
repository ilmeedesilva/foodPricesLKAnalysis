import React from "react";
import style from "./MlModals.module.scss";

const ClusterEvaluation = ({
  clusterSizes,
  silhouetteScore,
  interpretations,
  clusters,
  data,
}) => (
  <div className={style.card}>
    <h3>Cluster Evaluation</h3>
    <p>
      <strong>Cluster Sizes:</strong>
    </p>
    <ul>
      {Object.keys(clusterSizes).map((key) => (
        <li key={key}>
          Cluster {key}: {clusterSizes[key]} points
        </li>
      ))}
    </ul>
    <p>
      <strong>Silhouette Score:</strong> {silhouetteScore.toFixed(4)}
    </p>
    <p>{interpretations.silhouetteScoreInterpretation}</p>
    <p>
      <i>
        The Silhouette Score measures how similar a data point is to points in
        its own cluster compared to points in other clusters.
      </i>
    </p>
    <p>
      <i>
        {" "}
        It ranges from -1 to +1: +1 indicates that the data points are
        well-clustered. 0 indicates that the data points are on or very close to
        the decision boundary between two neighboring clusters.{" "}
      </i>
    </p>
    <p>
      {" "}
      <i>
        -1 indicates that the data points might have been assigned to the wrong
        cluster.{" "}
      </i>
    </p>

    {/* <p>
      <strong>Each Cluster Points:</strong>
    </p>
    {clusters.length > 0 ? (
      <ul>
        {clusters.map((cluster, index) => (
          <li key={index}>{cluster}</li>
        ))}
      </ul>
    ) : (
      <p>No clusters available</p>
    )} */}
  </div>
);

export default ClusterEvaluation;
