import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const prepareData = (actuals, predictions) => {
  return actuals.map((value, index) => ({
    date: `2023-01-${index + 1}`, // Replace with your date logic if applicable
    actual: value,
    predicted: predictions[index] || 0, // Ensure predictions align with actuals
  }));
};

const BarChartComponent = ({ actuals, predictions, labelX, labelY }) => {
  const data = prepareData(actuals, predictions);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{
            value: labelX,
            position: "insideBottomRight",
            offset: 0,
          }}
        />
        <YAxis
          label={{
            value: labelY,
            angle: -90,
            position: "insideLeft",
            offset: 0,
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="actual" fill="#8884d8" name="Actual" />
        <Bar dataKey="predicted" fill="#ff7300" name="Predicted" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
