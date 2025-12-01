// shared
import { api } from "shared/lib/axios";

import {
  setCategoryList
} from "./categorySlice";

// 카테고리(대분류, 중분류 포함) 리스트 추출
export const setCategoryListAPI = () => async(dispatch) => {
  const result = await api.get("/category/list");
  console.log("result", result.data);
  dispatch(setCategoryList({ result: result.data }));
};