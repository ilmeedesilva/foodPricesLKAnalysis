import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const ClusterPieChart = ({ clusters }) => {
  console.log("clusters = ", clusters);
  // Ensure clusters is an array
  if (!Array.isArray(clusters)) {
    return <div>Error: Invalid data format.</div>;
  }

  // Process dataset to count the number of markets in each cluster
  const clusterCounts = clusters.reduce((acc, { cluster_label, market }) => {
    if (!acc[cluster_label]) {
      acc[cluster_label] = { count: 0, markets: [] };
    }
    acc[cluster_label].count += 1;
    if (!acc[cluster_label].markets.includes(market)) {
      acc[cluster_label].markets.push(market);
    }
    return acc;
  }, {});

  // Convert to array of objects for PieChart
  const clusterData = Object.keys(clusterCounts).map((label) => ({
    cluster_label: label,
    count: clusterCounts[label].count,
    markets: clusterCounts[label].markets.join(", "),
  }));

  // Define colors for clusters
  const COLORS = ["#ff6f61", "#ffcc00", "#6b8e23"];

  return (
    <PieChart width={600} height={400}>
      <Pie
        data={clusterData}
        dataKey="count"
        nameKey="cluster_label"
        outerRadius={150}
        fill="#8884d8"
        label={({ name, percent }) => `${name} (${Math.round(percent * 100)}%)`}
      >
        {clusterData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip
        content={({ payload }) => {
          if (!payload || payload.length === 0) return null;
          const {
            name,
            value,
            payload: { markets },
          } = payload[0];
          return (
            <div>
              <strong>{name}</strong>
              <div>Count: {value}</div>
              <div>Markets: {markets}</div>
            </div>
          );
        }}
      />
    </PieChart>
  );
};

export default ClusterPieChart;
