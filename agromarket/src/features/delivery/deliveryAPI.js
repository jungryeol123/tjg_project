import {
  setDeliveryList,
} from "./deliverySlice";
// shared
import { axiosGet } from "shared/lib/axiosInstance";

export const setDeliveryAPI = () => async(dispatch) => {
  const result = await axiosGet("/delivery/deliveryList");
  dispatch(setDeliveryList({ result: result }));
};