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
import ForecastChart from "./ForecastChart";
import MessageModal from "../../custom/message/MessageModal";

const selectedables = ["market", "category", "commodity"];

const PredictionDescription = () => (
  <div className={style.predictionDescription}>
    <p className="text-sm">
      This tool predicts prices for each commodity over the{" "}
      <i>
        <u>
          <b>next 12 months</b>
        </u>
      </i>
      . It analyzes the dataset within the selected date range, considering the
      chosen markets, categories, and commodities.
    </p>
  </div>
);

const SVM = ({ dataset, headers, variables, setStep }) => {
  const [response, setResponse] = useState(null);
  const [responseForPredict, setResponseForPredict] = useState(null);
  const [responseForHighLow, setResponseForHighLow] = useState(null);
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

  const [selectStartDate, setStartDate] = useState();
  const [selectEndsDate, setEndDate] = useState();

  const [forecastData, setForecastData] = useState({});

  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      return minDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    }
  };

  const getMaxDate = () => {
    if (dataset.length) {
      const dates = dataset.map((row) => new Date(row.date));
      const maxDate = new Date(Math.max(...dates)); // Fixed to use Math.max instead of Math.min
      return maxDate.toISOString().split("T")[0]; // Convert to ISO string without timezone
    }
  };

  // useEffect(() => {
  //   if (dataset && dataset.length) {
  //     getMinMaxDates(dataset);
  //   }
  // }, [dataset]);

  const handleSVM = async () => {
    setIsLoading(true);
    try {
      const responfFromRF = await CareBearFoods.handleSVMEvaluate(dataset);
      setResponse(responfFromRF);
      setError("");
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSVMHighLow = async () => {
    setIsLoading(true);
    try {
      const responseFromRF = await CareBearFoods.getSVMHighLow({
        dataset,
        start_date: getMinDate(),
        end_date: getMaxDate(),
      });

      setResponseForHighLow(responseFromRF);
      const forecastData = responseFromRF.forecasts;
      // console.log("FORECAST DAT: ", forecastData);

      // const formattedForecasts = {};
      // for (const [commodity, forecastList] of Object.entries(forecastData)) {
      //   formattedForecasts[commodity] = forecastList.map((entry) => ({
      //     date: formatDate(entry.date),
      //     price: entry.forecasted_prices,
      //   }));
      // }

      // console.log("formattedForecasts 11111: ", formattedForecasts);

      setForecastData(forecastData);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSVMPredictions = async () => {
    setIsLoading(true);
    try {
      const responfFromRF = await CareBearFoods.getSVMPredictions({
        dataset,
        market: selectedMarkets,
        category: selectedCategory,
        commodity: selectedCommodity,
        startDate: selectedDateRange.startDate,
        endDate: selectedDateRange.endDate,
      });
      setResponseForPredict(responfFromRF);
      const forecastData = responfFromRF.forecasts;
      const formattedForecasts = {};
      for (const [commodity, forecastList] of Object.entries(forecastData)) {
        formattedForecasts[commodity] = forecastList.map((entry) => ({
          date: formatDate(entry.date),
          price: entry.forecasted_price,
        }));
      }

      setForecasts(formattedForecasts);
      setIsPredictionModalOpen(false);
      setIsLoading(false);
      setError("");
    } catch (e) {
      setError(e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataset && dataset.length) {
      console.log("dataset length: ", dataset.length);

      handleSVM();
      handleSVMHighLow();
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

  const handlePredictionClick = () => {
    ScrollToTopButton();
    setIsPredictionModalOpen(true);
  };

  const plotImages = [
    "Confusion Matrix Heatmap.png",
    "Cross-Validation Score Distribution.png",
    "Feature Distribution.png",
    "Feature Importance.png",
    "Grid Search Results.png",
    "Outliers Visualization.png",
    "Pairplot of Top Correlated Features.png",
  ];

  return (
    <div>
      {response ? (
        <div>
          {forecastData ? <ForecastChart forecasts={forecastData} /> : ""}
          <h2 className="text-md mt-3">Predictions - Forecast Prices</h2>
          <PredictionDescription />
          <CustomButton text={"Prediction"} onClick={handlePredictionClick} />

          {responseForPredict ? (
            <div className={style.selectedFilters}>
              <h4 className="text-md mt-3">Predictions Results</h4>
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
          {response ? (
            <SVMExplanation
              accuracy={response.accuracy}
              classificationReport={response.classification_report}
              confusionMatrix={response.confusion_matrix}
              cvScores={response.cv_scores}
              gridSearchResults={response.grid_search_results}
              meanAbsoluteError={response.mean_absolute_error}
              meanSquaredError={response.mean_squared_error}
              r2Score={response.r2_score}
              rocCurve={{
                fpr: response.roc_curve.fpr,
                tpr: response.roc_curve.tpr,
                roc_auc: response.roc_curve.roc_auc,
              }}
            />
          ) : (
            ""
          )}
          <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />
          <div className={style.plotGallery}>
            <strong><h3>Graphs and Charts</h3></strong>
            <div className={style.plotImagesContainer}>
              {plotImages.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt={`Plot ${index}`}
                  className={style.plotImage}
                />
              ))}
            </div>
          </div>
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
                onClick={handleSVMPredictions}
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

export default SVM;
