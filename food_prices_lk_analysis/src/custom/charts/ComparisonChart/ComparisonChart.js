import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Prepare data based on props
const prepareData = (actuals, predictions) => {
  return actuals.map((value, index) => ({
    date: `2023-01-${index + 1}`, // Replace with your date logic if applicable
    actual: value,
    predicted: predictions[index] || 0, // Ensure predictions align with actuals
  }));
};

const ComparisonChart = ({ actuals, predictions }) => {
  const data = prepareData(actuals, predictions);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#8884d8"
          dot={false}
          name="Actual"
        />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="#ff7300"
          dot={false}
          name="Predicted"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
