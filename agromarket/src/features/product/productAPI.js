import { setProduct, setProductList } from "./productSlice";


export const setProductListAPI = (foodData) => (dispatch) => {
    console.log(foodData);
    dispatch(setProductList({"foodData" : foodData}));
}


export const setProductAPI = (product) => (dispatch) => {

    dispatch(setProduct({"product" : product}));

}