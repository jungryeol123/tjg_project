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
    {/* <ProductList title="제품" limit={6}/> */}
    {/* <ProductList title="제품" limit={6}/>
    <ProductList title="제품" limit={6}/> */}
    </>
  );
}