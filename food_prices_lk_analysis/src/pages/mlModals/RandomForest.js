import React, { useEffect, useState } from "react";
import style from "../page.module.scss";
import style2 from "./LinearRegression.module.scss";
import CustomButton from "../../custom/CustomButton";
import CustomDropdown from "../../custom/dropdown/CustomDropdown";
import CustomModal from "../../custom/modal/CustomModal";
import CareBearFoods from "../../api/services/CareBearFoods";
import RegressionChart from "./RegressionChart";
import ModelMetrics from "./ModelMetrics";
import Explanation from "./Explanation";

const numarics = ["price", "usdprice", "USD RATE"];
const RandomForest = ({ dataset, variables, setStep }) => {
  const [linearXaxis, setLinearXaxis] = useState([]);
  const [linearYaxis, setLinearYaxis] = useState();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRandomForest = async () => {
    setIsLoading(true);
    try {
      const responfFromRF = await CareBearFoods.handleRFPredictions(dataset);
      setResponse(responfFromRF);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
      setOpenFilterModal(false);
    }
  };

  useEffect(() => {
    handleRandomForest();
  }, []);

  const handleCancel = () => {
    if (!response) {
      setStep(2);
      return;
    }
    setOpenFilterModal(false);
  };

  return (
    <div>
      {response && (
        <div>
          <h2>Random forest</h2>
          {isLoading ? "Loading...." : JSON.stringify(response)}

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
                label={"Select Independent Variable"}
                getSelected={(value) => setLinearYaxis(value)}
              />
            </div>
            <div className={style2.filterWrp}>
              <div className={style2.filterItemSection}>
                <h6 className="mb-0">Select Independent Variables</h6>
                <div className={style2.headersWrp}>
                  {numarics.map((header) => (
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
                loading={isLoading}
              />
              <CustomButton
                buttonClass={"SUBMIT"}
                text={"Apply"}
                // onClick={handleLinearRegression}
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

export default RandomForest;
