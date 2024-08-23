import { SERVICETYPE } from "../../enums";
import apiUtils from "../apiUtils";

const CareBearFoods = {
  getAllCSVData: async () => {
    try {
      return await apiUtils.get("csv/data", SERVICETYPE.CARE_BEAR_SERVICE);
    } catch (e) {
      console.log("error in get all csv data : ", e);
    }
  },
  getAllCSVHeader: async () => {
    try {
      return await apiUtils.get("csv/headers", SERVICETYPE.CARE_BEAR_SERVICE);
    } catch (e) {
      console.log("error in get all csv data : ", e);
    }
  },

  handleLinearRegression: async (data) => {
    try {
      return await apiUtils.post(
        "modals/linear_regression",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling linear regression data : ", e);
    }
  },

  handleLinearRegression2: async (data) => {
    try {
      return await apiUtils.post(
        "modals/multiple-linear-regression",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling linear regression data : ", e);
    }
  },

  linearPredictionResponse: async (data) => {
    try {
      return await apiUtils.post(
        "modals/predictions/linear_regression/price_predictions",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling Linear forest data : ", e);
    }
  },

  handleLinearRegressionTrends: async (data) => {
    try {
      return await apiUtils.post(
        "modals/predictions/linear_regression/get-trend",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling Linear forest data : ", e);
    }
  },

  handleRFEvaluate: async (data) => {
    try {
      return await apiUtils.post(
        "modals/rf-evaluate",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling random forest data : ", e);
    }
  },

  getRFPredictions: async (data) => {
    try {
      return await apiUtils.post(
        "modals/rf-forecast-custom",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling RF predictions for 12 months : ", e);
    }
  },

  handleSVMEvaluate: async (data) => {
    try {
      return await apiUtils.post(
        "modals/svm-evaluate",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling SVM data : ", e);
    }
  },

  getSVMPredictions: async (data) => {
    try {
      return await apiUtils.post(
        "modals/svm-forecast-custom",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling SVM predictions for 12 months : ", e);
    }
  },

  getSVMHighLow: async (data) => {
    try {
      return await apiUtils.post(
        "modals/forecast-high-low",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log(
        "error in handling svm high low predictions for next month : ",
        e
      );
    }
  },
  getRiskManagement: async (data) => {
    try {
      return await apiUtils.post(
        "modals/linear_regression/risk_management",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log(
        "error in handling svm high low predictions for next month : ",
        e
      );
    }
  },

  handleKMMarketBaseOnPrice: async (data) => {
    try {
      return await apiUtils.post(
        "modals/clustering/markets/price_levels",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling K-Mean price levels data : ", e);
    }
  },

  handleKMClusterMarket: async (data) => {
    try {
      return await apiUtils.post(
        "modals/k-means/cluster-markets",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling K-Mean price levels data : ", e);
    }
  },

  handleKmeanEvaluate: async (data) => {
    try {
      return await apiUtils.post(
        "modals/k-means/km-evaluate",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling K-Mean Evaluate data : ", e);
    }
  },
  handleKmeanForecast: async (data) => {
    try {
      return await apiUtils.post(
        "modals/k-means/km-forecast",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling K-Mean Forecast data : ", e);
    }
  },
  handleKmeanVisualize: async (data) => {
    try {
      return await apiUtils.post(
        "modals/k-means/km-visualize",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling K-Mean Forecast data : ", e);
    }
  },
  handleKmeaninsights: async (data) => {
    try {
      return await apiUtils.post(
        "modals/k-means/km-insights",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling K-Mean Forecast data : ", e);
    }
  },

  getRFVisualizations: async (data) => {
    try {
      return await apiUtils.get(
        "modals/rf/plots",
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in getting RF plots : ", e);
    }
  },
};

export default CareBearFoods;
