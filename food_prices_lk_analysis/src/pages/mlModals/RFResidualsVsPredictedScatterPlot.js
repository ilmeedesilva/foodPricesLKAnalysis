import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, LineElement } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, LineElement);

const ResidualsVsPredictedScatterPlot = ({ yTest, yPred }) => {
    // Calculate residuals
    const residuals = yTest.map((yActual, index) => yActual - yPred[index]);

    const data = {
        datasets: [
            {
                label: 'Residuals vs Predicted Prices',
                data: yPred.map((yPredicted, index) => ({
                    x: yPredicted,
                    y: residuals[index],
                })),
                backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Zero Line',
                data: [
                    { x: Math.min(...yPred), y: 0 },
                    { x: Math.max(...yPred), y: 0 },
                ],
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
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
                    text: 'Predicted Prices',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Residuals',
                },
            },
        },
    };

    return (
        <div >
            <Scatter data={data} options={options} style={{ width: '80%', height: '500px' , marginBottom: '24px'}}/>
        </div>
    );
};

export default ResidualsVsPredictedScatterPlot;
