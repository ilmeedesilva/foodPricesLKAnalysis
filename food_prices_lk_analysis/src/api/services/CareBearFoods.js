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

  linearPredictionResponse: async (data) => {
    try {
      return await apiUtils.post(
        "modals/linear_regression/price_predictions",
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

  handleSVMPredictions: async (data) => {
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
      console.log("error in handling RF predictions for 12 months : ", e);
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
};

export default CareBearFoods;
