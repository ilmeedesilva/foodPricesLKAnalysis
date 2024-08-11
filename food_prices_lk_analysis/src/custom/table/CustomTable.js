import React, { useState } from "react";
import style from "./CustomTable.module.scss";

const CustomTable = ({ Data }) => {
  const [tableData, setTableData] = useState(Data.rows);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...tableData].sort((a, b) => {
      if (a[column] < b[column]) return direction === "ascending" ? -1 : 1;
      if (a[column] > b[column]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key: column, direction });
    setTableData(sortedData);
  };

  const handleCheckboxChange = (event, rowIndex) => {
    const updatedData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, isChecked: event.target.checked };
      }
      return row;
    });

    setTableData(updatedData);
  };

  return (
    <div>
      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        className={style.tableStyle}
      >
        <thead>
          <tr>
            <th>Select</th>
            {Data.headers.map((header) => (
              <th key={header} onClick={() => handleSort(header)}>
                {header}{" "}
                {sortConfig.key === header
                  ? sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className={style.checkBoxWrp}>
                <input
                  type="checkbox"
                  checked={!!row.isChecked}
                  onChange={(e) => handleCheckboxChange(e, index)}
                />
              </td>
              {Data.headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
