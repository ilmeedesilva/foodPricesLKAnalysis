import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResidualsDistributionHistogram = ({ yTest, yPred }) => {
    // Calculate residuals
    const residuals = yTest.map((yActual, index) => yActual - yPred[index]);

    // Group residuals into bins for the histogram
    const bins = 20; // Number of bars in the histogram
    const minResidual = Math.min(...residuals);
    const maxResidual = Math.max(...residuals);
    const binWidth = (maxResidual - minResidual) / bins;

    const histogramData = Array(bins).fill(0);
    residuals.forEach(residual => {
        const binIndex = Math.floor((residual - minResidual) / binWidth);
        histogramData[Math.min(binIndex, bins - 1)] += 1; // Increment the count in the correct bin
    });

    const data = {
        labels: histogramData.map((_, index) => {
            const binStart = minResidual + binWidth * index;
            const binEnd = binStart + binWidth;
            return `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`;
        }),
        datasets: [
            {
                label: 'Frequency',
                data: histogramData,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Residuals',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Frequency',
                },
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div >
            <Bar data={data} options={options} style={{ width: '80%', height: '500px' , marginBottom: '24px'}}/>
        </div>
    );
};

export default ResidualsDistributionHistogram;
