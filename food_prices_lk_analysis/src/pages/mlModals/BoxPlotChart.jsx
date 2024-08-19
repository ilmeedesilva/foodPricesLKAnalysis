import React from 'react';
import Plot from 'react-plotly.js';

const HeatmapChart = ({ confusionMatrix = [] }) => {
    // Default values if confusionMatrix is empty
    const matrix = confusionMatrix.length ? confusionMatrix : [[0, 0], [0, 0]];
    const xLabels = ['Predicted Negative', 'Predicted Positive'];
    const yLabels = ['Actual Negative', 'Actual Positive'];

    // Define the labels for each cell based on the confusion matrix
    const labels = [
        ['TN', 'FP'],
        ['FN', 'TP']
    ];

    // Create annotations for each cell in the heatmap
    const annotations = matrix.flat().map((value, index) => {
        const rowIndex = Math.floor(index / matrix[0].length);
        const colIndex = index % matrix[0].length;
        const label = labels[rowIndex][colIndex];
        return {
            x: xLabels[colIndex],
            y: yLabels[rowIndex],
            text: `${label}: ${value}`,
            font: {
                size: 16,
                color: 'black',
            },
            showarrow: false,
            align: 'center',
            valign: 'middle'
        };
    });

    return (
        <div style={{ width: '80%', height: '500px', margin: 'auto' }}>
            <Plot
                data={[
                    {
                        type: 'heatmap',
                        z: matrix, // Confusion matrix values
                        x: xLabels, // Column labels
                        y: yLabels, // Row labels
                        colorscale: [
                            [0, '#416DD9'],  // White
                            [0.2, '#597CDE'], // Light red
                            [0.4, '#B1C2E6'], // Red
                            [0.6, '#194BD5'],     // Dark red
                            [1, '#194BD5']        // Maroon
                        ],
                        colorbar: {
                            title: 'Count'
                        },
                        showscale: true,
                        zsmooth: 'best',
                    }
                ]}
                layout={{
                    title: 'Confusion Matrix Heatmap',
                    xaxis: {
                        title: 'Predicted Labels',
                    },
                    yaxis: {
                        title: 'Actual Labels',
                    },
                    annotations: annotations, // Add annotations here
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default HeatmapChart;
