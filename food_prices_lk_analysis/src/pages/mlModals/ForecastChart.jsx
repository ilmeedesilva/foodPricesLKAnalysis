import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register plugins
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const ForecastChart = ({ forecasts }) => {
    const labels = Object.keys(forecasts);
    const forecastedPrices = labels.map(commodity => forecasts[commodity].forecasted_prices[0]);
    const overallAvgPrices = labels.map(commodity => forecasts[commodity].overall_avg_price);
    const forecastedClass = labels.map(commodity => forecasts[commodity].forecasted_class[0]);

    const forecastedPriceColors = forecastedClass.map(cls =>
        cls === 'high' ? 'rgba(255, 99, 132, 0.8)' : 'rgba(54, 162, 235, 0.8)'
    );

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Forecasted Prices',
                data: forecastedPrices,
                backgroundColor: forecastedPriceColors,
                borderColor: forecastedPriceColors,
                borderWidth: 1,
                datalabels: {
                    color: '#000',
                    align: 'top',
                    anchor: 'end',
                    formatter: (value, context) => {
                        return forecastedClass[context.dataIndex].toUpperCase();
                    },
                }
            },
            {
                label: 'Overall Average Prices',
                data: overallAvgPrices,
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                type: 'line',
                datalabels: {
                    display: false, 
                }

            }
        ]
    };

    return (
        <div>
            <h3>Forecasted Prices vs Overall Average Prices</h3>
            <Bar data={data} options={{
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#333',
                        },
                    },
                    datalabels: {
                        display: true,
                        color: '#000',
                        anchor: 'end',
                        align: 'top',
                    }
                }
            }} />
        </div>
    );
};

export default ForecastChart;
