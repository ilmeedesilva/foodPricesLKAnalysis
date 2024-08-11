import React, { useState } from "react";
import style from "../page.module.scss";
import style2 from "./Predictions.module.scss";
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

const Predictions = () => {
  const [chartType, setChartType] = useState("line");

  return (
    <div className="content-wrap">
      <h1>Predictions</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className={style.wrpRow}>
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
          {/* <CustomButton /> */}
        </div>
      </div>
      <div className={`content-100 ${style.wrpRow}`}>
        <div className={`${style.tblWrp}`}>
          <CustomTable Data={sampleData} />
        </div>
        <div className={`chrtwrp ${style.mainChrWrp}`}>
          <CustomChart
            chartType={"bar"}
            chartData={chartData}
            options={chartOptions}
          />
        </div>
      </div>
      <div>
        <div className={[style.wrpRow, style.doubleChrts].join(" ")}>
          <div className={`chrtwrp ${style.rowMltiChrtFiftyFity}`}>
            <CustomChart
              chartType={"line"}
              chartData={chartData}
              options={chartOptions}
            />
          </div>
          <div className={`chrtwrp ${style.rowMltiChrtFiftyFity}`}>
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

export default Predictions;
