import React from 'react';
import Plot from 'react-plotly.js';

const GridSearchLinePlot = ({ param1Values, param2Values, scores }) => {
    const traces = param2Values.map((param2Value, index) => {
        return {
            x: param1Values, 
            y: scores[index], 
            mode: 'lines+markers', 
            name: `Param2: ${param2Value}`, 
            line: {
                shape: 'linear', // Line shape
                width: 2,
            },
            marker: {
                size: 6
            }
        };
    });

    return (
        <div style={{ width: '80%', height: '500px', marginBottom: '24px' }}>
            <Plot
                data={traces}
                layout={{
                    // title: 'Grid Search Results - Line Plot',
                    xaxis: {
                        title: 'Parameter 1 (C - Hyperparameter)',
                    },
                    yaxis: {
                        title: 'Score',
                    },
                    margin: {
                        l: 60,
                        r: 30,
                        b: 60,
                        t: 50,
                    },
                    legend: {
                        title: {
                            text: 'Parameter 2 (e.g., gamma)',
                        },
                        x: 1,
                        y: 1,
                    }
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default GridSearchLinePlot;
