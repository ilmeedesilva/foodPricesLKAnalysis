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
import StepIcon from "../../img/svg/Step.icon";
import NextIcon from "../../img/svg/Next.icon";
import KmeanIcon from "../../img/svg/Kmean.icon";
import RandomForestIcon from "../../img/svg/RandomForest.icon";
import SVMIcon from "../../img/svg/SVM.icon";
import LinearIcon from "../../img/svg/Linear.icon";
import MessageModal from "../../custom/message/MessageModal";

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
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterHeader, setFilterHeaders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [advanceFilterVisible, setAdvanceFilterVisible] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [tableHeadersWidth, setTalbeHeadersWidth] = useState({});
  const [filteredAdmin1, setFilteredAdmin1] = useState();
  const [filteredAdmin2, setFilteredAdmin2] = useState();
  const [filteredMarket, setFilteredMarket] = useState();
  const [filteredCommodity, setFilteredCommodity] = useState();
  const [filteredPriceFlag, setFilteredPriceFlag] = useState();
  const [filteredPriceType, setFilteredPriceType] = useState();
  const [filteredPriceCurrency, setFilteredPriceCurrency] = useState();
  const [filteredPrice, setFilteredPrice] = useState();
  const [filteredUsdPrice, setFilteredUsdPrice] = useState();
  const [filteredUsdRate, setFilteredUsdRate] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedUSDPriceRange, setSelectedUSDPriceRange] = useState([]);
  const [selectedUSDRate, setSelectedUSDRate] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLinearSelected, setIsLinearSelected] = useState(false);
  const [isRFSelected, setIsRFSelected] = useState(false);
  const [isSVMSelected, setIsSVMSelected] = useState(false);
  const [isKMSelected, setIsKMSelected] = useState(false);
  const [error, setError] = useState("");

  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("selectedPriceRange - ", selectedPriceRange);

  const getCsvData = async () => {
    setIsLoading(true);
    try {
      let respond = await CareBearFoods.getAllCSVData();
      const respondHeader = await CareBearFoods.getAllCSVHeader();

      respond = respond.replace(/NaN/g, "null");

      const parsedRows = JSON.parse(respond);

      const uniqueAdmin1 = new Set();
      const uniqueAdmin2 = new Set();
      const uniqueMarket = new Set();
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
      setFilteredCommodity(Array.from(uniqueCommodity));
      setFilteredPriceFlag(Array.from(uniquePriceFlag));
      setFilteredPriceType(Array.from(uniquePriceType));
      setFilteredPriceCurrency(Array.from(uniquePriceCurrency));

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
    if (filterModalOpen) {
      ScrollToTopButton();
    }
  }, [filterModalOpen]);

  const handleNextStep = () => {
    if (currentStep === 2) {
      if (
        !isLinearSelected &&
        !isSVMSelected &&
        !isRFSelected &&
        !isKMSelected
      ) {
        setError("Must select at least 1 modal to continue.");
        return;
      } else {
        setError("");
      }
    }
    setCurrentStep((pre) => (pre < 4 ? pre + 1 : pre));
  };

  useEffect(() => {
    if (
      currentStep === 2 &&
      (isLinearSelected || isSVMSelected || isRFSelected || isKMSelected)
    ) {
      if (error === "Must select at least 1 modal to continue.") {
        setError("");
      }
    }
  }, [isLinearSelected, isSVMSelected, isRFSelected, isKMSelected]);

  return (
    <div className="content-wrap">
      {console.log("error - ", error)}
      {console.log("currentStep - ", currentStep)}
      {error ? (
        <div className={style2.alertModal}>
          <MessageModal type={"error"} description={error} />
        </div>
      ) : (
        ""
      )}
      <div className={style2.stepperWrp}>
        <div
          className={
            currentStep >= 1
              ? [style2.stepPoint, style2.stepPointActive].join(" ")
              : style2.stepPoint
          }
        >
          <span className={style2.stepperTitle}>Data Filtering</span>
          <StepIcon
            size={25}
            color={currentStep >= 1 ? "#7050F9" : "#EEEFF2"}
          />
          <span className={style2.stepperLine} />
        </div>
        <div
          className={
            currentStep >= 2
              ? [style2.stepPoint, style2.stepPointActive].join(" ")
              : style2.stepPoint
          }
        >
          <span className={style2.stepperTitle}>Model Selection</span>
          <StepIcon
            size={25}
            color={currentStep >= 2 ? "#7050F9" : "#EEEFF2"}
          />
          <span className={style2.stepperLine} />
        </div>
        <div
          className={
            currentStep >= 3
              ? [style2.stepPoint, style2.stepPointActive].join(" ")
              : style2.stepPoint
          }
        >
          <span className={style2.stepperTitle}>
            data analysis & Predictions
          </span>
          <StepIcon
            size={25}
            color={currentStep >= 3 ? "#7050F9" : "#EEEFF2"}
          />
          <span className={style2.stepperLine} />
        </div>
        <div
          className={
            currentStep >= 4
              ? [style2.stepPoint, style2.stepPointActive, style2.endStep].join(
                  " "
                )
              : [style2.stepPoint, style2.endStep].join(" ")
          }
        >
          <span className={style2.stepperTitle}>Report</span>
          <StepIcon
            size={25}
            color={currentStep >= 4 ? "#7050F9" : "#EEEFF2"}
          />
        </div>
      </div>
      <div className={style2.sectionHeader}>
        <h1>
          {currentStep === 1
            ? "Data Filtering"
            : currentStep === 2
            ? "Modal Selection"
            : currentStep === 3
            ? "Data Analysis"
            : currentStep === 4
            ? "Report"
            : "Finshed"}
        </h1>

        <CustomButton
          text={"Next"}
          buttonClass={"NEXT_BUTTON"}
          rightIcon={<NextIcon color={"#ffffff"} size={20} />}
          onClick={() => {
            handleNextStep();
          }}
        />
      </div>
      {currentStep === 1 ? (
        <div className={style.dataExploration}>
          <p>
            This dataset contains Food Prices data for Sri Lanka. Food prices
            data comes from the World Food Programme and covers foods such as
            maize, rice, beans, fish, and sugar for 76 countries and some 1,500
            markets. It is updated weekly but contains to a large extent monthly
            data. The data goes back as far as 1992 for a few countries,
            although many countries started reporting from 2003 or thereafter.
          </p>
          <div className="d-flex flex-column mb-4">
            <p className="mt-0 mb-0">License -</p>
            <span>
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
              />
              <CustomButton
                buttonClass={"LEFT_ICON_BTN"}
                type={"button"}
                text={"Export"}
                icon={<ExportIcon size={20} />}
                onClick={() => exportCsv()}
              />

              <CustomButton
                buttonClass={"LEFT_ICON_BTN"}
                type={"button"}
                text={"Reset"}
                icon={<ResetIcon size={20} />}
                onClick={() => getCsvData()}
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
                        <CloseIcon size={12} />
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
                                <CloseIcon size={12} />
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
                                <CloseIcon size={12} />
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
                                <CloseIcon size={12} />
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
                                <CloseIcon size={12} />
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
                                <CloseIcon size={12} />
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
        <div className={style.dataExploration}>
          <p>
            This dataset contains Food Prices data for Sri Lanka. Food prices
            data comes from the World Food Programme and covers foods such as
            maize, rice, beans, fish, and sugar for 76 countries and some 1,500
            markets. It is updated weekly but contains to a large extent monthly
            data. The data goes back as far as 1992 for a few countries,
            although many countries started reporting from 2003 or thereafter.
          </p>

          <div>
            <div class={style2.modalContainer}>
              <label
                className={
                  isLinearSelected
                    ? [style2.modalItem, style2.modalItemActive].join(" ")
                    : style2.modalItem
                }
              >
                <input
                  type="checkbox"
                  class="card-checkbox"
                  id="card1"
                  onChange={(e) => setIsLinearSelected(e.target.checked)}
                />
                <div className={style2.modalCenter}>
                  <div className={style2.modalIcon}>
                    <LinearIcon
                      size={40}
                      color={isLinearSelected ? "#105CD1" : "#000000"}
                    />
                  </div>
                  <p>LINEAR</p>
                </div>
              </label>

              <label
                className={
                  isRFSelected
                    ? [style2.modalItem, style2.modalItemActive].join(" ")
                    : style2.modalItem
                }
              >
                <input
                  type="checkbox"
                  class="card-checkbox"
                  id="card2"
                  onChange={(e) => setIsRFSelected(e.target.checked)}
                />
                <div className={style2.modalCenter}>
                  <div className={style2.modalIcon}>
                    <RandomForestIcon
                      size={40}
                      color={isRFSelected ? "#105CD1" : "#000000"}
                    />
                  </div>
                  <p>RANDOM FOREST</p>
                </div>
              </label>

              <label
                className={
                  isSVMSelected
                    ? [style2.modalItem, style2.modalItemActive].join(" ")
                    : style2.modalItem
                }
              >
                <input
                  type="checkbox"
                  class="card-checkbox"
                  id="card3"
                  onChange={(e) => setIsSVMSelected(e.target.checked)}
                />
                <div className={style2.modalCenter}>
                  <div className={style2.modalIcon}>
                    <SVMIcon
                      size={40}
                      color={isSVMSelected ? "#105CD1" : "#000000"}
                    />
                  </div>
                  <p>SVM</p>
                </div>
              </label>

              <label
                className={
                  isKMSelected
                    ? [style2.modalItem, style2.modalItemActive].join(" ")
                    : style2.modalItem
                }
              >
                <input
                  type="checkbox"
                  class="card-checkbox"
                  id="card4"
                  onChange={(e) => setIsKMSelected(e.target.checked)}
                />
                <div className={style2.modalCenter}>
                  <div className={style2.modalIcon}>
                    <KmeanIcon
                      size={40}
                      color={isKMSelected ? "#105CD1" : "#000000"}
                    />
                  </div>
                  <p>K-MEANS</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      ) : currentStep === 3 ? (
        <>
          step 3
          {/* get the data from api
          check each of these below modal to see which modals have selected. according to that you can send api calls
          *isLinearSelected
          *isRFSelected
          *isSVMSelected
          *isKMSelected

          !send 'tableData'(instead of csv) state values to backend it has the filtered csv values. using this value get the modal
          results

          check getCsvData() function in above to see how to send api request for backend
          
          */}
        </>
      ) : (
        <>Step 4</>
      )}
    </div>
  );
};

export default DataExploration;
