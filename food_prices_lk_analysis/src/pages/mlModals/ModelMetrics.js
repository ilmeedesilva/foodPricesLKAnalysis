// ModelMetrics.jsx
import React from "react";

const ModelMetrics = ({
  mse = 0,
  r2 = 0,
  coefficients = [],
  intercept = 0,
}) => {
  return (
    <div>
      <h3>Model Metrics</h3>
      <ul>
        <li>
          <strong>Mean Squared Error (MSE):</strong> {mse.toFixed(2)}
        </li>
        <li>
          <strong>R-squared:</strong> {r2.toFixed(2)}
        </li>
        <li>
          <strong>Coefficients:</strong>{" "}
          {coefficients.length > 0
            ? coefficients.map((coef, index) => (
                <span key={index}>
                  {coef.toFixed(2)}
                  {index < coefficients.length - 1 ? ", " : ""}
                </span>
              ))
            : "N/A"}
        </li>
        <li>
          <strong>Intercept:</strong> {intercept.toFixed(2)}
        </li>
      </ul>
    </div>
  );
};

export default ModelMetrics;
