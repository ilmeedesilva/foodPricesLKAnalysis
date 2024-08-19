import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";
import style from "../page.module.scss";
import style2 from "./DataExploration.module.scss";
import style3 from "../../styles/common.module.scss";
import CustomTable from "../../custom/table/CustomTable";
import CustomButton from "../../custom/CustomButton";
import ExportIcon from "../../img/svg/Export.icon";
import FilterIcon from "../../img/svg/Filter.icon";
import CustomChart from "../../custom/charts/CustomChart";
import CareBearFoods from "../../api/services/CareBearFoods";
import ContentLoader from "react-content-loader";
import CustomModal from "../../custom/modal/CustomModal";
import CloseIcon from "../../img/svg/Close.icon";
import DatePicker from "react-datepicker";
import ResetIcon from "../../img/svg/Reset.icon";
import PriceRangeSlider from "../../custom/customPriceRangeSlider/PriceRangeSlider";
import NextIcon from "../../img/svg/Next.icon";
import MessageModal from "../../custom/message/MessageModal";
import LinearRegression from "../mlModals/LinearRegression";
import RandomForest from "../mlModals/RandomForest";
import Stepper from "../../components/Stepper/Stepper";
import Modal from "../../components/Modal/Modal";
import { MODAL_TYPES } from "../../enums";
import NoData from "../../components/NoData/NoData";
import SVM from "../mlModals/SVM";

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
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalRows, settotalRows] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterHeader, setFilterHeaders] = useState([]);
  const [filterRowData, setFilterRowData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [advanceFilterVisible, setAdvanceFilterVisible] = useState(false);
  const [tableHeadersWidth, setTalbeHeadersWidth] = useState({});
  const [filteredAdmin1, setFilteredAdmin1] = useState();
  const [filteredAdmin2, setFilteredAdmin2] = useState();
  const [filteredMarket, setFilteredMarket] = useState();
  const [filteredCategory, setFilteredCategory] = useState();
  const [filteredCommodity, setFilteredCommodity] = useState();
  const [filteredPriceFlag, setFilteredPriceFlag] = useState();
  const [filteredPriceType, setFilteredPriceType] = useState();
  const [filteredPrice, setFilteredPrice] = useState();
  const [filteredUsdPrice, setFilteredUsdPrice] = useState();
  const [filteredUsdRate, setFilteredUsdRate] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedUSDPriceRange, setSelectedUSDPriceRange] = useState([]);
  const [selectedUSDRate, setSelectedUSDRate] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModal, setSelectedModal] = useState("");
  const [error, setError] = useState("");

  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCsvData = async () => {
    setIsLoading(true);
    try {
      let respond = await CareBearFoods.getAllCSVData();
      const respondHeader = await CareBearFoods.getAllCSVHeader();

      respond = respond.replace(/NaN/g, "null");

      const parsedRows = JSON.parse(respond);
      settotalRows(parsedRows);

      const uniqueAdmin1 = new Set();
      const uniqueAdmin2 = new Set();
      const uniqueMarket = new Set();
      const uniqueCategory = new Set();
      const uniqueCommodity = new Set();
      const uniquePriceFlag = new Set();
      const uniquePriceType = new Set();
      const uniquePriceCurrency = new Set();

      let minPrice = Infinity;
      let maxPrice = -Infinity;
      let minUsdPrice = Infinity;
      let maxUsdPrice = -Infinity;
      let minUsdRate = Infinity;
      let maxUsdRate = -Infinity;

      parsedRows.forEach((row) => {
        uniqueAdmin1.add(row.admin1);
        uniqueAdmin2.add(row.admin2);
        uniqueMarket.add(row.market);
        uniqueCategory.add(row.category);
        uniqueCommodity.add(row.commodity);
        uniquePriceFlag.add(row.priceflag);
        uniquePriceType.add(row.pricetype);
        uniquePriceCurrency.add(row.currency);

        minPrice = Math.min(minPrice, row.price);
        maxPrice = Math.max(maxPrice, row.price);
        minUsdPrice = Math.min(minUsdPrice, row.usdprice);
        maxUsdPrice = Math.max(maxUsdPrice, row.usdprice);
        minUsdRate = Math.min(minUsdRate, row["USD RATE"]);
        maxUsdRate = Math.max(maxUsdRate, row["USD RATE"]);
      });

      setFilteredAdmin1(Array.from(uniqueAdmin1));
      setFilteredAdmin2(Array.from(uniqueAdmin2));
      setFilteredMarket(Array.from(uniqueMarket));
      setFilteredCategory(Array.from(uniqueCategory));
      setFilteredCommodity(Array.from(uniqueCommodity));
      setFilteredPriceFlag(Array.from(uniquePriceFlag));
      setFilteredPriceType(Array.from(uniquePriceType));
      setFilteredPrice({ min: minPrice, max: maxPrice });
      setFilteredUsdPrice({ min: minUsdPrice, max: maxUsdPrice });
      setFilteredUsdRate({ min: minUsdRate, max: maxUsdRate });

      setFilterHeaders(respondHeader);
      setTableData({
        headers: respondHeader,
        rows: parsedRows,
      });

      setTalbeHeadersWidth({ select: "42px", id: "45px", date: "86px" });
    } catch (e) {
      console.log("error - ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHeaders = (filterOutHeader) => {
    setFilterHeaders((pre) => pre.filter((item) => item !== filterOutHeader));
  };

  const restoreHeaders = () => {
    setFilterHeaders(tableData.headers);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const exportCsv = () => {
    if (!tableData || !tableData.headers || !tableData.rows) {
      return;
    }

    const headers = tableData.headers.join(",");
    const rows = tableData.rows
      .map((row) =>
        tableData.headers.map((header) => row[header] || "").join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "exported_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFiltering = () => {
    setTableData((prevTableData) => {
      const filteredHeaders = prevTableData.headers.filter((header) =>
        filterHeader.includes(header)
      );

      let filteredRows = prevTableData.rows
        .filter((row) => {
          if (startDate && endDate) {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);

            const rowDate = row.date;
            return rowDate >= formattedStartDate && rowDate <= formattedEndDate;
          }
          return true;
        })
        .filter((row) => {
          const matchesCommodity = filteredCommodity.includes(row.commodity);
          return matchesCommodity;
        })
        .filter((row) => {
          const matchesAdmin1 = filteredAdmin1.includes(row.admin1);
          return matchesAdmin1;
        })
        .filter((row) => {
          const matchesAdmin2 = filteredAdmin2.includes(row.admin2);
          return matchesAdmin2;
        })
        .filter((row) => {
          const matchesMarket = filteredMarket.includes(row.market);
          return matchesMarket;
        })
        .filter((row) => {
          const matchesPriceflag = filteredPriceFlag.includes(row.priceflag);
          return matchesPriceflag;
        })
        .filter((row) => {
          const matchesPriceType = filteredPriceType.includes(row.pricetype);
          return matchesPriceType;
        })
        .filter((row) => {
          if (selectedPriceRange.length === 2) {
            const [minPrice, maxPrice] = selectedPriceRange;
            return row.price >= minPrice && row.price <= maxPrice;
          }
          return true;
        })
        .filter((row) => {
          if (selectedUSDPriceRange.length === 2) {
            const [minPrice, maxPrice] = selectedUSDPriceRange;
            return row.usdprice >= minPrice && row.usdprice <= maxPrice;
          }
          return true;
        })
        .filter((row) => {
          if (selectedUSDRate.length === 2) {
            const [minPrice, maxPrice] = selectedUSDRate;
            return row["USD RATE"] >= minPrice && row["USD RATE"] <= maxPrice;
          }
          return true;
        })
        .map((row) => {
          const filteredRow = {};
          filteredHeaders.forEach((header) => {
            if (row.hasOwnProperty(header)) {
              filteredRow[header] = row[header];
            }
          });
          return filteredRow;
        });

      setFilterModalOpen(false);
      setFilterRowData([
        ...filterRowData,
        ...filteredPriceType,
        ...filteredPriceFlag,
        ...filteredCommodity,
        ...filteredMarket,
        ...filteredAdmin1,
        ...filteredAdmin2,
      ]);
      return {
        headers: filteredHeaders,
        rows: filteredRows,
      };
    });
  };

  useEffect(() => {
    if (!filterModalOpen) {
      restoreHeaders();
    }
  }, [filterModalOpen]);

  useEffect(() => {
    getCsvData();
  }, []);

  useEffect(() => {
    if (filterModalOpen || error) {
      ScrollToTopButton();
    }
  }, [filterModalOpen, error]);

  const handleNextStep = () => {
    if (currentStep === 2) {
      if (!selectedModal) {
        setError("Must select at least 1 modal to continue.");
        return;
      } else {
        setError("");
      }
    }
    setCurrentStep((pre) => (pre < 4 ? pre + 1 : pre));
  };

  useEffect(() => {
    if (currentStep === 2 && selectedModal) {
      if (error === "Must select at least 1 modal to continue.") {
        setError("");
      }
    }
  }, [selectedModal]);

  function getMinMaxDates(data) {
    if (data.length) {
      const dates = data.map((row) => new Date(row.date));

      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));

      const formatDate = (date) => date.toISOString().split("T")[0];

      return `${formatDate(minDate)} | ${formatDate(maxDate)}`;
    }
    return "";
  }

  return (
    <div className="content-wrap">
      {error ? (
        <div className={style2.alertModal}>
          <MessageModal type={"error"} description={error} />
        </div>
      ) : (
        ""
      )}
      <Stepper
        getSelectedStepper={(value) => setCurrentStep(value)}
        selectedStepper={currentStep}
      />
      {currentStep > 1 ? (
        <div className={style2.filteredSummery}>
          <div className={style2.summeryItem}>
            <h6>Total Available Data Rows</h6>
            <span className={style2.summeryValue}>
              {tableData.length
                ? tableData.rows.length
                : totalRows.length ?? "Loading..."}
            </span>
          </div>
          <div className={style2.summeryItem}>
            <h6>Date Range</h6>
            <span className={style2.summeryValue}>
              {" "}
              {tableData.length
                ? getMinMaxDates(tableData.rows)
                : totalRows.length
                ? getMinMaxDates(tableData.rows)
                : "Loading..."}
            </span>
          </div>
          <div className={style2.summeryItem}>
            <h6>Available Columns</h6>
            <div className={style2.headerListWrp}>
              {filterHeader && filterHeader.length
                ? filterHeader.map((item) => {
                    return <div className={style2.headerList}>{item}</div>;
                  })
                : ""}
            </div>
          </div>
          <div className={style2.summeryItem}>
            <h6>Loading...</h6>
            <span className={style2.summeryValue}>
              {tableData.length ? tableData.rows.length : "Loading..."}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={`${style2.sectionHeader}  mb-2`}>
        <h1 className={`header-md d-flex align-center`}>
          {currentStep === 1 ? (
            "Data Filtering"
          ) : currentStep === 2 ? (
            "Modal Selection"
          ) : currentStep === 3 ? (
            <>
              Data Analysis
              <span className={style.curretnModal}>{selectedModal}</span>
            </>
          ) : currentStep === 4 ? (
            "Report"
          ) : (
            "Finshed"
          )}
        </h1>

        <CustomButton
          text={"Next"}
          buttonClass={"NEXT_BUTTON"}
          rightIcon={<NextIcon color={"#ffffff"} size={20} />}
          onClick={() => {
            handleNextStep();
          }}
          loading={isLoading}
        />
      </div>
      {currentStep === 1 ? (
        <div className={style.dataExploration}>
          <p className="text-sm">
            This dataset contains Food Prices data for Sri Lanka. Food prices
            data comes from the World Food Programme and covers foods such as
            maize, rice, beans, fish, and sugar for 76 countries and some 1,500
            markets. It is updated weekly but contains to a large extent monthly
            data. The data goes back as far as 1992 for a few countries,
            although many countries started reporting from 2003 or thereafter.
          </p>
          <div className="d-flex flex-column mb-4">
            <p className="mt-0 mb-0 text-sm">License -</p>
            <span className="text-sm">
              Creative Commons Attribution for Intergovernmental Organisations
            </span>
          </div>
          <div className={style.wrpRow}>
            <div className={style.wrapOptions}>
              <CustomButton
                buttonClass={"LEFT_ICON_BTN"}
                type={"button"}
                text={"Filter"}
                onClick={() => setFilterModalOpen(true)}
                icon={<FilterIcon size={20} />}
                loading={isLoading}
              />
              <CustomButton
                buttonClass={"LEFT_ICON_BTN"}
                type={"button"}
                text={"Export"}
                icon={<ExportIcon size={20} />}
                onClick={() => exportCsv()}
                loading={isLoading}
              />

              <CustomButton
                buttonClass={"LEFT_ICON_BTN"}
                type={"button"}
                text={"Reset"}
                icon={<ResetIcon size={20} />}
                onClick={() => getCsvData()}
                loading={isLoading}
              />
              {/* <CustomButton /> */}
            </div>
          </div>
          <div className={`content-100 ${style.wrpRow}`}>
            {isLoading ? (
              <div className={`content-100 ${style2.wrpRowCenter}`}>
                <ContentLoader viewBox="0 0 800 260">
                  <rect x="0" y="0" rx="2" ry="2" width="765" height="34" />
                  <rect x="0" y="40" rx="2" ry="2" width="765" height="34" />
                  <rect x="0" y="80" rx="2" ry="2" width="765" height="34" />
                  <rect x="0" y="120" rx="2" ry="2" width="765" height="34" />
                  <rect x="0" y="160" rx="2" ry="2" width="765" height="34" />
                  <rect x="0" y="200" rx="2" ry="2" width="765" height="34" />
                </ContentLoader>
              </div>
            ) : !isLoading && tableData.headers && !tableData.headers.length ? (
              <NoData />
            ) : (
              <div className={style2.tableWrp}>
                <CustomTable Data={tableData} tableWidth={tableHeadersWidth} />
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
          {filterModalOpen ? (
            <CustomModal title={"Filter"} open={setFilterModalOpen}>
              <div
                className={
                  advanceFilterVisible
                    ? [style3.wrapFilters, style3.advanceFilterApply].join(" ")
                    : style3.wrapFilters
                }
              >
                <div className={style3.filterHeaders}>
                  <h6 className="mb-0">Filter Headers</h6>
                  <span className="text-sm mb-2">
                    Selected Headers {filterHeader.length} /{" "}
                    {tableData.headers.length}
                  </span>
                  <div className={style3.headersWrp}>
                    {filterHeader.map((header) => (
                      <button
                        className={style3.headerItem}
                        onClick={() => filterHeaders(header)}
                      >
                        <p>{header}</p>
                        <CloseIcon size={12} color={"#496bf3"} />
                      </button>
                    ))}
                  </div>
                  {advanceFilterVisible ? (
                    <div className={style3.advFilterWrp}>
                      {filterHeader.find((item) => item === "admin1") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter Admin 1</h6>
                          <div className={style3.headersWrp}>
                            {filteredAdmin1.map((header) => (
                              <button
                                className={style3.headerItem}
                                onClick={() =>
                                  setFilteredAdmin1((pre) =>
                                    pre.filter((item) => item !== header)
                                  )
                                }
                              >
                                <p>{header}</p>
                                <CloseIcon size={12} color={"#496bf3"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "admin2") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter Admin 2</h6>
                          <div className={style3.headersWrp}>
                            {filteredAdmin2.map((header) => (
                              <button
                                className={style3.headerItem}
                                onClick={() =>
                                  setFilteredAdmin2((pre) =>
                                    pre.filter((item) => item !== header)
                                  )
                                }
                              >
                                <p>{header}</p>
                                <CloseIcon size={12} color={"#496bf3"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "market") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter Market</h6>
                          <div className={style3.headersWrp}>
                            {filteredMarket.map((header) => (
                              <button
                                className={style3.headerItem}
                                onClick={() =>
                                  setFilteredMarket((pre) =>
                                    pre.filter((item) => item !== header)
                                  )
                                }
                              >
                                <p>{header}</p>
                                <CloseIcon size={12} color={"#496bf3"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "category") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter Category</h6>
                          <div className={style3.headersWrp}>
                            {filteredCategory.map((header) => (
                              <button
                                className={style3.headerItem}
                                onClick={() =>
                                  setFilteredCategory((pre) =>
                                    pre.filter((item) => item !== header)
                                  )
                                }
                              >
                                <p>{header}</p>
                                <CloseIcon size={12} color={"#496bf3"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "commodity") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter Commodity</h6>
                          <div className={style3.headersWrp}>
                            {filteredCommodity.map((header) => (
                              <button
                                className={style3.headerItem}
                                onClick={() =>
                                  setFilteredCommodity((pre) =>
                                    pre.filter((item) => item !== header)
                                  )
                                }
                              >
                                <p>{header}</p>
                                <CloseIcon size={12} color={"#496bf3"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "pricetype") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter Price Type</h6>
                          <div className={style3.headersWrp}>
                            {filteredPriceType.map((header) => (
                              <button
                                className={style3.headerItem}
                                onClick={() =>
                                  setFilteredPriceType((pre) =>
                                    pre.filter((item) => item !== header)
                                  )
                                }
                              >
                                <p>{header}</p>
                                <CloseIcon size={12} color={"#496bf3"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "price") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className={`mb-0 ${style3.filterItemsSmWid}`}>
                            Filter Price
                          </h6>
                          <div className={style3.rangeSelectionWrp}>
                            <PriceRangeSlider
                              min={filteredPrice.min}
                              max={filteredPrice.max}
                              onChange={(range) =>
                                setSelectedPriceRange(range, "price")
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "usdprice") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter USD Price</h6>
                          <div className={style3.rangeSelectionWrp}>
                            <PriceRangeSlider
                              min={filteredUsdPrice.min}
                              max={filteredUsdPrice.max}
                              onChange={(range) =>
                                setSelectedUSDPriceRange(range, "usePrice")
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {filterHeader.find((item) => item === "USD RATE") ? (
                        <div className={style3.filterItemSection}>
                          <h6 className="mb-0">Filter USD Rate</h6>
                          <div className={style3.rangeSelectionWrp}>
                            <PriceRangeSlider
                              min={filteredUsdRate.min}
                              max={filteredUsdRate.max}
                              onChange={(range) =>
                                setSelectedUSDRate(range, "usdRate")
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={`d-flex  flex-column align-flex-start${style3.dateRangeSelector}`}
                  >
                    <h6 className="mb-4 mt-4">Filter Date Range</h6>

                    <div className={style3.dateWrp}>
                      <div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className="form-control"
                          placeholderText="Select start date"
                        />
                      </div>
                      <div>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className="form-control"
                          placeholderText="Select end date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style3.advanceOptions}>
                  <button
                    className={style3.LinkBtn}
                    onClick={() =>
                      setAdvanceFilterVisible(!advanceFilterVisible)
                    }
                  >
                    {advanceFilterVisible
                      ? "Hide Advance Filters"
                      : "Advance Filters"}
                  </button>
                </div>
                <div className={style3.advanceFilterVisible}></div>
                <div className={style3.footerFilter}>
                  <button
                    className={style3.cancel}
                    onClick={() => setFilterModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className={style3.primary} onClick={handleFiltering}>
                    Apply
                  </button>
                </div>
              </div>
            </CustomModal>
          ) : (
            ""
          )}
        </div>
      ) : currentStep === 2 ? (
        <Modal getSelectedModal={(value) => setSelectedModal(value)} />
      ) : currentStep === 3 ? (
        <div className={style2.wrpAnyzls}>
          {selectedModal === MODAL_TYPES.LINEAR_REGRESSION ? (
            <div className={style2.regWrp}>
              <LinearRegression
                dataset={tableData.rows}
                variables={filterHeader}
                headers={{
                  markets: filteredMarket,
                  category: filteredCategory,
                  commoditiy: filteredCommodity,
                }}
                setStep={(step) => setCurrentStep(step)}
              />
            </div>
          ) : selectedModal === MODAL_TYPES.RANDOM_FOREST ? (
            <div className={style2.regWrp}>
              <RandomForest
                dataset={tableData.rows}
                headers={{
                  markets: filteredMarket,
                  category: filteredCategory,
                  commoditiy: filteredCommodity,
                }}
                variables={filterHeader}
                setStep={(step) => setCurrentStep(step)}
              />
            </div>
          ) : selectedModal === MODAL_TYPES.SUPPORT_VECTOR_MACHINE ? (
            <SVM
              dataset={tableData.rows}
              headers={{
                markets: filteredMarket,
                category: filteredCategory,
                commoditiy: filteredCommodity,
              }}
              variables={filterHeader}
              setStep={(step) => setCurrentStep(step)}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>Step 4</div>
      )}
    </div>
  );
};

export default DataExploration;
