import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ActualVsPredictedScatterPlot = ({ yTest, yPred }) => {

    const minValue = Math.min(...yTest, ...yPred);
    const maxValue = Math.max(...yTest, ...yPred);

    const data = {
      datasets: [
        {
        //   label: 'Actual vs Predicted Prices',
          data: yTest.map((yActual, index) => ({
            x: yActual,
            y: yPred[index],
          })),
          backgroundColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'Ideal Line (y = x)',
          type: 'line',
          data: [{ x: minValue, y: minValue }, { x: maxValue, y: maxValue }],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
      ],
    };
  
    const options = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Actual Prices',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Predicted Prices',
          },
        },
      },
    };
  
    return (
      <div >
        <Scatter data={data} options={options}style={{ width: '80%', height: '500px', marginBottom: '24px'}} />
      </div>
    );
  };

export default ActualVsPredictedScatterPlot;
