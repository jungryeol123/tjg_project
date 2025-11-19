import { axiosGet } from "shared/lib/axiosInstance";

import {
  setDeliveryList,
} from "./deliverySlice";

export const setDeliveryAPI = () => async(dispatch) => {
  const result = await axiosGet("/delivery/deliveryList");
  dispatch(setDeliveryList({ result: result }));
};