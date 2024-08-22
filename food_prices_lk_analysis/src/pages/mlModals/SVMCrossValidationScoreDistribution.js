import React from 'react';
import Plot from 'react-plotly.js';

const CrossValidationScoreDistribution = ({ scores }) => {
    return (
        <div style={{ width: '80%', height: '500px', marginBottom: '24px' }}>
            <Plot
                data={[
                    {
                        y: scores, // Array of cross-validation scores
                        type: 'box', // Box plot type
                        name: 'CV Scores',
                        boxpoints: 'all', // Show all points (for outliers)
                        jitter: 0.5, // Spread the points
                        pointpos: 0, // Position of points with respect to the box
                        marker: { color: 'blue' }, // Customize marker color
                        line: { color: 'darkblue' } // Customize line color
                    }
                ]}
                layout={{
                    title: 'Cross-Validation Score Distribution',
                    yaxis: {
                        title: 'Score',
                        zeroline: false // Removes the line at y=0
                    },
                    xaxis: {
                        title: 'Cross-Validation Folds',
                        showgrid: false // Removes the grid lines
                    },
                    showlegend: false, // No legend needed for this chart
                    margin: {
                        l: 40,
                        r: 30,
                        b: 50,
                        t: 50
                    }
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default CrossValidationScoreDistribution;
