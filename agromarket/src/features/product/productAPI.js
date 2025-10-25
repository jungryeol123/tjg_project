import { axiosGet } from "shared/lib/axiosInstance";
import { setProduct, setProductList } from "./productSlice";

export const setProductListAPI = (foodData) => (dispatch) => {
  console.log(foodData);
  dispatch(setProductList({ foodData: foodData }));
};

export const setProductAPI = (pid) => async (dispatch) => {
  const jsonData = await axiosGet("/data/foodData.json");
  const [data] = jsonData.foodData.filter((data) => data.pid === pid);
  dispatch(setProduct({ product: data }));
};
