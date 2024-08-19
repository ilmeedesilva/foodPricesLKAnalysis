import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ScatterElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ScatterElement,
  LineElement,
  PointElement
);

const CustomScatterPlot = ({ actuals, predictions }) => {
  // Assuming xAxis is the index or some data corresponding to actuals and predictions
  const xAxis = actuals.map((_, index) => index);

  const data = {
    datasets: [
      {
        label: "Actuals",
        data: xAxis.map((x, i) => ({ x, y: actuals[i] })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Predictions",
        data: xAxis.map((x, i) => ({ x, y: predictions[i] })),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        type: "line", // Ensure it's rendered as a line
      },
    ],
  };

  return (
    <Scatter
      data={data}
      options={{ scales: { x: { type: "linear", position: "bottom" } } }}
    />
  );
};

export default CustomScatterPlot;
