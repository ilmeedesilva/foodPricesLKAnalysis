import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const CrossValidationScoreDistributionBoxPlot = ({ cvScores }) => {
    if (!Array.isArray(cvScores) || cvScores.length === 0) {
        return <div>No CV Scores available</div>;
    }

    const sortedScores = [...cvScores].sort((a, b) => a - b);
    const q1 = sortedScores[Math.floor(cvScores.length / 4)];
    const median = sortedScores[Math.floor(cvScores.length / 2)];
    const q3 = sortedScores[Math.floor(3 * cvScores.length / 4)];
    const min = Math.min(...cvScores);
    const max = Math.max(...cvScores);

    const data = [{
        type: 'box',
        y: cvScores,
        boxmean: 'sd',
        name: 'CV Scores',
        marker: {
            color: 'rgba(75, 192, 192, 0.5)',
        },
        line: {
            color: 'rgba(75, 192, 192, 1)',
        }
    }];

    const layout = {
        // title: 'Cross-Validation Score Distribution',
        yaxis: {
            title: 'CV Scores'
        }
    };

    return (
        <Plot
            data={data}
            layout={layout}
            style={{ width: '80%', height: '500px' }}
        />
    );
};

CrossValidationScoreDistributionBoxPlot.propTypes = {
    cvScores: PropTypes.array.isRequired,
};

export default CrossValidationScoreDistributionBoxPlot;
