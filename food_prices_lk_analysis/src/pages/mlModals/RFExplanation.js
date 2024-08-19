import React from "react";
// import BoxplotChart from "./BoxPlotChart";
import HeatmapChart from "./BoxPlotChart";

const RFExplanation = ({
  accuracy = 0,
  classificationReport = {},
  confusionMatrix = [],
  cvScores = [],
  gridSearchResults = {},
  meanAbsoluteError = 0,
  meanSquaredError = 0,
  r2Score = 0,
}) => {
  // Helper function to format classification report
  const formatClassificationReport = (report) => {
    return Object.keys(report).map((key) =>
      key !== "accuracy" ? (
        <div key={key} style={{ display: "inline-block", margin: "0 40px" }}>
          <strong>Class {key}:</strong>
          <p>
            <strong>F1-score:</strong>{" "}
            <i>{report[key]?.["f1-score"]?.toFixed(4) || "N/A"}</i>
          </p>
          <p>
            <strong>Precision:</strong>{" "}
            <i>{report[key]?.precision?.toFixed(4) || "N/A"}</i>
          </p>
          <p>
            <strong>Recall:</strong>{" "}
            <i>{report[key]?.recall?.toFixed(4) || "N/A"}</i>
          </p>
          <p>
            <strong>Support:</strong> <i>{report[key]?.support || "N/A"}</i>
          </p>
        </div>
      ) : null
    );
  };

  const calculateAverages = (results) => {
    if (!results.length) return { meanFitTime: "N/A", meanScoreTime: "N/A" };

    const totalFitTime = results.reduce(
      (sum, result) => sum + (result.mean_fit_time || 0),
      0
    );
    const totalScoreTime = results.reduce(
      (sum, result) => sum + (result.mean_score_time || 0),
      0
    );

    return {
      meanFitTime: (totalFitTime / results.length).toFixed(2),
      meanScoreTime: (totalScoreTime / results.length).toFixed(2),
    };
  };

  const { meanFitTime, meanScoreTime } = calculateAverages(gridSearchResults);

  return (
    <div>
      <h3 className="text-md mt-4 mb-4">Random Forest Evaluation</h3>
      <p className="text-sm">
        The Random Forest algorithm provides various metrics to evaluate the
        model's performance. Here is a detailed explanation of the results:
      </p>

      <p className="text-sm">
        <strong>Accuracy:</strong>{" "}
        <i>
          The accuracy of the model is {accuracy ? accuracy.toFixed(4) : "N/A"}.
          This indicates that approximately{" "}
          {accuracy ? Math.round(accuracy * 100) : "N/A"}% of the predictions
          were correct.
        </i>
      </p>

      <p className="text-sm">
        <strong>Classification Report:</strong>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {formatClassificationReport(classificationReport)}
        </div>
      </p>

      <p className="text-sm">
        <strong>Confusion Matrix:</strong>
        {/* <BoxplotChart confusionMatrix={confusionMatrix} /> */}
        <HeatmapChart confusionMatrix={confusionMatrix} />
        <i>
          The Heatmap shows the distribution of true positives, false positives,
          false negatives, and true negatives for each class. In this case, it
          reflects the model's performance in distinguishing between different
          classes.
        </i>
      </p>

      <p className="text-sm">
        <strong>Cross-Validation Scores:</strong>
        <pre>
          <i>{cvScores.length ? cvScores.join(", ") : "N/A"}</i>
        </pre>
        <i>
          These scores are obtained by evaluating the model on different subsets
          of the data. They provide an indication of the model's stability and
          performance across different data splits. Higher scores indicate
          better performance.
        </i>
      </p>

      <p className="text-sm">
        <strong>Grid Search Results:</strong>
        {/* <pre>
          {gridSearchResults.params ? (
            <i>{JSON.stringify(gridSearchResults.params, null, 2)}</i>
          ) : (
            "N/A"
          )}
        </pre> */}
        <i>
          The average mean fit time is {meanFitTime} seconds and the average
          mean score time is {meanScoreTime} seconds.
        </i>
      </p>

      <p className="text-sm">
        <strong>Mean Absolute Error (MAE):</strong>{" "}
        <i>
          The MAE is {meanAbsoluteError ? meanAbsoluteError.toFixed(4) : "N/A"}.
          This indicates the average magnitude of the errors in the predictions.
          Lower MAE values represent better model performance.
        </i>
      </p>

      <p className="text-sm">
        <strong>Mean Squared Error (MSE):</strong>{" "}
        <i>
          The MSE is {meanSquaredError ? meanSquaredError.toFixed(4) : "N/A"}.
          This metric provides the average squared difference between the
          predicted and actual values. Lower MSE values indicate better model
          accuracy.
        </i>
      </p>

      <p className="text-sm">
        <strong>R-squared:</strong>{" "}
        <i>
          The R-squared value is {r2Score ? r2Score.toFixed(4) : "N/A"}. This
          shows the proportion of variance in the target variable that is
          predictable from the features. A higher R-squared indicates a better
          fit of the model to the data.
        </i>
      </p>
    </div>
  );
};

export default RFExplanation;
