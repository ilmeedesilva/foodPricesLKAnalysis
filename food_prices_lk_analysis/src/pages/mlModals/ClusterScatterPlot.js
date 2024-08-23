import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ClusterScatterPlot = ({ clusters = [], centroids = [] }) => {
  if (!clusters.length && !centroids.length) {
    return <p></p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="longitude" name="Longitude" />
        <YAxis type="number" dataKey="latitude" name="Latitude" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />

        {clusters.length > 0 && (
          <Scatter name="Clusters" data={clusters} fill="#8884d8" />
        )}

        {centroids.length > 0 && (
          <Scatter
            name="Centroids"
            data={centroids}
            fill="#ff7300"
            shape="star"
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ClusterScatterPlot;
