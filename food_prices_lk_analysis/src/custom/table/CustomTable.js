import React, { useState, useEffect } from "react";
import style from "./CustomTable.module.scss";
import NextIcon from "../../img/svg/Next.icon";
import PreviousIcon from "../../img/svg/Previous.icon";

const CustomTable = ({ Data, tableWidth }) => {
  const [tableData, setTableData] = useState(Data.rows || []);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setTableData(Data.rows || []);
    setCurrentPage(1);
  }, [Data]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

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

  // Handle pagination
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(tableData.length / rowsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      {Data.headers && Data.headers.length ? (
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          className={style.tableStyle}
        >
          <thead>
            <tr>
              <th
                style={{
                  width:
                    tableWidth && tableWidth.select
                      ? tableWidth.select
                      : "50px",
                  maxWidth:
                    tableWidth && tableWidth.select
                      ? tableWidth.select
                      : "50px",
                }}
              >
                Select
              </th>
              {Data.headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  style={{
                    width:
                      tableWidth && tableWidth.hasOwnProperty(header)
                        ? tableWidth[header]
                        : "50px",
                    maxWidth:
                      tableWidth && tableWidth.hasOwnProperty(header)
                        ? tableWidth[header]
                        : "50px",
                  }}
                >
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
            {currentRows.map((row, index) => (
              <tr key={indexOfFirstRow + index}>
                <td className={style.checkBoxWrp}>
                  <input
                    type="checkbox"
                    checked={!!row.isChecked}
                    onChange={(e) =>
                      handleCheckboxChange(e, indexOfFirstRow + index)
                    }
                  />
                </td>
                {Data.headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}

      {/* Pagination controls */}
      {Data.headers && Data.headers.length ? (
        <div className={style.paginationControls}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <PreviousIcon
              size={20}
              color={currentPage === 1 ? "#f4f4f4" : "#2196F3"}
            />
          </button>
          <span>
            Page {currentPage} of {Math.ceil(tableData.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(tableData.length / rowsPerPage)}
          >
            <NextIcon
              size={20}
              color={
                currentPage === Math.ceil(tableData.length / rowsPerPage)
                  ? "#f4f4f4"
                  : "#2196F3"
              }
            />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomTable;
