import React, { useEffect, useState } from "react";
import style from "../page.module.scss";
import style2 from "./DataExploration.module.scss";
import CustomTable from "../../custom/table/CustomTable";
import CustomButton from "../../custom/CustomButton";
import ExportIcon from "../../img/svg/Export.icon";
import FilterIcon from "../../img/svg/Filter.icon";
import CustomChart from "../../custom/charts/CustomChart";
import CareBearFoods from "../../api/services/CareBearFoods";
import ContentLoader from "react-content-loader";

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
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const getCsvData = async () => {
    setIsLoading(true);
    try {
      let respond = await CareBearFoods.getAllCSVData();
      const respondHeader = await CareBearFoods.getAllCSVHeader();

      // Replace `NaN` with `null` in the JSON string
      respond = respond.replace(/NaN/g, "null");

      // Parse the `rows` string into an array of objects
      const parsedRows = JSON.parse(respond);

      console.log("headers: ", respondHeader);
      console.log("parsed rows: ", parsedRows);

      // Set table data with parsed rows and headers
      setTableData({
        headers: respondHeader,
        rows: parsedRows,
      });

      console.log("tableData - ", tableData);
    } catch (e) {
      console.log("error - ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCsvData();
  }, []);

  return (
    <div className="content-wrap">
      <h1>Data Exploration</h1>
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
        {isLoading ? (
          <div className={`content-100 ${style2.wrpRowCenter}`}>
            <ContentLoader viewBox="0 0 800 120">
              <rect x="67" y="0" rx="2" ry="2" width="600" height="18" />
              <rect x="67" y="22" rx="2" ry="2" width="600" height="18" />
              <rect x="67" y="44" rx="2" ry="2" width="600" height="18" />
              <rect x="67" y="66" rx="2" ry="2" width="600" height="18" />
              <rect x="67" y="88" rx="2" ry="2" width="600" height="18" />
            </ContentLoader>
          </div>
        ) : (
          <div className={style2.tableWrp}>
            <CustomTable Data={tableData} />
          </div>
        )}
      </div>

      <div>
        <div className={[style.wrpRow, style.tripleChart].join(" ")}>
          <div className={`chrtwrp ${style.rowTripleChrtFiftyFity}`}>
            <CustomChart
              chartType={"line"}
              chartData={chartData}
              options={chartOptions}
            />
          </div>
          <div className={`chrtwrp ${style.rowTripleChrtFiftyFity}`}>
            <CustomChart
              chartType={"doughnut"}
              chartData={chartData}
              options={chartOptions}
            />
          </div>
          <div className={`chrtwrp ${style.rowTripleChrtFiftyFity}`}>
            <CustomChart
              chartType={"bar"}
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
