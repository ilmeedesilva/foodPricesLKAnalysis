import React from "react";
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
  // Helper function to interpret F1-score
  const interpretF1Score = (f1Score) => {
    if (f1Score >= 0 && f1Score < 0.5) {
      return (
        <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
          The F1-score is low, indicating that the model struggles to balance
          precision and recall.
        </span>
      );
    } else if (f1Score >= 0.5 && f1Score < 0.75) {
      return (
        <span style={{ color: "#f39c12", fontStyle: "italic" }}>
          The F1-score is moderate, suggesting the model has a decent balance
          between precision and recall, but there's room for improvement.
        </span>
      );
    } else if (f1Score >= 0.75 && f1Score <= 1.0) {
      return (
        <span style={{ color: "#27ae60", fontStyle: "italic" }}>
          The F1-score is high, showing that the model has an excellent balance
          between precision and recall.
        </span>
      );
    } else {
      return "F1-score is not available.";
    }
  };

  // Helper function to interpret Precision
  const interpretPrecision = (precision) => {
    if (precision >= 0 && precision < 0.5) {
      return (
        <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
          The Precision is low, indicating a high number of false positives.
        </span>
      );
    } else if (precision >= 0.5 && precision < 0.75) {
      return (
        <span style={{ color: "#f39c12", fontStyle: "italic" }}>
          The Precision is moderate, suggesting some false positives but
          acceptable accuracy.
        </span>
      );
    } else if (precision >= 0.75 && precision <= 1.0) {
      return (
        <span style={{ color: "#27ae60", fontStyle: "italic" }}>
          The Precision is high, indicating that the model is very accurate in
          its positive predictions.
        </span>
      );
    } else {
      return "Precision is not available.";
    }
  };

  // Helper function to interpret Recall
  const interpretRecall = (recall) => {
    if (recall >= 0 && recall < 0.5) {
      return (
        <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
          The Recall is low, indicating the model is missing many positive
          instances.
        </span>
      );
    } else if (recall >= 0.5 && recall < 0.75) {
      return (
        <span style={{ color: "#f39c12", fontStyle: "italic" }}>
          The Recall is moderate, suggesting that the model catches a fair
          number of positive instances, but misses some.
        </span>
      );
    } else if (recall >= 0.75 && recall <= 1.0) {
      return (
        <span style={{ color: "#27ae60", fontStyle: "italic" }}>
          The Recall is high, showing that the model successfully identifies
          most positive instances.
        </span>
      );
    } else {
      return "Recall is not available.";
    }
  };

  // Helper function to interpret Support
  const interpretSupport = (support) => {
    if (support > 0 && support < 100) {
      return (
        <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
          Support is low, indicating a small number of instances for this class.
        </span>
      );
    } else if (support >= 100 && support < 500) {
      return (
        <span style={{ color: "#f39c12", fontStyle: "italic" }}>
          Support is moderate, with a reasonable number of instances for this
          class.
        </span>
      );
    } else if (support >= 500) {
      return (
        <span style={{ color: "#27ae60", fontStyle: "italic" }}>
          Support is high, indicating a large number of instances for this
          class.
        </span>
      );
    } else {
      return "Support is not available.";
    }
  };

  // Helper function to format classification report
  const formatClassificationReport = (report) => {
    return Object.keys(report).map((key) =>
      key !== "accuracy" ? (
        <div
          key={key}
          style={{
            display: "inline-block",
            margin: "0 40px",
            textAlign: "left",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#ecf0f1",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "300px",
          }}
        >
          <strong style={{ fontSize: "18px", color: "#2c3e50" }}>
            Class {key}:
          </strong>
          <p style={{ margin: "10px 0" }}>
            <strong>F1-score:</strong>{" "}
            <span style={{ fontSize: "16px", color: "#34495e" }}>
              {report[key]?.["f1-score"]?.toFixed(4) || "N/A"}
            </span>
            <br />
            {interpretF1Score(report[key]?.["f1-score"])}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Precision:</strong>{" "}
            <span style={{ fontSize: "16px", color: "#34495e" }}>
              {report[key]?.precision?.toFixed(4) || "N/A"}
            </span>
            <br />
            {interpretPrecision(report[key]?.precision)}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Recall:</strong>{" "}
            <span style={{ fontSize: "16px", color: "#34495e" }}>
              {report[key]?.recall?.toFixed(4) || "N/A"}
            </span>
            <br />
            {interpretRecall(report[key]?.recall)}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Support:</strong>{" "}
            <span style={{ fontSize: "16px", color: "#34495e" }}>
              {report[key]?.support || "N/A"}
            </span>
            <br />
            {interpretSupport(report[key]?.support)}
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        padding: "20px",
      }}
    >
      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />
      <h2
        className="mt-3 mb-3 header-md"
        style={{ color: "#2c3e50", fontWeight: "bold" }}
      >
        Random Forest Evaluation
      </h2>
      <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
        The Random Forest algorithm provides various metrics to evaluate the
        model's performance. Here is a detailed explanation of the results:
      </p>

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>Accuracy:</strong>{" "}
          <i>
            The accuracy of the model is{" "}
            <strong>{accuracy ? accuracy.toFixed(4) : "N/A"}</strong>.
          </i>
          <br />
          This indicates that approximately{" "}
          <strong>{accuracy ? Math.round(accuracy * 100) : "N/A"}%</strong> of
          the predictions were correct.
        </p>
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>Classification Report:</strong>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {formatClassificationReport(classificationReport)}
        </div>
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>Confusion Matrix:</strong>
        </p>
        <i style={{ fontSize: "14px", color: "#7f8c8d" }}>
          The Heatmap shows the distribution of true positives, false positives,
          false negatives, and true negatives for each class. In this case, it
          reflects the model's performance in distinguishing between different
          classes.
        </i>
        <HeatmapChart confusionMatrix={confusionMatrix} />
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>Cross-Validation Scores:</strong>
        </p>
        <p style={{ fontSize: "14px", color: "#7f8c8d" }}>
          <strong>{cvScores.length ? cvScores.join(", ") : "N/A"}</strong>
        </p>
        <i style={{ fontSize: "14px", color: "#7f8c8d" }}>
          These scores are obtained by evaluating the model on different subsets
          of the data. They provide an indication of the model's stability and
          performance across different data splits. Higher scores indicate
          better performance.
        </i>
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>Grid Search Results:</strong>
        </p>
        <i style={{ fontSize: "14px", color: "#7f8c8d" }}>
          The average mean fit time is <strong>{meanFitTime}</strong> seconds,
          and the average mean score time is <strong>{meanScoreTime}</strong>{" "}
          seconds.
        </i>
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>
            Mean Absolute Error (MAE):
          </strong>
        </p>
        <i style={{ fontSize: "14px", color: "#7f8c8d" }}>
          The MAE is{" "}
          <strong>
            {meanAbsoluteError ? meanAbsoluteError.toFixed(4) : "N/A"}
          </strong>
          . This indicates the average magnitude of the errors in the
          predictions. Lower MAE values represent better model performance.
        </i>
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>
            Mean Squared Error (MSE):
          </strong>
        </p>
        <i style={{ fontSize: "14px", color: "#7f8c8d" }}>
          The MSE is{" "}
          <strong>
            {meanSquaredError ? meanSquaredError.toFixed(4) : "N/A"}
          </strong>
          . This metric provides the average squared difference between the
          predicted and actual values. Lower MSE values indicate better model
          accuracy.
        </i>
      </div>

      <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

      <div style={{ marginBottom: "20px" }}>
        <p className="text-sm" style={{ fontSize: "16px", color: "#34495e" }}>
          <strong style={{ color: "#2980b9" }}>R-squared:</strong>
        </p>
        <i style={{ fontSize: "14px", color: "#7f8c8d" }}>
          The R-squared value is{" "}
          <strong>{r2Score ? r2Score.toFixed(4) : "N/A"}</strong>, This shows
          the proportion of variance in the target variable that is predictable
          from the features. A higher R-squared indicates a better fit of the
          model to the data.
        </i>
      </div>
    </div>
  );
};

export default RFExplanation;
