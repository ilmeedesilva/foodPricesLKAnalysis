import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const ResidualsDistributionHistogram = ({ yTest, yPred }) => {
    const residuals = yTest.map((yActual, index) => yActual - yPred[index]);
    
    const bins = 20;
    const minResidual = Math.min(...residuals);
    const maxResidual = Math.max(...residuals);
    const binWidth = (maxResidual - minResidual) / bins;

    const histogramData = Array(bins).fill(0);
    residuals.forEach(residual => {
        const binIndex = Math.floor((residual - minResidual) / binWidth);
        histogramData[Math.min(binIndex, bins - 1)] += 1;
    });

    const data = histogramData.map((count, index) => {
        const binStart = minResidual + binWidth * index;
        const binEnd = binStart + binWidth;
        return {
            bin: `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`,
            frequency: count,
        };
    });

    return (
        <div style={{ width: '80%', height: '500px', marginBottom: '24px' }}>
            <BarChart
                width={800}
                height={500}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bin" angle={-30} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="frequency" fill="rgba(153, 102, 255, 0.6)" stroke="rgba(153, 102, 255, 1)" />
            </BarChart>
        </div>
    );
};

export default ResidualsDistributionHistogram;
