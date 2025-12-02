import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
// shared
import Popup from "shared/ui/popup/Popup";
import { api } from "shared/lib/axios";
import { useAutoSlider } from "shared/hooks/useAutoSlider";
import { SlideContainer } from "shared/ui/slider/SlideContainer";
import RecommendedSlider from "shared/ui/recommend/RecommendedSlider";
import { AdvertiseList } from "shared/ui/advertise/AdvertiseList";
import { RightAdBanner } from "shared/ui/advertise/RightAdvBanner";
// features
import { parseJwt } from "features/auth/parseJwt";


import { setCategoryListAPI } from "features/category/categoryAPI.js";
import { setProductListAPI,
          setProductReviewListAPI, 
          setProductQnAListAPI,
          fetchRecentSubCategory } from "features/product/productAPI";
import ProductList from "shared/ui/ProductList/ProductList";

export default function Home() {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { index, setIndex } = useAutoSlider(images.length, 5000);
  const [advertiseList, setAdvertiseList] = useState([]);
  const bannerAds = advertiseList.filter(ad => ad.advImageBanner !== null);
  const inlineAds = advertiseList.filter(ad => ad.advImageInline !== null);
  const fetchAdvertiseList = async () => {
    return await api.get("/advertise/list");
  };
  useEffect(() => {
    const fetchAdvertises = async () => {
      const adv = await fetchAdvertiseList();
      setAdvertiseList(adv.data);
    };
    fetchAdvertises();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("/data/homeDataImages.json");
      setImages(result.data.images);
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

  //홈화면 팝업 창 띄우기
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isShown = localStorage.getItem("coupon_popup_shown");
    if (!isShown) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem("coupon_popup_shown", "true"); 
    setShowPopup(false);
  };

  return (
    <>
      <RightAdBanner ads={bannerAds} />
      {showPopup && <Popup onClose={handleClosePopup} />}
      <SlideContainer images={images} index={index} setIndex={setIndex} />
      <RecommendedSlider title="좋아할만한 브랜드 상품" limit={15} />
      <AdvertiseList ads={inlineAds} />
      <ProductList title="마감 임박! 원더특가 ~66%" keyword="time" limit={12} />
      <ProductList title="실시간 인기 랭킹" keyword="sale" limit={12} />
      <ProductList title="할인을 잡아라!!" keyword="sale" limit={12} />
    </>
  );
}