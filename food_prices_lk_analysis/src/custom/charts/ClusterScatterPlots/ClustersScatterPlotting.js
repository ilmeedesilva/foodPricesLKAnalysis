import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ScatterController, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, ScatterController, Title, Tooltip, Legend);

// Function to extract scatter plot data
const extractScatterPlotData = (yValues) => {
  return yValues.map((y, index) => ({
    x: index, // x values are the indices of the points
    y: y
  }));
};

const ClusterScatterPlotting = ({ clusters, scatterPlotData }) => {
  // Define the colors for each cluster (expand as needed)
  const clusterColors = [
    '#FF5733', // Cluster 0
    '#33FF57', // Cluster 1
    '#3357FF', // Cluster 2
    '#F0F033', // Cluster 3
    '#F033A1', // Cluster 4
  ];

  // Prepare data for scatter plot
  const datasets = Object.entries(clusters).map(([clusterId, clusterPoints], index) => {
    // Extract data for each cluster
    const yValues = scatterPlotData[clusterId]?.y || [];
    const clusterData = extractScatterPlotData(yValues);

    return {
      label: `Cluster ${clusterId}`,
      data: clusterData.map((point) => ({
        x: point.x, // x-axis as point index
        y: point.y, // y-axis as median price
        r: (clusterPoints.length || 1) / 100, // Scale bubble size as needed
      })),
      backgroundColor: clusterColors[index] || '#000', // Use default color if out of predefined colors
      borderColor: '#000',
      borderWidth: 1,
    };
  });

  const data = {
    datasets: datasets,
  };

  return (
    <div>
      <h2>Cluster Scatter Plot</h2>
      <Scatter
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              enabled: false, // Disable tooltips completely
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Point Index',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Median Price',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ClusterScatterPlotting;
