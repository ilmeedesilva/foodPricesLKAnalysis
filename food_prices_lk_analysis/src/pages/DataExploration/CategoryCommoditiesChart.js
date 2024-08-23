import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CommodityFrequencyChart = ({ data = [] }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Ensure `data` is an array
      if (Array.isArray(data)) {
        const commodityCounts = data.reduce((acc, row) => {
          if (row && row.commodity) {
            acc[row.commodity] = (acc[row.commodity] || 0) + 1;
          }
          return acc;
        }, {});

        const chartData = {
          labels: Object.keys(commodityCounts),
          datasets: [
            {
              label: "Commodity Frequency",
              data: Object.values(commodityCounts),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#E7E9ED",
                "#B3E5FC",
                "#F06292",
                "#64B5F6",
                "#81C784",
                "#FFD54F",
                "#FFB74D",
                "#D4E157",
                "#FF7043",
                "#B2FF59",
                "#7E57C2",
                "#FF5252",
                "#A1887F",
                "#BDBDBD",
                "#9575CD",
                "#FF8A65",
                "#A5D6A7",
                "#FFF176",
                "#90A4AE"
              ],
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        };

        const config = {
          type: "bar",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allows custom size
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Commodities",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Frequency",
                },
              },
            },
          },
        };

        chartInstanceRef.current = new Chart(chartRef.current, config);
      } else {
        console.error("Data is not an array or is undefined.");
      }
    }
  }, [data]);

  return (
    <div style={{ width: "100%", height: "600px", margin: "0 auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CommodityFrequencyChart;
