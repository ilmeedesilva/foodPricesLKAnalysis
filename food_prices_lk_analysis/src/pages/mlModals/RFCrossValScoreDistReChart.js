import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceLine } from 'recharts';
import PropTypes from 'prop-types';

const CrossValScoreDistReChart = ({ cvScores }) => {
    if (!Array.isArray(cvScores) || cvScores.length === 0) {
        return <div>No CV Scores available</div>;
    }

    // Sorting and calculating quartiles
    const sortedScores = [...cvScores].sort((a, b) => a - b);
    const q1 = sortedScores[Math.floor(cvScores.length / 4)];
    const median = sortedScores[Math.floor(cvScores.length / 2)];
    const q3 = sortedScores[Math.floor(3 * cvScores.length / 4)];
    const min = Math.min(...cvScores);
    const max = Math.max(...cvScores);

    const data = [
        { name: 'CV Scores', min, q1, median, q3, max }
    ];

    return (
        <div style={{ width: '80%', height: '500px' }}>
            <BarChart
                width={800}
                height={500}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="median" fill="rgba(75, 192, 192, 0.5)" />
                <ReferenceLine y={q1} label="Q1" stroke="blue" />
                <ReferenceLine y={median} label="Median" stroke="red" />
                <ReferenceLine y={q3} label="Q3" stroke="green" />
                <ReferenceLine y={min} label="Min" stroke="black" />
                <ReferenceLine y={max} label="Max" stroke="black" />
            </BarChart>
        </div>
    );
};

CrossValScoreDistReChart.propTypes = {
    cvScores: PropTypes.array.isRequired,
};

export default CrossValScoreDistReChart;
