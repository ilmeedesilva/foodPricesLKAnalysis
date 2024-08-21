import React, { useEffect, useState } from "react";
import CareBearFoods from "../../api/services/CareBearFoods";
import ContentLoader from "react-content-loader";
import style from "./MlModals.module.scss";
import NoData from "../../components/NoData/NoData";
import CustomButton from "../../custom/CustomButton";
import CustomModal from "../../custom/modal/CustomModal";
import CloseIcon from "../../img/svg/Close.icon";
import SVMExplanation from "./SVMExplanation";
import CustomTable from "../../custom/table/CustomTable";
import MessageModal from "../../custom/message/MessageModal";

const KMean = ({ dataset, headers, variables, setStep }) => {
  const [kMeanEvaluateResponse, setKmeanEvaluateResponse] = useState(null);
  const [responseForKMVisulization, setResponseForKMVisulization] =
    useState(null);
  const [kmeanForeCasting, setKmeanForeCasting] = useState(null);
  const [selectedMarkets, setSelectedMarkets] = useState(headers.markets ?? []);
  const [selectedCategory, setSelectedCategory] = useState(
    headers.category ?? []
  );
  const [selectedCommodity, setSelectedCommodity] = useState(
    headers.commodity ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [forecasts, setForecasts] = useState({});

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  const getMinDate = () => {
    if (dataset.length) {
      const dates = dataset.map((row) => new Date(row.date));
      const minDate = new Date(Math.min(...dates));
      return minDate.toISOString().split("T")[0];
    }
  };

  const getMaxDate = () => {
    if (dataset.length) {
      const dates = dataset.map((row) => new Date(row.date));
      const maxDate = new Date(Math.max(...dates));
      return maxDate.toISOString().split("T")[0];
    }
  };

  const handleClusteringEvaluate = async () => {
    setIsLoading(true);
    try {
      const responFromKM = await CareBearFoods.handleKmeanEvaluate({ dataset });
      setKmeanEvaluateResponse(responFromKM);
      setError("");
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKmeanForeCasting = async () => {
    setIsLoading(true);
    try {
      const responFromKm = await CareBearFoods.handleKmeanForecast({ dataset });
      setKmeanForeCasting(responFromKm);
      setError("");
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKmeanVisulatization = async () => {
    setIsLoading(true);
    try {
      const responfFromRF = await CareBearFoods.handleKmeanVisualize(dataset);
      setResponseForKMVisulization(responfFromRF);
      const forecastData = responfFromRF.forecasts;
      const formattedForecasts = {};
      for (const [commodity, forecastList] of Object.entries(forecastData)) {
        formattedForecasts[commodity] = forecastList.map((entry) => ({
          date: formatDate(entry.date),
          price: entry.forecasted_price,
        }));
      }

      setForecasts(formattedForecasts);
      setIsLoading(false);
      setError("");
    } catch (e) {
      setError(e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKmeaninsights = async () => {
    setIsLoading(true);
    try {
        const responFromKm = await CareBearFoods.handleKmeaninsights({ dataset });
        setKmeanForeCasting(responFromKm);
        setError("");
    } catch (e) {
        setError(e);
    } finally {
        setIsLoading(false);
    }
};


  useEffect(() => {
    if (dataset && dataset.length) {
      handleClusteringEvaluate();
      handleKmeanForeCasting();
      handleKmeanVisulatization();
      handleKmeaninsights();
    }
  }, [dataset]);

  const handleCancel = () => {
    setSelectedMarkets(headers.markets ?? []);
    setSelectedCategory(headers.category ?? []);
    setSelectedCommodity(headers.commodity ?? []);
    setIsPredictionModalOpen(false);
  };

  const renderForecastTable = (forecasts) => {
    const commodities = Object.keys(forecasts);

    const chunkedCommodities = [];
    for (let i = 0; i < commodities.length; i += 3) {
      chunkedCommodities.push(commodities.slice(i, i + 3));
    }

    return (
      <div className={style.forecastTable}>
        {error ? (
          <div className={style.alertModal}>
            <MessageModal type={"error"} description={error} />
          </div>
        ) : (
          ""
        )}

        {chunkedCommodities.map((commodityChunk, chunkIndex) => (
          <div key={chunkIndex} className={style.row}>
            {commodityChunk.map((commodity) => (
              <div key={commodity} className={style.commoditySection}>
                <h3 className="text-sm">{commodity}</h3>
                <CustomTable
                  Data={{
                    headers: ["date", "price"],
                    rows: forecasts[commodity],
                  }}
                />

                {/* <table className={style.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th style={{ paddingLeft: "20px" }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecasts[commodity].map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.date}</td>
                        <td style={{ paddingLeft: "20px" }}>
                          {entry.price !== undefined && entry.price !== null
                            ? entry.price.toFixed(2)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {kMeanEvaluateResponse ? (
        <div>
          <CustomButton
            text={"Prediction"}
            onClick={() => setIsPredictionModalOpen(true)}
          />

          {responseForKMVisulization ? (
            <div className={style.selectedFilters}>
              <h3 className="text-md mt-3">Predictions Results</h3>
              <div className={style.predictedItemSummery}>
                <strong>Selected Markets:</strong>{" "}
                <div className={style.predictedItemWrp}>
                  {selectedMarkets.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
              <p>
                <div className={style.predictedItemSummery}>
                  <strong>Selected Categories:</strong>{" "}
                  <div
                    className={[
                      style.predictedItemWrp,
                      style.predictedItemWrpScn,
                    ].join(" ")}
                  >
                    {selectedCategory.map((item) => (
                      <p>{item}</p>
                    ))}
                  </div>
                </div>
              </p>
              <p>
                <div className={style.predictedItemSummery}>
                  <strong>Selected Commodities:</strong>{" "}
                  <div
                    className={[
                      style.predictedItemWrp,
                      style.predictedItemWrpThr,
                    ].join(" ")}
                  >
                    {selectedCommodity.map((item) => (
                      <p>{item}</p>
                    ))}
                  </div>
                </div>
              </p>
            </div>
          ) : (
            ""
          )}

          {
            Object.keys(forecasts).length > 0 && renderForecastTable(forecasts)

            /* <RegressionChart
            actuals={response.actuals}
            predictions={response.predictions}
          />
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
          /> */
          }
          {/* {kMeanEvaluateResponse ? (
            <SVMExplanation
              accuracy={kMeanEvaluateResponse.accuracy}
              classificationReport={kMeanEvaluateResponse.classification_report}
              confusionMatrix={kMeanEvaluateResponse.confusion_matrix}
              cvScores={kMeanEvaluateResponse.cv_scores}
              gridSearchResults={kMeanEvaluateResponse.grid_search_results}
              meanAbsoluteError={kMeanEvaluateResponse.mean_absolute_error}
              meanSquaredError={kMeanEvaluateResponse.mean_squared_error}
              r2Score={kMeanEvaluateResponse.r2_score}
              rocCurve={{
                fpr: kMeanEvaluateResponse.roc_curve.fpr,
                tpr: kMeanEvaluateResponse.roc_curve.tpr,
                roc_auc: kMeanEvaluateResponse.roc_curve.roc_auc,
              }}
            />
          ) : (
            ""
          )} */}
        </div>
      ) : isLoading ? (
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
      {isPredictionModalOpen ? (
        <CustomModal title={"Prediction"} open={setIsPredictionModalOpen}>
          <div
            className={[
              style.wrapFilters,
              style.advanceFilterApply,
              style.wrapFilters,
              style.selectionalModal,
            ].join(" ")}
          >
            <div className={style.filterWrp}>
              <div className={style.filterItemSection}>
                <h6 className="mb-2 mt-0 text-sm">
                  Filter out the unwanted variables
                </h6>
                <div className={style.headersWrp}>
                  {selectedMarkets.length ? (
                    <div className={style.filterItemSection}>
                      <h6 className="mb-2 mt-2">Market</h6>
                      <div className={style.headersWrp}>
                        {selectedMarkets.map((header, index) => (
                          <button
                            className={style.headerItem}
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
                    <div className={style.filterItemSection}>
                      <h6 className="mb-0">Category</h6>
                      <div className={style.headersWrp}>
                        {selectedCategory.map((header, index) => (
                          <button
                            className={style.headerItem}
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
                    <div className={style.filterItemSection}>
                      <h6 className="mb-0">Commodity</h6>
                      <div className={style.headersWrp}>
                        {selectedCommodity.map((header) => (
                          <button
                            className={style.headerItem}
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
            <div className={style.footerFilter}>
              <CustomButton
                buttonClass={"CANCEL"}
                text={"Cancel"}
                onClick={handleCancel}
                loading={isLoading}
              />
              <CustomButton
                buttonClass={"SUBMIT"}
                text={"Apply"}
                onClick={() => {}}
                loading={isLoading}
              />
            </div>
          </div>
        </CustomModal>
      ) : (
        ""
      )}{" "}
    </div>
  );
};

export default KMean;
