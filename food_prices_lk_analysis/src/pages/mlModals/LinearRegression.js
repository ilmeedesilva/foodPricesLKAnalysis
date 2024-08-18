import React, { useState } from "react";
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

const numarics = ["price", "usdprice", "USD RATE"];
const LinearRegression = ({ dataset, variables, setStep }) => {
  const [linearXaxis, setLinearXaxis] = useState([]);
  const [linearYaxis, setLinearYaxis] = useState(variables[0]);
  const [openFilterModal, setOpenFilterModal] = useState(true);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div>
      {response ? (
        <div>
          <h2>Linear Regression Analysis for {response.y_column}</h2>
          <RegressionChart
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
    </div>
  );
};

export default LinearRegression;
