import React, { useEffect, useState } from "react";
import CareBearFoods from "../../api/services/CareBearFoods";
import ContentLoader from "react-content-loader";
import style from "./MlModals.module.scss";
import NoData from "../../components/NoData/NoData";
import CustomButton from "../../custom/CustomButton";
import CustomModal from "../../custom/modal/CustomModal";
import CloseIcon from "../../img/svg/Close.icon";

const selectedables = ["market", "category", "commodity"];

const SVM = ({ dataset, headers, variables, setStep }) => {
  const [response, setResponse] = useState(null);
  const [predicteableValues, setPredicteableValues] = useState([]);
  const [selectedPredicteableValues, setSelectedPredicteableValues] = useState(
    []
  );
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

  const handleSVM = async () => {
    setIsLoading(true);
    try {
      const responfFromRF = await CareBearFoods.handleSVMPredictions(dataset);
      setResponse(responfFromRF);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRFPredictions = async () => {
    setIsLoading(true);
    try {
      const responfFromRF = await CareBearFoods.getSVMPredictions({
        dataset,
        market: selectedMarkets,
        category: selectedCategory,
        commodity: selectedCommodity,
      });
      setResponse(responfFromRF);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataset.length) {
      handleSVM();
    }
  }, []);

  useEffect(() => {
    if (headers.length) {
      const updatedPredicteableValues = selectedables.filter((item) =>
        headers.includes(item)
      );
      setPredicteableValues(updatedPredicteableValues);
    }
  }, [headers]);

  const handleCancel = () => {
    setSelectedMarkets(headers.markets ?? []);
    setSelectedCategory(headers.category ?? []);
    setSelectedCommodity(headers.commoditiy ?? []);
    setIsPredictionModalOpen(false);
  };

  console.log("predicteableValues : ", selectedPredicteableValues);

  return (
    <div>
      {response ? (
        <div>
          <h2>Support Vector Machine (SVM)</h2>
          <CustomButton
            text={"Prediction"}
            onClick={() => setIsPredictionModalOpen(true)}
          />
          {/* <RegressionChart
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
          /> */}
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
                        {selectedMarkets.map((header) => (
                          <button
                            className={style.headerItem}
                            onClick={() =>
                              setSelectedMarkets((pre) =>
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

                  {selectedCategory.length ? (
                    <div className={style.filterItemSection}>
                      <h6 className="mb-0">Category</h6>
                      <div className={style.headersWrp}>
                        {selectedCategory.map((header) => (
                          <button
                            className={style.headerItem}
                            onClick={() =>
                              setSelectedCategory((pre) =>
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

export default SVM;
