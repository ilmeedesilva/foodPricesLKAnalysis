import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RiskManagementChart = ({ data }) => {
  const { actual_prices, confidence_intervals, dates, predicted_prices } = data;

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Actual Prices",
        data: actual_prices,
        borderColor: "#3c91ff",
        backgroundColor: "#8abdff",
        fill: true,
        pointBackgroundColor: "#3c91ff",
        pointBorderColor: "#3c91ff",
        pointRadius: 5,
      },
      {
        label: "Predicted Prices",
        data: predicted_prices,
        borderColor: "#3240ff",
        backgroundColor: "#8abdff",
        fill: true,
        pointBackgroundColor: "#3240ff",
        pointBorderColor: "#3240ff",
        pointRadius: 5,
      },
      {
        label: "Confidence Interval",
        data: confidence_intervals.upper_bound,
        borderColor: "gray",
        backgroundColor: "#ffffff",
        fill: true,
        pointRadius: 0,
        borderDash: [10, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
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
          text: "Prices",
          color: "#97A1B7",
        },
        ticks: {
          color: "#97A1B7",
          callback: function (value) {
            return `$${value}`;
          },
        },
        grid: {
          color: "#EAEBF2", // Grid line color for the Y axis
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RiskManagementChart;
