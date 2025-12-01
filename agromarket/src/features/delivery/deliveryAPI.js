import { setDeliveryList } from "./deliverySlice";
// shared
import { api } from "shared/lib/axios";

export const setDeliveryAPI = () => async(dispatch) => {
  const result = await api.get("/delivery/deliveryList");
  dispatch(setDeliveryList({ result: result.data }));
};