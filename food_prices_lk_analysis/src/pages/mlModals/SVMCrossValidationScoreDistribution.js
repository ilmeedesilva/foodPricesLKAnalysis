import React from 'react';
import Plot from 'react-plotly.js';

const CrossValidationScoreDistribution = ({ scores }) => {
    return (
        <div style={{ width: '80%', height: '500px', marginBottom: '24px' }}>
            <Plot
                data={[
                    {
                        y: scores, 
                        type: 'box', 
                        name: 'CV Scores',
                        boxpoints: 'all', 
                        jitter: 0.5, 
                        pointpos: 0, 
                        marker: { color: 'blue' }, 
                        line: { color: 'darkblue' } 
                    }
                ]}
                layout={{
                    // title: 'Cross-Validation Score Distribution',
                    yaxis: {
                        title: 'Score',
                        zeroline: false
                    },
                    xaxis: {
                        title: 'Cross-Validation Folds',
                        showgrid: false 
                    },
                    showlegend: false,
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
