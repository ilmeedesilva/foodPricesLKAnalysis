import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const TrendChart = ({ dataset }) => {
  return (
    <LineChart width={800} height={400} data={dataset}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year_month" tickFormatter={(value) => `${value}`} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  );
};

export default TrendChart;
