import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import style from "../page.module.scss";
import style2 from "./DataExploration.module.scss";
import style3 from "../../styles/common.module.scss";

// Function to format data for PieChart
const dataFormatter = (data, key) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array");
    return [];
  }

  const countMap = data.reduce((acc, item) => {
    if (item[key]) {
      acc[item[key]] = (acc[item[key]] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(countMap).map(([name, value]) => ({ name, value }));
};

const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

const MarketCategoryCommodityCharts = ({ data = [] }) => {
  // Ensure data is an array and handle cases where data might be undefined
  const marketData = dataFormatter(data, "market");
  const categoryData = dataFormatter(data, "category");
  const commodityData = dataFormatter(data, "commodity");

  return (
    <div>
      {/* <div className={[style.wrpRow, style.tripleChart].join(" ")}> */}
      {/* <div className={`chrtwrp ${style.rowTripleChrtFiftyFity}`}>
          <h2>Markets Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={marketData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {marketData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div> */}

      <h2>Categories Distribution</h2>
     
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#82ca9d"
            label
          >
            {categoryData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

      {/* <div className={`chrtwrp ${style.rowTripleChrtFiftyFity}`}>
          <h2>Commodities Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={commodityData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#ffc658"
              label
            >
              {commodityData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default MarketCategoryCommodityCharts;
