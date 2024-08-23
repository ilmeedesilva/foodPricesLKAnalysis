import React, { useEffect, useState } from "react";
import style from "../page.module.scss";
import style2 from "./MlModals.module.scss";
import CustomButton from "../../custom/CustomButton";
import CustomDropdown from "../../custom/dropdown/CustomDropdown";
import CustomModal from "../../custom/modal/CustomModal";
import CareBearFoods from "../../api/services/CareBearFoods";
import RegressionChart from "./RegressionChart";
import ModelMetrics from "./ModelMetrics";
import Explanation from "./Explanation";
import ContentLoader from "react-content-loader";
import NoData from "../../components/NoData/NoData";
import RiskManagementChart from "../../custom/charts/RiskManagementChart/RiskManagementChart";
import CloseIcon from "../../img/svg/Close.icon";
import RegressionBarChart from "./RegressionBarChart";
import CustomTable from "../../custom/table/CustomTable";
import MessageModal from "../../custom/message/MessageModal";
import { MODAL_TITLES } from "../../enums";
import CheckedIcon from "../../img/svg/Checked.icon";
import LinearRegressionChart from "../../custom/charts/LinearRegressionChart/LinearRegressionChart";
import { LineChart } from "recharts";
import SimpleLineChart from "../../custom/charts/LineChart/LineChart";
import ComparisonChart from "../../custom/charts/ComparisonChart/ComparisonChart";
import BarChartComponent from "../../custom/charts/BarChart/BarChart";
import TrendChart from "../../custom/charts/TrendChart/TrendChart";

