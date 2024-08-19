// RegressionBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const RegressionBarChart = ({
  actuals = [],
  predictions = [],
  labelY,
  labelX,
}) => {
  const data = {
    labels: Array.from({ length: actuals.length }, (_, i) => i + 1), // Index-based labels
    datasets: [
      {
        label: "Actual Values",
        data: actuals,
        backgroundColor: "#3C91FF",
        borderColor: "#3C91FF",
        borderWidth: 1,
      },
      {
        label: "Predicted Values",
        data: predictions,
        backgroundColor: "#3240FF",
        borderColor: "#3240FF",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: labelX ?? "Sample Index",
          color: "#97A1B7",
        },
        ticks: {
          color: "#97A1B7",
        },
        grid: {
          color: "#EAEBF2",
        },
      },
      y: {
        title: {
          display: true,
          text: labelY ?? "Value",
          color: "#97A1B7",
        },
        ticks: {
          color: "#97A1B7",
        },
        grid: {
          color: "#EAEBF2",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#97A1B7",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RegressionBarChart;
