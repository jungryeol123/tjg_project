
// import { axiosGet } from "shared/lib/axiosInstance"


// export const setOrderListAPI = () => async(dispatch) => {
//     result = await axiosGet("/data/purchase.json");
//     console.log("result", result);

// }

import { axiosGet } from "shared/lib/axiosInstance"
import {
  setDeliveryList
} from "./orderSlice";

// 배송 정보 취득
export const setOrderDeliveryListAPI = () => async(dispatch) => {
    const deliveryList = await axiosGet("/data/deliveryData.json");
    dispatch(setDeliveryList({ "deliveryList" : deliveryList }));
}