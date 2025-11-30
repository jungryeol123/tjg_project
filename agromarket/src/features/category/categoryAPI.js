import { axiosGet } from "shared/lib/axiosInstance";

import {
  setCategoryList
} from "./categorySlice";

// 카테고리(대분류, 중분류 포함) 리스트 추출
export const setCategoryListAPI = () => async(dispatch) => {
  const result = await axiosGet("/category/list");
  console.log("result", result);
  dispatch(setCategoryList({ result: result }));
};