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

  // create necessary functions in here
  // You only need to create your endpoint function (in this case, it's an object here).
  // SERVICETYPE.CARE_BEAR_SERVICE is a constant; don’t change it. It must be included in the every function call.

  // example post request

  // functionName: async (data) => { //when you call this pass necessary value
  //   try {
  //     return await apiUtils.put(`modal/kmean`, data, SERVICETYPE.CARE_BEAR_SERVICE);
  //   } catch (e) {
  //     console.log("error in put  users : ", e);
  //   }
  // },
  // },
};

export default CareBearFoods;
