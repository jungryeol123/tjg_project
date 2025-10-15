import ProductList from "features/catalog/ProductList/ProductList";
import React, { useEffect, useState } from "react";
import { getData } from "shared/lib/axiosInstance";
import { SlideContainer } from "shared/ui/slider/SlideContainer";


export default function Home() {
const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
      const fetchData = async () => {
        const result = await getData("/data/homeDataImages.json");
        setImages(result.images);
      };
      fetchData();
    }, []);
  return (
    <>
    <div className="home-page">
      <SlideContainer images={images} index={index} setIndex={setIndex} />
    <ProductList/>
    </div>
    </>
  );
}