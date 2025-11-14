import { axiosGet } from "shared/lib/axiosInstance";

import {
  setCategoryList
} from "./categorySlice";

export const setCategoryListAPI = () => async(dispatch) => {
  const result = await axiosGet("/category/list");
  dispatch(setCategoryList({ result: result }));
};

