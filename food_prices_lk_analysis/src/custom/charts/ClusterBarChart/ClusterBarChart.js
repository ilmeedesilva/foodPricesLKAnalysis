import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const ClusterBarChart = ({ clusters }) => {
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

  const clusterData = Object.keys(clusterCounts).map((label) => ({
    cluster_label: label,
    count: clusterCounts[label].count,
    markets: clusterCounts[label].markets.join(", "),
  }));

  return (
    <BarChart
      width={1000}
      height={500}
      data={clusterData}
      margin={{ top: 50, right: 30, bottom: 30, left: 40 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="cluster_label" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8">
        <LabelList dataKey="markets" position="top" />
      </Bar>
    </BarChart>
  );
};

export default ClusterBarChart;
