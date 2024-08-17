// RegressionChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const RegressionChart = ({ actuals = [], predictions = [] }) => {
  const data = {
    labels: Array.from({ length: actuals.length }, (_, i) => i + 1), // Index-based labels
    datasets: [
      {
        label: "Actual Values",
        data: actuals,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "Predicted Values",
        data: predictions,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Sample Index",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <h3>Regression Chart</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default RegressionChart;
