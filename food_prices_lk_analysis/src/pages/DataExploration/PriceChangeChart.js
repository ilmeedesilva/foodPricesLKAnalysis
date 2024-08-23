import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Function to aggregate data by year and calculate average USD rate
const aggregateByYear = (data) => {
  const aggregatedData = {};

  // Ensure `data` is an array, even if it's an object with an array property
  const dataArray = Array.isArray(data) ? data : (data && data.items) || [];

  dataArray.forEach(item => {
    const year = new Date(item.date).getFullYear();
    if (!aggregatedData[year]) {
      aggregatedData[year] = { year, USD_RATE: 0, count: 0 };
    }
    aggregatedData[year].USD_RATE += item['USD RATE'];
    aggregatedData[year].count += 1;
  });

  return Object.values(aggregatedData).map(item => ({
    ...item,
    USD_RATE: item.USD_RATE / item.count // Average USD RATE for the year
  }));
};

const PriceChangeChart = ({ data }) => {
  // Preprocess data to aggregate by year
  const yearlyData = aggregateByYear(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="USD_RATE" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChangeChart;
