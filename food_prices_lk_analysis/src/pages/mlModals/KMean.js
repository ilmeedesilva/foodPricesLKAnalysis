import React, { useEffect, useState } from "react";
import CareBearFoods from "../../api/services/CareBearFoods";
import ContentLoader from "react-content-loader";
import style from "./MlModals.module.scss";
import NoData from "../../components/NoData/NoData";
import CustomButton from "../../custom/CustomButton";
import CustomModal from "../../custom/modal/CustomModal";
import ForecastedClusters from "./KMeansForecastedClusters";
import ClusterEvaluation from "./KMeansClusterEvaluation";
import MarketCommodityInsights from "./KMeansMarketCommodityInsights";
import MessageModal from "../../custom/message/MessageModal";
import CustomTable from "../../custom/table/CustomTable";
import ClusterScatterPlot from "./ClusterScatterPlot";
import ClusterBarChart from "../../custom/charts/ClusterBarChart/ClusterBarChart";
import ClusterScatterPlotting from "../../custom/charts/ClusterScatterPlots/ClustersScatterPlotting";

const KMean = ({ dataset, headers, variables, setStep }) => {
  const [kMeanEvaluateResponse, setKmeanEvaluateResponse] = useState(null);
  const [responseForKMVisulization, setResponseForKMVisulization] =
    useState(null);
  const [kmeanForeCasting, setKmeanForeCasting] = useState(null);
  const [kmeanInsights, setKmeanInsights] = useState(null);
  const [selectedMarkets, setSelectedMarkets] = useState(headers.markets ?? []);
  const [selectedCategory, setSelectedCategory] = useState(
    headers.category ?? []
  );
  const [selectedCommodity, setSelectedCommodity] = useState(
    headers.commodity ?? []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [forecasts, setForecasts] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [marketBaseOnPrice, setMarketBaseOnPrice] = useState();
  const [clusterMarket, setClusterMarket] = useState();

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
    return "";
  };

  const getMaxDate = () => {
    if (dataset.length) {
      const dates = dataset.map((row) => new Date(row.date));
      const maxDate = new Date(Math.max(...dates));
      return maxDate.toISOString().split("T")[0];
    }
    return "";
  };

  const handleMarketBaseOnPrice = async () => {
    setIsLoading(true);
    try {
      const response = await CareBearFoods.handleKMMarketBaseOnPrice({
        dataset,
      });
      setMarketBaseOnPrice(response);
      setError("");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
      handleClusterMarket();
    }
  };

  const handleClusterMarket = async () => {
    setIsLoading(true);
    try {
      const response = await CareBearFoods.handleKMClusterMarket({
        dataset,
      });
      setClusterMarket(response);
      setError("");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClusteringEvaluate = async () => {
    setIsLoading(true);
    try {
      const response = await CareBearFoods.handleKmeanEvaluate({ dataset });
      setKmeanEvaluateResponse(response);
      setError("");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKmeanForeCasting = async () => {
    setIsLoading(true);
    try {
      const response = await CareBearFoods.handleKmeanForecast({ dataset });
      setKmeanForeCasting(response);
      setError("");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKmeanVisulatization = async () => {
    setIsLoading(true);
    try {
      const response = await CareBearFoods.handleKmeanVisualize(dataset);
      setResponseForKMVisulization(response);

      const forecastData = response.forecasts || {};
      const formattedForecasts = {};
      for (const [commodity, forecastList] of Object.entries(forecastData)) {
        formattedForecasts[commodity] = forecastList.map((entry) => ({
          date: formatDate(entry.date),
          price: entry.forecasted_price,
        }));
      }

      setForecasts(formattedForecasts);
      setError("");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKmeanInsights = async () => {
    setIsLoading(true);
    try {
      const response = await CareBearFoods.handleKmeaninsights({ dataset });
      setKmeanInsights(response);

      setError("");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataset && dataset.length) {
      handleClusteringEvaluate();
      handleKmeanForeCasting();
      handleKmeanVisulatization();
      handleKmeanInsights();
    }
  }, [dataset]);

  const handleCancel = () => {
    setSelectedMarkets(headers.markets ?? []);
    setSelectedCategory(headers.category ?? []);
    setSelectedCommodity(headers.commodity ?? []);
    setIsPredictionModalOpen(false);
  };

  useEffect(() => {
    handleMarketBaseOnPrice();
  }, [dataset]);

  const renderForecastTable = (forecasts) => {
    const commodities = Object.keys(forecasts);

    const chunkedCommodities = [];
    for (let i = 0; i < commodities.length; i += 3) {
      chunkedCommodities.push(commodities.slice(i, i + 3));
    }

    return (
      <div className={style.forecastTable}>
        {error && (
          <div className={style.alertModal}>
            <MessageModal type={"error"} description={error} />
          </div>
        )}

        {chunkedCommodities.map((commodityChunk, chunkIndex) => (
          <div key={chunkIndex} className={style.row}>
            {commodityChunk.map((commodity) => (
              <div key={commodity} className={style.commoditySection}>
                <h3 className="text-sm">{commodity}</h3>
                <CustomTable
                  Data={{
                    headers: ["date", "price"],
                    rows: forecasts[commodity] || [],
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // console.log("Kmean Insights:", kmeanInsights);

  const renderClusterTable = (clusters) => {
    // Create an array of cluster data entries
    const clusterEntries = Object.entries(clusters);

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {clusterEntries.slice(0, 3).map(([clusterId, points], index) => (
          <div key={clusterId} style={{ flex: "1", marginRight: "10px" }}>
            <h4>Cluster {clusterId}</h4>
            <CustomTable
              Data={{
                headers: ["Point Index"],
                rows: points.map((point, idx) => ({
                  "Point Index": point,
                })),
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderScatterPlotData = (scatterPlotData) => {
    const scatterEntries = Object.entries(scatterPlotData);

    return scatterEntries.map(([key, value]) => (
      <div key={key} className={style.scatterPlotSection}>
        <h4>Scatter Plot {key}</h4>
        <div>
          <strong>X Values:</strong>
          <ul>
            {value.x.map((xVal, index) => (
              <li key={index}>{xVal}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Y Values:</strong>
          <ul>
            {value.y.map((yVal, index) => (
              <li key={index}>{yVal}</li>
            ))}
          </ul>
        </div>
      </div>
    ));
  };

  const renderCombinedTable = (clusters, scatterPlotData) => {
    const clusterEntries = Object.entries(clusters);
    const scatterEntries = Object.entries(scatterPlotData);

    // Group tables into rows of 3
    const rows = [];
    for (let i = 0; i < clusterEntries.length; i += 3) {
      rows.push(clusterEntries.slice(i, i + 3));
    }

    return (
      <div>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {row.map(([clusterId, points], index) => {
              const scatterData = scatterEntries.find(
                (_, idx) => idx === index + rowIndex * 3
              )?.[1];

              const tableData = {
                headers: ["Point Index", "Commodity", "Median Price"],
                rows: points.map((point, idx) => ({
                  "Point Index": point,
                  Commodity: scatterData?.x[idx] || "N/A",
                  "Median Price": scatterData?.y[idx] || "N/A",
                })),
              };
              return (
                <div key={clusterId} style={{ flex: "1", marginRight: "10px" }}>
                  <h4>Cluster {clusterId}</h4>
                  <CustomTable Data={tableData} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {kMeanEvaluateResponse && (
        <div>
          {/* <CustomButton
            text={"Prediction"}
            onClick={() => setIsPredictionModalOpen(true)}
          /> */}

          {marketBaseOnPrice ? (
            <div className={style.wrpPredictedResultsWthTbWrp}>
              <div className={style.centerChartWrp}>
                <h5 className="text-md mt-3">
                  Market Distribution by Price Cluster
                </h5>
                <ClusterBarChart clusters={marketBaseOnPrice.clusters} />
                <p className="text-sm">
                  This bar chart represents the distribution of markets across
                  different price clusters. Each bar corresponds to a price
                  cluster, and the length of the bar indicates the number of
                  markets in that cluster. Hover over the bars to see the
                  markets included in each cluster.
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* {!isLoading &&
          clusterMarket &&
          clusterMarket.clusters?.length &&
          clusterMarket.centroids?.length ? (
            <ClusterScatterPlot
              clusters={clusterMarket.clusters}
              centroids={clusterMarket.centroids}
            />
          ) : null} */}

          {/* {responseForKMVisulization && (
            <div className={style.selectedFilters}>
              <h3 className="text-md mt-3">Predictions Results</h3>
              <div className={style.predictedItemSummery}>
                <strong>Selected Markets:</strong>
                <div className={style.predictedItemWrp}>
                  {selectedMarkets.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
              <div className={style.predictedItemSummery}>
                <strong>Selected Categories:</strong>
                <div
                  className={[
                    style.predictedItemWrp,
                    style.predictedItemWrpScn,
                  ].join(" ")}
                >
                  {selectedCategory.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
              <div className={style.predictedItemSummery}>
                <strong>Selected Commodities:</strong>
                <div
                  className={[
                    style.predictedItemWrp,
                    style.predictedItemWrpScn,
                  ].join(" ")}
                >
                  {selectedCommodity.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
              {renderForecastTable(forecasts)}
            </div>
          )} */}
        </div>
      )}

      <div>
        {isLoading && <ContentLoader />}
        {error && <MessageModal message={error} onClose={() => setError("")} />}
        {kMeanEvaluateResponse ? (
          <div className={style.container}>
            {kmeanForeCasting && (
              <ForecastedClusters
                clusters={kmeanForeCasting.clusters || []}
                interpretation={kmeanForeCasting.interpretation || {}}
              />
            )}
            <h3>Market and Commodity Insights</h3>
            {/* {console.log("BEFORE KMEAN INSIGHTS", kmeanInsights)} */}
            <div className={style.clusterCards}>
              {kmeanInsights &&
                Object.values(kmeanInsights).length > 0 &&
                Object.values(kmeanInsights).map((insight, index) => (
                  <div key={index} className={style.clusterCardItem}>
                    <h5>Cluster {index}</h5>
                    <MarketCommodityInsights
                      markets={insight.markets || []}
                      commodities={insight.commodities || []}
                      mean={insight.mean_price || 0}
                      median={insight.median_price || 0}
                      priceStats={insight.price_range || [0, 0]}
                    />
                  </div>
                ))}
            </div>
            {/* {kMeanEvaluateResponse && (
              <ClusterEvaluation
                clusterSizes={kMeanEvaluateResponse.cluster_sizes || {}}
                silhouetteScore={kMeanEvaluateResponse.silhouette_score || 0}
                interpretations={{
                  silhouetteScoreInterpretation:
                    kMeanEvaluateResponse.silhouette_score_interpretation || "",
                }}
                clusters={kMeanEvaluateResponse.clusters}
              />
            )} */}
            {kMeanEvaluateResponse && !isLoading && (
              <ClusterEvaluation
                clusterSizes={
                  kMeanEvaluateResponse?.interpretation?.cluster_sizes || {}
                }
                silhouetteScore={
                  kMeanEvaluateResponse?.interpretation?.silhouette_score || 0
                }
                interpretations={{
                  silhouetteScoreInterpretation:
                    kMeanEvaluateResponse.interpretation
                      ?.silhouette_score_interpretation || "",
                }}
              />
            )}
            {kMeanEvaluateResponse?.interpretation?.clusters &&
              kMeanEvaluateResponse?.scatter_plot_data && (
                <div>
                  <h3>Cluster Points with Scatter Plot Data</h3>
                  {renderCombinedTable(
                    kMeanEvaluateResponse?.interpretation?.clusters,
                    kMeanEvaluateResponse?.scatter_plot_data
                  )}
                </div>
              )}
            {kMeanEvaluateResponse.interpretation?.clusters &&
              kMeanEvaluateResponse?.scatter_plot_data && (
                <div>
                  {/* <h3>Cluster Points with Scatter Plot Data</h3> */}
                  <ClusterScatterPlotting
                    clusters={kMeanEvaluateResponse?.interpretation?.clusters}
                    scatterPlotData={kMeanEvaluateResponse?.scatter_plot_data}
                  />
                </div>
              )}
          </div>
        ) : (
          <NoData />
        )}

        {isPredictionModalOpen && (
          <CustomModal
            open={setIsPredictionModalOpen}
            title={"Prediction Results"}
          >
            {kmeanForeCasting && (
              <div className={style.tableWrapper}>
                {renderForecastTable(forecasts)}
              </div>
            )}
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default KMean;
