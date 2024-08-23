import React, { useEffect, useState } from "react";
import CareBearFoods from "../../api/services/CareBearFoods";
import ContentLoader from "react-content-loader";
import style from "./MlModals.module.scss";
import NoData from "../../components/NoData/NoData";
import CustomButton from "../../custom/CustomButton";
import CustomModal from "../../custom/modal/CustomModal";
import CloseIcon from "../../img/svg/Close.icon";
import RFExplanation from "./RFExplanation";
import CustomTable from "../../custom/table/CustomTable";
import MessageModal from "../../custom/message/MessageModal";
import ActualVsPredictedScatterPlot from "./RFActualVsPredictedScatterPlot";
import ResidualsVsPredictedScatterPlot from "./RFResidualsVsPredictedScatterPlot";
import ResidualsDistributionHistogram from "./RFResidualsDistributionHistogram";
import CrossValidationScoreDistributionBoxPlot from "./RFCrossValidationScoreDistributionBoxPlot";

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

const RandomForest = ({ dataset, headers, variables, setStep }) => {
  const [response, setResponse] = useState(null);
  const [responseForPredict, setResponseForPredict] = useState(null);
  const [responseFromRFPlots, setResponseFromRFPlots] = useState(null);
  const [selectedMarkets, setSelectedMarkets] = useState(headers.markets ?? []);
  const [selectedCategory, setSelectedCategory] = useState(
    headers.category ?? []
  );
  const [selectedCommodity, setSelectedCommodity] = useState(
    headers.commoditiy ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [forecasts, setForecasts] = useState({});
  const [plotData, setPlotData] = useState({});

  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const plotImages = ["outliers_plot.png", "top_feature_importances.png"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  const handleRandomForest = async () => {
    setIsLoading(true);
    try {
      const responseFromRF = await CareBearFoods.handleRFEvaluate(dataset);
      setResponse(responseFromRF);
      setError("");
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRFPlots = async () => {
    setIsLoading(true);
    try {
      const responsePlots = await CareBearFoods.getRFVisualizations();
      console.log("Fetched plot data:", responsePlots);
      setPlotData(responsePlots); // Store plot data in state
      setError("");
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRFPredictions = async () => {
    setIsLoading(true);
    try {
      const responseFromRF = await CareBearFoods.getRFPredictions({
        dataset,
        market: selectedMarkets,
        category: selectedCategory,
        commodity: selectedCommodity,
        startDate: selectedDateRange.startDate,
        endDate: selectedDateRange.endDate,
      });
      setResponseForPredict(responseFromRF);
      const forecastData = responseFromRF.forecasts;
      const formattedForecasts = {};
      for (const [commodity, forecastList] of Object.entries(forecastData)) {
        formattedForecasts[commodity] = forecastList.map((entry) => ({
          date: formatDate(entry.date),
          price: entry.price,
        }));
      }
      setForecasts(formattedForecasts);
      setIsPredictionModalOpen(false);
      setIsLoading(false);
      setError("");
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataset && dataset.length) {
      handleRandomForest();
      // handleRFPlots();
    }
  }, [dataset]);

  const handleCancel = () => {
    setSelectedMarkets(headers.markets ?? []);
    setSelectedCategory(headers.category ?? []);
    setSelectedCommodity(headers.commoditiy ?? []);
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
          <RFExplanation
            accuracy={response.accuracy}
            classificationReport={response.classification_report}
            confusionMatrix={response.confusion_matrix}
            cvScores={response.cv_scores}
            gridSearchResults={response.grid_search_results}
            meanAbsoluteError={response.mean_absolute_error}
            meanSquaredError={response.mean_squared_error}
            r2Score={response.r2_score}
          />

          <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />

          <strong>
            <h2 className="text-md">Graphs and Charts</h2>
          </strong>

          <strong>
            <h3>Actual Prices Vs Predicted Prices</h3>
          </strong>
          {response.y_test && response.y_pred && (
            <div className={style.mainChart}>
              <ActualVsPredictedScatterPlot
                yTest={response.y_test}
                yPred={response.y_pred}
              />
            </div>
          )}
          <p className="text-sm">
            This scatter plot compares the actual prices observed in the dataset
            to the prices predicted by the model. Each point on the graph
            represents a specific data point, with the actual price on one axis
            and the predicted price on the other. Ideally, the points should
            align closely along a diagonal line, indicating that the model's
            predictions are accurate.
          </p>
          <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />
          <strong>
            <h3>Residuals Vs Predicted Prices</h3>
          </strong>
          {response.y_test && response.y_pred && (
            <div className={style.mainChart}>
              <ResidualsVsPredictedScatterPlot
                yTest={response.y_test}
                yPred={response.y_pred}
              />{" "}
            </div>
          )}
          <p className="text-sm">
            This scatter plot displays the residuals (the differences between
            the actual and predicted prices) against the predicted prices. This
            plot helps in assessing whether the model’s predictions are unbiased
            across different price levels. A good model should have residuals
            randomly scattered around the horizontal axis (zero residual line),
            without any clear pattern.
          </p>
          <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />
          <strong>
            <h3>Residuals Distribution</h3>
          </strong>
          {response.y_test && response.y_pred && (
            <div className={style.mainChart}>
              <ResidualsDistributionHistogram
                yTest={response.y_test}
                yPred={response.y_pred}
              />
            </div>
          )}
          <p className="text-sm">
            This histogram visualizes the distribution of residuals (errors) in
            the model’s predictions. It shows how often residuals of different
            sizes occur, giving insight into the accuracy of the model. A
            well-performing model will have residuals centered around zero and
            symmetrically distributed, indicating that predictions are neither
            systematically too high nor too low.
          </p>
          <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />
          <strong>
            <h3>Cross-Validation Score Distribution</h3>
          </strong>

          {response ? (
            <CrossValidationScoreDistributionBoxPlot
              cvScores={response.cv_scores}
            />
          ) : (
            ""
          )}
          <p className="text-sm">
            This box plot illustrates the distribution of model performance
            scores (such as accuracy or R-squared) across multiple
            cross-validation folds. The box represents the interquartile range
            (IQR) of the scores, with the median score marked inside the box.
            The whiskers indicate the range of the scores, and any points
            outside this range represent outliers. This plot helps in
            understanding the variability and stability of the model’s
            performance.
          </p>
          <hr style={{ border: "1px solid #bdc3c7", margin: "20px 0" }} />
          <div className={style.plotGallery}>
            <strong>
              <h3>Other Visualizations</h3>
            </strong>
            <div className={style.plotImagesContainer}>
              {plotImages.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt={`Plot ${index}`}
                  className={style.plotImage}
                />
              ))}
              <p className="text-sm">
                <strong>Outliers Visualization:</strong> This plot identifies
                and highlights data points that are considered outliers in the
                dataset—points that deviate significantly from the rest of the
                data. Outliers can have a large impact on the model's
                performance and may need special attention. This visualization
                helps in understanding which points could be influencing the
                model’s predictions in unexpected ways.
              </p>
              <p className="text-sm">
                <strong> Top Feature Importances:</strong> This bar chart ranks
                the features used in the model according to their importance in
                making predictions. The importance is often determined by how
                much each feature contributes to reducing uncertainty in the
                model. Features with higher importance scores have a greater
                influence on the model’s predictions. This visualization helps
                users understand which variables are driving the predictions and
                can provide insights into the underlying data relationships.
              </p>
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
                onClick={handleRFPredictions}
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

export default RandomForest;
