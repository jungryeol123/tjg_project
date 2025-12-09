import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setProductListAPI,
  setProductReviewListAPI,
  setProductQnAListAPI
} from "features/product/productAPI";
import { setCategoryListAPI } from "features/category/categoryAPI";

export function useHomeInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductListAPI());
    dispatch(setProductReviewListAPI());
    dispatch(setProductQnAListAPI());
    dispatch(setCategoryListAPI());
  }, [dispatch]);
}
