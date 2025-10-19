import ProductList from "features/catalog/ProductList/ProductList";
import React, { useEffect, useState } from "react";
import { useAutoSlider } from "shared/hooks/useAutoSlider";
import { getData } from "shared/lib/axiosInstance";
import { SlideContainer } from "shared/ui/slider/SlideContainer";


export default function Home() {
const [images, setImages] = useState([]);
  const {index, setIndex} = useAutoSlider(images.length, 5000);
  useEffect(() => {
      const fetchData = async () => {
        const result = await getData("/data/homeDataImages.json");
        setImages(result.images);
      };
      fetchData();
    }, []);
  return (
    <>
    <SlideContainer images={images} index={index} setIndex={setIndex} />
    <ProductList title="마감 임박! 원더특가 ~66%" limit={6}/>
    <ProductList title="실시간 인기 랭킹" limit={6}/> 
    <ProductList title="48시간 주말 슈퍼 찬스" limit={6}/> */
    </>
  );
}