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

const numarics = ["price", "usdprice", "USD RATE"];
const LinearRegression = ({ dataset, variables, headers, setStep }) => {
  const [linearXaxis, setLinearXaxis] = useState([]);
  const [linearYaxis, setLinearYaxis] = useState(variables ? variables[0] : []);
  const [openFilterModal, setOpenFilterModal] = useState(true);
  const [response, setResponse] = useState(null);
  const [linearPredictionResponse, setLinearPredictionResponse] =
    useState(null);
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

  const handleLinearRegression = async () => {
    if (!linearXaxis.length || !linearYaxis) {
      if (!linearXaxis.length && linearYaxis) {
        setError("Must select Independent Variable");
      } else if (linearXaxis.length && !linearYaxis) {
        setError("Must select at least 1 Depending.");
      }
      return;
    }
    setIsLoading(true);
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
      const responfFromRF = await CareBearFoods.linearPredictionResponse({
        dataset,
        market: selectedMarkets,
        category: selectedCategory,
        commodity: selectedCommodity,
      });
      setLinearPredictionResponse(responfFromRF);
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

  return (
    <div>
      {error ? (
        <div className={style.alertModal}>
          <MessageModal type={"error"} description={error} />
        </div>
      ) : (
        ""
      )}

      {response ? (
        <div>
          <CustomButton
            text={"Prediction"}
            onClick={() => setIsPredictionModalOpen(true)}
          />

          <div className={`${[style2.wrapGrptbleChr].join(" ")} mt-4 mb-4`}>
            <h5 className={style2.graphTitle}>Risk Management</h5>
            <div className={style2.groupTblChrt}>
              {riskManagement && (
                <div
                  className={`${[style2.wrapGrp, style2.wrapGrp68].join(
                    " "
                  )} mr-4`}
                >
                  <RiskManagementChart data={riskManagement} />{" "}
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
              <RegressionChart
                actuals={response.actuals}
                predictions={response.predictions}
              />
            </div>
            {riskManagement !== null && (
              <div className={[style2.wrapGrp, style2.wrapGrp50].join(" ")}>
                <h5 className={style2.graphTitle}>
                  Linear Regression Analysis for {linearYaxis} (BarCharts)
                </h5>
                <RegressionBarChart
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
          title={"Filter"}
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
                <h6 className="mb-2 mt-0 text-sm">
                  Filter out the unwanted variables
                </h6>
                <div className={style2.headersWrp}>
                  {selectedMarkets.length ? (
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

                  {selectedCategory.length ? (
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

                  {selectedCommodity.length ? (
                    <div className={style2.filterItemSection}>
                      <h6 className="mb-0">Commodity</h6>
                      <div className={style2.headersWrp}>
                        {selectedCommodity.map((header) => (
                          <button
                            className={style2.headerItem}
                            onClick={() =>
                              setSelectedCommodity((pre) =>
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
