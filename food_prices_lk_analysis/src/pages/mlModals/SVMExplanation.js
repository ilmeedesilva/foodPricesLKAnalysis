import React from "react";
import HeatmapChart from "./BoxPlotChart";

const SVMExplanation = ({
  accuracy = 0,
  classificationReport = {},
  confusionMatrix = [],
  cvScores = [],
  gridSearchResults = {},
  meanAbsoluteError = 0,
  meanSquaredError = 0,
  r2Score = 0,
  rocCurve = { fpr: [], tpr: [], roc_auc: 0 },
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
      <h3>SVM Evaluation</h3>
      <p>
        The SVM algorithm provides various metrics to evaluate the model's
        performance. Here is a detailed explanation of the results:
      </p>

      <p>
        <strong>Accuracy:</strong>{" "}
        <i>
          The accuracy of the model is {accuracy ? accuracy.toFixed(4) : "N/A"}.
          This indicates that approximately{" "}
          {accuracy ? Math.round(accuracy * 100) : "N/A"}% of the predictions
          were correct.
        </i>
      </p>

      <p>
        <strong>Classification Report:</strong>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {formatClassificationReport(classificationReport)}
        </div>
      </p>

      <p>
        <strong>Confusion Matrix:</strong>
        <HeatmapChart confusionMatrix={confusionMatrix} />
        <i>
          The Heatmap shows the distribution of true positives, false positives,
          false negatives, and true negatives for each class. This helps in
          visualizing how well the model is performing.
        </i>
      </p>

      <p>
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

      <p>
        <strong>Grid Search Results:</strong>
        <i>
          The average mean fit time is {meanFitTime} seconds, and the average
          mean score time is {meanScoreTime} seconds.
        </i>
      </p>

      <p>
        <strong>Mean Absolute Error (MAE):</strong>{" "}
        <i>
          The MAE is {meanAbsoluteError ? meanAbsoluteError.toFixed(4) : "N/A"}.
          This indicates the average magnitude of the errors in the predictions.
          Lower MAE values represent better model performance.
        </i>
      </p>

      <p>
        <strong>Mean Squared Error (MSE):</strong>{" "}
        <i>
          The MSE is {meanSquaredError ? meanSquaredError.toFixed(4) : "N/A"}.
          This metric provides the average squared difference between the
          predicted and actual values. Lower MSE values indicate better model
          accuracy.
        </i>
      </p>

      <p>
        <strong>R-squared:</strong>{" "}
        <i>
          The R-squared value is {r2Score ? r2Score.toFixed(4) : "N/A"}. This
          shows the proportion of variance in the target variable that is
          predictable from the features. A higher R-squared indicates a better
          fit of the model to the data.
        </i>
      </p>

      <p>
        <strong>ROC Curve and AUC:</strong>{" "}
        <i>
          The ROC Curve helps in evaluating the performance of the classifier
          across different threshold settings. The AUC (Area Under the Curve) is{" "}
          {rocCurve.roc_auc ? rocCurve.roc_auc.toFixed(4) : "N/A"}, which
          reflects the overall ability of the model to distinguish between the
          positive and negative classes. An AUC of 1.0 indicates perfect
          prediction, while an AUC of 0.5 suggests no discriminative ability.
        </i>
      </p>

      <p>
        <strong>False Positive Rate (FPR):</strong>{" "}
        <i>
          The FPR values range from 0 to 1 and indicate how often the model
          falsely predicts the positive class when the actual class is negative.
          For instance, FPR values in your data are{" "}
          {rocCurve.fpr
            .slice(0, 5)
            .map((v) => v.toFixed(4))
            .join(", ")}{" "}
          and extend up to {rocCurve.fpr.slice(-1)[0].toFixed(4)}.
        </i>
      </p>

      <p>
        <strong>True Positive Rate (TPR):</strong>{" "}
        <i>
          The TPR values, also known as sensitivity or recall, show how often
          the model correctly predicts the positive class when the actual class
          is positive. For example, TPR values in your data are{" "}
          {rocCurve.tpr
            .slice(0, 5)
            .map((v) => v.toFixed(4))
            .join(", ")}{" "}
          and extend up to {rocCurve.tpr.slice(-1)[0].toFixed(4)}.
        </i>
      </p>
    </div>
  );
};

export default SVMExplanation;
