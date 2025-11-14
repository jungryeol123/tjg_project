import ProductList from "features/catalog/ProductList/ProductList";
import { setProductListAPI, setProductReviewListAPI, setProductQnAListAPI } from "features/product/productAPI";
import { setCategoryListAPI } from "features/category/categoryAPI.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAutoSlider } from "shared/hooks/useAutoSlider";
import { getData } from "shared/lib/axiosInstance";
import { SlideContainer } from "shared/ui/slider/SlideContainer";


export default function Home() {
const [images, setImages] = useState([]);
const dispatch = useDispatch();
  const {index, setIndex} = useAutoSlider(images.length, 5000);
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
    }, [dispatch]);
  return (
    <>
    <SlideContainer images={images} index={index} setIndex={setIndex} />
    <ProductList title="마감 임박! 원더특가 ~66%" keyword="time" limit={12}/>
    <ProductList title="실시간 인기 랭킹" keyword="dc" limit={12}/> 
    <ProductList title="할인을 잡아라!!" keyword="dc" limit={12}/>
    </>
  );
}