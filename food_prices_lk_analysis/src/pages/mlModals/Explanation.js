// Explanation.jsx
import React from "react";

const Explanation = ({
  mse = 0,
  r2 = 0,
  coefficients = [],
  intercept = 0,
  linearXaxis = [],
  linearYaxis = "Not Specified",
}) => {
  // Helper function to format the coefficients for display
  const formatCoefficients = (coeffs) => {
    return coeffs.length > 0
      ? coeffs.map((coef, index) => (
          <span key={index}>
            {coef.toFixed(4)}
            {index < coeffs.length - 1 ? ", " : ""}
          </span>
        ))
      : "No coefficients available";
  };

  return (
    <div>
      <h3 className="text-md">Explanation</h3>
      <p className="text-sm">
        The regression chart compares the actual values with the predicted
        values generated by the linear regression model.
      </p>
      <p className="text-sm">
        <strong>Mean Squared Error (MSE):</strong> This value represents the
        average squared difference between the actual values and the predicted
        values. A lower MSE indicates a better fit of the model to the data. In
        this case, the MSE is {mse.toFixed(2)}.
      </p>
      <p className="text-sm">
        <strong>R-squared:</strong> The R-squared value shows the proportion of
        variance in the dependent variable that can be explained by the
        independent variable(s). With an R-squared value of {r2.toFixed(4)},
        this model explains only about {Math.round(r2 * 100)}% of the
        variability in the target variable. This suggests a relatively poor fit.
      </p>
      <p className="text-sm">
        <strong>Coefficients:</strong> These values represent the relationship
        between the independent variable(s) and the dependent variable. For each
        unit change in the independent variable(s), the dependent variable
        changes by the corresponding coefficient value. The coefficient(s) for
        the independent variable(s) are: {formatCoefficients(coefficients)}.
      </p>
      <p className="text-sm">
        <strong>Intercept:</strong> The intercept represents the expected mean
        value of the dependent variable when all independent variables are zero.
        In this case, the intercept is {intercept.toFixed(2)}.
      </p>
      <p className="text-sm">
        <strong>Independent Variable(s):</strong> The model used{" "}
        {linearXaxis.length} independent variable(s): {linearXaxis.join(", ")}.
      </p>
      <p className="text-sm">
        <strong>Dependent Variable:</strong> The target variable being predicted
        is: {linearYaxis}.
      </p>
    </div>
  );
};

export default Explanation;
