import ProductList from "features/catalog/ProductList/ProductList";
import { setProductListAPI, setProductReviewListAPI, setProductQnAListAPI, fetchRecentSubCategory } from "features/product/productAPI";
import { setCategoryListAPI } from "features/category/categoryAPI.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAutoSlider } from "shared/hooks/useAutoSlider";
import { getData } from "shared/lib/axiosInstance";
import { SlideContainer } from "shared/ui/slider/SlideContainer";
import { parseJwt } from "features/auth/parseJwt";
import RecommendedSlider from "shared/ui/recommend/RecommendedSlider";


export default function Home() {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { index, setIndex } = useAutoSlider(images.length, 5000);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("/data/homeDataImages.json");
      setImages(result.images);
    };
    dispatch(setProductListAPI());
    dispatch(setProductReviewListAPI());
    dispatch(setProductQnAListAPI());
    dispatch(setCategoryListAPI());
    fetchData();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (!stored) return;

    const { accessToken } = JSON.parse(stored);
    const payload = parseJwt(accessToken);

    dispatch(fetchRecentSubCategory(payload.id));
  }, []);
  return (
    <>
      <SlideContainer images={images} index={index} setIndex={setIndex} />
      <RecommendedSlider title="좋아할만한 브랜드 상품" limit={15} />
      <ProductList title="마감 임박! 원더특가 ~66%" keyword="time" limit={12} />
      <ProductList title="실시간 인기 랭킹" keyword="sale" limit={12} />
      <ProductList title="할인을 잡아라!!" keyword="sale" limit={12} />
    </>
  );
}