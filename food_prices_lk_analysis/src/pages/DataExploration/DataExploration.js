import React, { useState } from "react";
import style from "./DataExploration.module.scss";
import CustomTable from "../../custom/table/CustomTable";
import CustomButton from "../../custom/CustomButton";
import ExportIcon from "../../img/svg/Export.icon";
import FilterIcon from "../../img/svg/Filter.icon";
import CustomChart from "../../custom/charts/CustomChart";

const sampleData = {
  headers: ["Name", "Age", "Gender", "Country"],
  rows: [
    { Name: "John Doe", Age: 28, Gender: "Male", Country: "USA" },
    { Name: "Jane Smith", Age: 34, Gender: "Female", Country: "UK" },
    { Name: "Sam Johnson", Age: 22, Gender: "Male", Country: "Canada" },
    { Name: "Alice Brown", Age: 29, Gender: "Female", Country: "Australia" },
  ],
};

const chartData = {
  labels: sampleData.rows.map((row) => row.Name),
  datasets: [
    {
      label: "Sample Data",
      data: sampleData.rows.map((row) => row.Age),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const DataExploration = () => {
  const [chartType, setChartType] = useState("line");

  return (
    <div className="content-wrap">
      <div className={style.wrpRow}>
        <h1>Data Exploration</h1>
        <div className={style.wrapOptions}>
          <CustomButton
            buttonClass={"LEFT_ICON_BTN"}
            type={"button"}
            text={"Filter"}
            icon={<FilterIcon size={20} />}
          />
          <CustomButton
            buttonClass={"LEFT_ICON_BTN"}
            type={"button"}
            text={"Export"}
            icon={<ExportIcon size={20} />}
          />
          <CustomButton />
        </div>
      </div>
      <div className={`content-100 ${style.wrpRow}`}>
        <div className={style.tblWrp}>
          <CustomTable Data={sampleData} />
        </div>
        <div className={style.mainChrWrp}>
          <CustomChart
            chartType={"bar"}
            chartData={chartData}
            options={chartOptions}
          />
        </div>
      </div>
      <div>
        <div className={style.wrpRow}>
          <div className={style.rowMltiChrt50}>
            <CustomChart
              chartType={"line"}
              chartData={chartData}
              options={chartOptions}
            />
          </div>
          <div className={style.rowMltiChrt50}>
            <CustomChart
              chartType={"doughnut"}
              chartData={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExploration;
