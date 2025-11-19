import { axiosGet } from "shared/lib/axiosInstance";

import {
  setCategoryList
} from "./categorySlice";

export const setCategoryListAPI = () => async(dispatch) => {
  const result = await axiosGet("/category/list");
  console.log("result", result);
  dispatch(setCategoryList({ result: result }));
};

