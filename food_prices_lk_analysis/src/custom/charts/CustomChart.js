import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import style from "./CustomChart.module.scss";

// chart types
//line
//bar
//pie
//doughnut

const CustomChart = ({ chartType, chartData, options }) => {
  const chartRef = useRef(null);
  let myChart;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: options,
    });

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartType, chartData, options]);

  return (
    <div className={style.chrtwrp}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CustomChart;
