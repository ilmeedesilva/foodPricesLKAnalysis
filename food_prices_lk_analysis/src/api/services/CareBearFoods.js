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
    console.log("data - ", data);

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

  handleKmean: async (data) => {
    console.log("data - ", data);

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
    console.log("data - ", data);

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
    console.log("data - ", data);

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
