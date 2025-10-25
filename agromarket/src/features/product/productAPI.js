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
    console.log(foodData);
    dispatch(setProductList({"foodData" : foodData}));
}

export const setProductAPI = (product) => (dispatch) => {

    dispatch(setProduct({"product" : product}));

}

// 상품 디테일 정보 취득
export const getProductDetail = (pid) => async(dispatch) => {
    const url = "/product/detail";
    const param = { "pid" : pid };
    // const jsonData = await axiosGet(url, param); // detail 연동
    // dispatch(setProduct());
}
