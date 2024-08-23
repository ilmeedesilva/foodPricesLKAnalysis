import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CrossValidationScoreDistributionLineChart = ({ scores }) => {
    const data = scores.map((score, index) => ({
        fold: `Fold ${index + 1}`,
        score
    }));

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fold" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CrossValidationScoreDistributionLineChart;