const numarics = ["price", "usdprice", "USD RATE"];
const predictableOptions = ["Category", "Commodity"];
const LinearRegression = ({ dataset, variables, headers, setStep }) => {
  const [linearXaxis, setLinearXaxis] = useState([]);
  const [linearYaxis, setLinearYaxis] = useState(variables ? variables[0] : []);
  const [openFilterModal, setOpenFilterModal] = useState(true);
  const [response, setResponse] = useState(null);
  const [linearPredictionResponse, setLinearPredictionResponse] = useState({
    Category: [],
    Commodity: [],
    Market: [],
  });
  const [riskManagement, setRisManagement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [selectedMarkets, setSelectedMarkets] = useState(headers.markets ?? []);
  const [selectedCategory, setSelectedCategory] = useState(
    headers.category ?? []
  );
  const [selectedCommodity, setSelectedCommodity] = useState(
    headers.commoditiy ?? []
  );

  const [selectedPredictionType, setSelectedPredictionType] = useState("");
  const [trends, setTrends] = useState([]);

  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinearRegression = async () => {
    if (!linearXaxis.length || !linearYaxis) {
      if (!linearXaxis.length && linearYaxis) {
        setError("Must select Independent Variable");
      } else if (linearXaxis.length && !linearYaxis) {
        setError("Must select at least 1 Depending.");
      } else {
        setError("");
      }
      return;
    }
    setIsLoading(true);
    if (dataset.length) {
      try {
        const respond = await CareBearFoods.handleLinearRegression({
          dataset,
          linearYaxis,
          linearXaxis,
        });
        setResponse(respond);
        const respondForRiskManagement = await CareBearFoods.getRiskManagement({
          dataset,
        });
        setRisManagement([]);
        const { dates } = respondForRiskManagement.risk_management;
        const formattedDates = dates.map((dateStr) => {
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          return `${year}-${month}`;
        });

        setRisManagement({
          ...respondForRiskManagement.risk_management,
          dates: formattedDates,
        });
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
        setOpenFilterModal(false);
      }
    } else {
      setError("not enough data to show");
      setIsLoading(false);
    }
  };

  const getTrends = async () => {
    setIsLoading(true);
    if (dataset.length) {
      try {
        const respond = await CareBearFoods.handleLinearRegressionTrends(
          dataset
        );
        setTrends(respond);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    if (!response) {
      setStep(2);
      return;
    }
    setOpenFilterModal(false);
  };

  const handleRFPredictionsCancel = () => {
    setIsPredictionModalOpen(false);
  };

  const handleRFPredictions = async () => {
    setIsLoading(true);
    try {
      const responseFromRF = await CareBearFoods.linearPredictionResponse({
        dataset,
        market: selectedPredictionType === "Market" ? selectedMarkets : [],
        category: selectedPredictionType === "Category" ? selectedCategory : [],
        commodity:
          selectedPredictionType === "Commodity" ? selectedCommodity : [],
      });

      if (typeof responseFromRF !== "string") {
        setLinearPredictionResponse((prev) => {
          const updatedState = { ...prev };
          if (selectedPredictionType === "Commodity") {
            updatedState.Commodity = responseFromRF;
          } else if (selectedPredictionType === "Category") {
            updatedState.Category = responseFromRF;
          } else if (selectedPredictionType === "Market") {
            updatedState.Market = responseFromRF;
          }

          return updatedState;
        });
      }

      handleRFPredictionsCancel();
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const [actulePredictedForFullSet, setActulePredictedForFullSet] =
    useState(null);
  useEffect(() => {
    if (riskManagement) {
      const actualPricesArray = riskManagement.actual_prices.map(
        (value, index) => ({
          date: riskManagement.dates[index],
          actual_prices: value.toFixed(4),
          predicted_prices:
            riskManagement.predicted_prices[index].toFixed(4) ?? "",
        })
      );

      setActulePredictedForFullSet(actualPricesArray);
    }
  }, [riskManagement]);

  useEffect(() => {
    if (error || openFilterModal || isPredictionModalOpen) {
      ScrollToTopButton();
    }
  }, [error, openFilterModal, isPredictionModalOpen]);

  useEffect(() => {
    if (!isPredictionModalOpen) {
      setSelectedPredictionType("");
    }
  }, [isPredictionModalOpen]);

  useEffect(() => {
    getTrends();
  }, []);

  return (
    <div>
      {error && !openFilterModal ? (
        <div className={style.alertModal}>
          <MessageModal type={"error"} description={error} />
        </div>
      ) : (
        ""
      )}

      {response ? (
        <div>
          <div className={`d-flex`}>
            <CustomButton
              text={"Prediction"}
              onClick={() => setIsPredictionModalOpen(true)}
            />
            <div className="m-2" />
            <CustomButton
              text={"Test Accuracy"}
              onClick={() => setOpenFilterModal(true)}
            />
          </div>

          {linearPredictionResponse &&
            linearPredictionResponse.Category &&
            Object.keys(linearPredictionResponse.Category).length > 0 && (
              <div className={style2.wrpPredictedResultsWthTbWrp}>
                <div className={style2.chartWrp}>
                  <h5 className="text-md">
                    Prediction Price for Categories for Next 6 Months
                  </h5>
                  {Object.keys(linearPredictionResponse.Category).map(
                    (category) => (
                      <div key={category} className={style2.chartArea}>
                        <h6>{category}</h6>
                        <LinearRegressionChart
                          data={linearPredictionResponse.Category[category]}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className={style2.tableWrp}>
                  {Object.keys(linearPredictionResponse.Category).map(
                    (category) => (
                      <div key={category} className={style2.tableArea}>
                        <h6>{category}</h6>
                        <CustomTable
                          Data={{
                            headers: ["date", "predicted_price"],
                            rows: linearPredictionResponse.Category[category],
                          }}
                          isSelectedable={false}
                          rowsPerView={9}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          {linearPredictionResponse &&
            linearPredictionResponse.Commodity &&
            Object.keys(linearPredictionResponse.Commodity).length > 0 && (
              <div className={style2.wrpPredictedResultsWthTbWrp}>
                <div className={style2.chartWrp}>
                  <h5 className="text-md">
                    Prediction Price for Commodities for Next 6 Months
                  </h5>
                  {Object.keys(linearPredictionResponse.Commodity).map(
                    (commodity) => (
                      <div key={commodity} className={style2.chartArea}>
                        <h6>{commodity}</h6>
                        <LinearRegressionChart
                          data={linearPredictionResponse.Commodity[commodity]}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className={style2.tableWrp}>
                  {Object.keys(linearPredictionResponse.Commodity).map(
                    (commodity) => (
                      <div key={commodity} className={style2.tableArea}>
                        <h6>{commodity}</h6>
                        <CustomTable
                          Data={{
                            headers: ["date", "predicted_price"],
                            rows: linearPredictionResponse.Commodity[commodity],
                          }}
                          isSelectedable={false}
                          rowsPerView={9}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          {linearPredictionResponse &&
            linearPredictionResponse?.Market &&
            Object.keys(linearPredictionResponse.Market).length > 0 && (
              <div className={style2.wrpPredictedResultsWthTbWrp}>
                <div className={style2.chartWrp}>
                  <h5>Prediction Price for Markets for Next 6 Months</h5>
                  <LinearRegressionChart
                    data={linearPredictionResponse.Market}
                  />
                </div>
                <div className={style2.tableWrp}>
                  <CustomTable
                    Data={{
                      headers: ["date", "predicted_price"],
                      rows: linearPredictionResponse.Market,
                    }}
                    isSelectedable={false}
                    rowsPerView={9}
                  />
                </div>
              </div>
            )}

          {trends && trends?.length ? (
            <div className={`mt-4 mb-4 ${style2.wd100}`}>
              <h5 className="text-md">Commodity Price Trends Over Time</h5>
              <div className={style2.wrpPredictedResultsWthTbWrp}>
                <div className={style2.chartWrp}>
                  <TrendChart dataset={trends} />
                  <p className="text-sm">
                    This chart illustrates the average price trends of various
                    commodities over time, aggregated on a monthly basis. The
                    data reflects the overall market behavior, allowing you to
                    observe how prices have fluctuated across different periods.
                    Each point on the chart represents the average price for a
                    specific month and year, offering a clear visual
                    representation of the market's movements and helping
                    identify potential trends or anomalies in commodity pricing.
                  </p>
                </div>
                <div className={style2.tableWrp}>
                  <CustomTable
                    Data={{
                      headers: ["year_month", "price"],
                      rows: trends,
                    }}
                    isSelectedable={false}
                    rowsPerView={9}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={`${[style2.wrapGrptbleChr].join(" ")} mt-4 mb-4`}>
            <h5 className={style2.graphTitle}>Risk Management</h5>
            <div className={style2.groupTblChrt}>
              {riskManagement && (
                <div
                  className={`${[style2.wrapGrp, style2.wrapGrp68].join(
                    " "
                  )} mr-4`}
                >
                  <SimpleLineChart data={riskManagement} />{" "}
                </div>
              )}
              {riskManagement && (
                <div className={[style2.wrapGrp, style2.wrapGrp30].join(" ")}>
                  <CustomTable
                    Data={{
                      headers: ["date", "actual_prices", "predicted_prices"],
                      rows: actulePredictedForFullSet,
                    }}
                    isSelectedable={false}
                    rowsPerView={9}
                  />{" "}
                </div>
              )}
            </div>
          </div>

          <div className={`${style2.wrpGrp} mt-4 mb-4`}>
            <div className={[style2.wrapGrp, style2.wrapGrp50].join(" ")}>
              <h5 className={style2.graphTitle}>
                Linear Regression Analysis for {linearYaxis}
              </h5>
              <ComparisonChart
                actuals={response.actuals}
                predictions={response.predictions}
              />
            </div>
            {riskManagement !== null && (
              <div className={[style2.wrapGrp, style2.wrapGrp50].join(" ")}>
                <h5 className={style2.graphTitle}>
                  Linear Regression Analysis for {linearYaxis} (BarCharts)
                </h5>
                <BarChartComponent
                  actuals={response.actuals}
                  predictions={response.predictions}
                  labelX={linearXaxis}
                  labelY={linearYaxis}
                />
              </div>
            )}
          </div>

          <ModelMetrics
            mse={response.mean_squared_error}
            r2={response.r2_score}
            coefficients={response.coefficients}
            intercept={response.intercept}
          />
          <Explanation
            mse={response.mean_squared_error}
            r2={response.r2_score}
            coefficients={response.coefficients}
            intercept={response.intercept}
            linearXaxis={linearXaxis}
            linearYaxis={response.y_column}
          />
        </div>
      ) : isLoading || openFilterModal ? (
        <>
          <ContentLoader viewBox="0 0 600 160">
            <rect x="0" y="0" rx="2" ry="2" width="200" height="18" />
            <rect x="0" y="30" rx="2" ry="2" width="570" height="12" />
            <rect x="0" y="47" rx="2" ry="2" width="420" height="12" />
            <rect x="0" y="64" rx="2" ry="2" width="540" height="12" />
            <rect x="0" y="82" rx="2" ry="2" width="568" height="12" />
            <rect x="0" y="100" rx="2" ry="2" width="570" height="12" />
            <rect x="0" y="118" rx="2" ry="2" width="563" height="12" />
            <rect x="0" y="136" rx="2" ry="2" width="563" height="12" />
          </ContentLoader>
        </>
      ) : (
        <NoData />
      )}

      {openFilterModal ? (
        <CustomModal
          title={MODAL_TITLES.ACCURANCY_PREDICTION_MODAL}
          open={setOpenFilterModal}
          error={{ description: error }}
        >
          <div
            className={[
              style2.wrapFilters,
              style2.advanceFilterApply,
              style2.wrapFilters,
            ].join(" ")}
          >
            <div className={style.dropdownWrp}>
              <CustomDropdown
                data={variables}
                label={"Select Dependent Variable"}
                getSelected={(value) => setLinearYaxis(value)}
              />
            </div>
            <div className={style2.filterWrp}>
              <div className={style2.filterItemSection}>
                <h6 className="mb-0">Select Independent Variables</h6>
                <div className={style2.headersWrp}>
                  {numarics.map((header, key) => (
                    <button
                      className={
                        linearXaxis.includes(header)
                          ? [style2.headerItem, style2.headerItemActive].join(
                              " "
                            )
                          : style2.headerItem
                      }
                      onClick={() =>
                        setLinearXaxis((prv) =>
                          prv.includes(header)
                            ? prv.filter((item) => item !== header)
                            : [...prv, header]
                        )
                      }
                      key={key}
                    >
                      <p>{header}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={style2.footerFilter}>
              <CustomButton
                buttonClass={"CANCEL"}
                text={"Cancel"}
                onClick={handleCancel}
                // loading={isLoading}
              />
              <CustomButton
                buttonClass={"SUBMIT"}
                text={"Apply"}
                onClick={handleLinearRegression}
                loading={isLoading}
              />
            </div>
          </div>
        </CustomModal>
      ) : (
        ""
      )}

      {isPredictionModalOpen ? (
        <CustomModal title={"Prediction"} open={setIsPredictionModalOpen}>
          <div
            className={[
              style2.wrapFilters,
              style2.advanceFilterApply,
              style2.wrapFilters,
              style2.selectionalModal,
            ].join(" ")}
          >
            <div className={style2.filterWrp}>
              <div className={style2.filterItemSection}>
                <div className={style2.predictionHeaderWrp}>
                  <h5>Price Predictions</h5>
                  <div className={style2.predictionItemsWrp}>
                    {predictableOptions.map((header, index) => (
                      <button
                        className={
                          header === selectedPredictionType
                            ? [
                                style2.selectionItem,
                                style2.selectionItemAct,
                              ].join(" ")
                            : style2.selectionItem
                        }
                        onClick={() => setSelectedPredictionType(header)}
                        key={index}
                      >
                        <p>{header}</p>
                        <CheckedIcon
                          size={15}
                          color={
                            header === selectedPredictionType
                              ? "#496bf3"
                              : "#3e4654"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {selectedPredictionType ? (
                  <h6 className="mb-2 mt-0 text-sm">
                    Filter out the unwanted variables
                  </h6>
                ) : (
                  ""
                )}

                <div className={style2.headersWrp}>
                  {selectedPredictionType === "Market" &&
                  selectedMarkets.length ? (
                    <div className={style2.filterItemSection}>
                      <h6 className="mb-2 mt-2">Market</h6>
                      <div className={style2.headersWrp}>
                        {selectedMarkets.map((header, index) => (
                          <button
                            className={style2.headerItem}
                            onClick={() =>
                              setSelectedMarkets((pre) =>
                                pre.filter((item) => item !== header)
                              )
                            }
                            key={index}
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

                  {selectedPredictionType === "Category" &&
                  selectedCategory.length ? (
                    <div className={style2.filterItemSection}>
                      <h6 className="mb-0">Category</h6>
                      <div className={style2.headersWrp}>
                        {selectedCategory.map((header, index) => (
                          <button
                            className={style2.headerItem}
                            onClick={() =>
                              setSelectedCategory((pre) =>
                                pre.filter((item) => item !== header)
                              )
                            }
                            key={index}
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

                  {selectedPredictionType === "Commodity" &&
                  selectedCommodity.length ? (
                    <div className={style2.filterItemSection}>
                      <h6 className="mb-0">Commodity</h6>
                      <div className={style2.headersWrp}>
                        {selectedCommodity.map((header, index) => (
                          <button
                            className={style2.headerItem}
                            onClick={() =>
                              setSelectedCommodity((pre) =>
                                pre.filter((item) => item !== header)
                              )
                            }
                            key={index}
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
                </div>
              </div>
            </div>
            <div className={style2.footerFilter}>
              <CustomButton
                buttonClass={"CANCEL"}
                text={"Cancel"}
                onClick={handleRFPredictionsCancel}
                loading={isLoading}
              />
              <CustomButton
                buttonClass={"SUBMIT"}
                text={"Apply"}
                onClick={handleRFPredictions}
                loading={isLoading}
              />
            </div>
          </div>
        </CustomModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default LinearRegression;
