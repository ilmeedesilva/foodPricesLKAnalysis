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

  handleRFPredictions: async (data) => {
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

  getPredictionsFor12: async (data) => {
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

  getSVMPredictionsFor12: async (data) => {
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

  handleKmean: async (data) => {
    try {
      return await apiUtils.post(
        "modals/k_mean",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling linear regression data : ", e);
    }
  },

  handleRanomForest: async (data) => {
    try {
      return await apiUtils.post(
        "modals/random_forest",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling random forest data : ", e);
    }
  },

  handleSVM: async (data) => {
    try {
      return await apiUtils.post(
        "modals/svm",
        data,
        SERVICETYPE.CARE_BEAR_SERVICE
      );
    } catch (e) {
      console.log("error in handling svm data : ", e);
    }
  },
};

export default CareBearFoods;
